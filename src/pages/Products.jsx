import { useState, useEffect, useTransition, useMemo, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Product from "../components/Product";
import { Triangle } from "react-loader-spinner";
import Search from "../components/Search";
import FilterCategory from "../components/FilterCategory";
import searchFilterHandler from "../utils/helpers/searchFilterHandler";
import addProductRatings from "../utils/helpers/addProductRatings";
import NoProductFound from "../components/NoProductFound";
import Pagination from "../components/Pagination";
import ProductsHeader from "../components/ProductsHeader";
import { useProducts, useTotalProductCount, useCategories } from "../hooks/useProductsApi";
import { selectFavorites } from "../store/slices/favoritesSlice";

function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  
  const [query, setQuery] = useState({ search: "" });
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [notFound, setNotFound] = useState(false);
  const [sortConfig, setSortConfig] = useState({ option: 'default', direction: 'asc' });
  const [isPending, startTransition] = useTransition();
  
  const { data: categories = [] } = useCategories();
  
  const getOffset = useCallback(() => (currentPage - 1) * pageSize, [currentPage, pageSize]);
  
  const favorites = useSelector(selectFavorites);
  
  const apiParams = useMemo(() => {
    const params = {
      offset: getOffset(),
      limit: pageSize,
    };
    
    if (query.search) params.title = query.search;
    if (query.category && query.category !== '0') params.categoryId = parseInt(query.category, 10);
    if (query.minPrice) params.price_min = query.minPrice;
    if (query.maxPrice) params.price_max = query.maxPrice;
    if (query.minRating) params.min_rating = parseFloat(query.minRating);
    if (query.showFavorites === 'true') params.showFavorites = true;
    
    return params;
  }, [getOffset, pageSize, query]);
  
  const { 
    data: products = [], 
    isLoading, 
    isError 
  } = useProducts(apiParams);
  
  const { 
    data: totalProducts = 200,
    isLoading: isCountLoading
  } = useTotalProductCount();
  
  const totalPages = Math.ceil(totalProducts / pageSize);
  
  const processedProducts = useMemo(() => {
    let filtered = products.length ? addProductRatings(products) : [];
    
    if (query.showFavorites === 'true') {
      filtered = filtered.filter(product => favorites.some(fav => fav.id === product.id));
    }
    
    filtered = searchFilterHandler(query, filtered);
    
    return [...filtered].sort((a, b) => {
      if (sortConfig.option === 'default') return 0;
      
      let comparison = 0;
      switch (sortConfig.option) {
        case 'price':
          comparison = a.price - b.price;
          break;
        case 'name':
          comparison = a.title.localeCompare(b.title);
          break;
        case 'rating':
          comparison = (a.rating || 0) - (b.rating || 0);
          break;
      }
      
      return sortConfig.direction === 'asc' ? comparison : -comparison;
    });
  }, [products, query, favorites, sortConfig]);

  useEffect(() => {
    const params = {
      page: searchParams.get('page'),
      pageSize: searchParams.get('pageSize'),
      category: searchParams.get('category'),
      search: searchParams.get('search'),
      minPrice: searchParams.get('minPrice'),
      maxPrice: searchParams.get('maxPrice'),
      minRating: searchParams.get('minRating'),
      sortOption: searchParams.get('sortOption'),
      sortDirection: searchParams.get('sortDirection'),
    };
    
    const initialQuery = {};
    
    if (params.page) setCurrentPage(parseInt(params.page, 10));
    if (params.pageSize) setPageSize(parseInt(params.pageSize, 10));
    if (params.category) initialQuery.category = params.category;
    if (params.search) initialQuery.search = params.search;
    if (params.minPrice) initialQuery.minPrice = params.minPrice;
    if (params.maxPrice) initialQuery.maxPrice = params.maxPrice;
    if (params.minRating) initialQuery.minRating = params.minRating;
    if (params.sortOption && params.sortDirection) {
      setSortConfig({
        option: params.sortOption,
        direction: params.sortDirection
      });
    }
    
    if (Object.keys(initialQuery).length > 0) {
      setQuery(initialQuery);
    }
  }, []);

  useEffect(() => {
    const updateSearchParams = () => {
      startTransition(() => {
        const newParams = { ...Object.fromEntries(searchParams.entries()) };
        
        newParams.page = currentPage.toString();
        newParams.pageSize = pageSize.toString();
        
        if (query.category && query.category !== '0') {
          newParams.category = query.category;
        } else {
          delete newParams.category;
        }
        
        if (query.search) {
          newParams.search = query.search;
        } else {
          delete newParams.search;
        }
        
        if (query.minPrice) {
          newParams.minPrice = query.minPrice;
        } else {
          delete newParams.minPrice;
        }
        
        if (query.maxPrice) {
          newParams.maxPrice = query.maxPrice;
        } else {
          delete newParams.maxPrice;
        }
        
        if (query.minRating) {
          newParams.minRating = query.minRating;
        } else {
          delete newParams.minRating;
        }
        
        if (sortConfig.option !== 'default') {
          newParams.sortOption = sortConfig.option;
          newParams.sortDirection = sortConfig.direction;
        } else {
          delete newParams.sortOption;
          delete newParams.sortDirection;
        }
        
        setSearchParams(newParams);
      });
    };

    const timeoutId = setTimeout(updateSearchParams, 300);
    return () => clearTimeout(timeoutId);
  }, [currentPage, pageSize, query, sortConfig, searchParams, setSearchParams]);

  useEffect(() => {
    const check = setTimeout(() => {
      setNotFound(!processedProducts.length && query.search);
    }, 1);
    return () => clearTimeout(check);
  }, [processedProducts, query.search]);

  const handlePageChange = useCallback((page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handlePageSizeChange = useCallback((size) => {
    setPageSize(size);
    setCurrentPage(1);
  }, []);
  
  const handleSortChange = useCallback((sortConfig) => {
    setSortConfig(sortConfig);
  }, []);
  
  const handleClearFilters = useCallback(() => {
    setQuery({});
    setSortConfig({ option: 'default', direction: 'asc' });
  }, []);
  
  const getCategoryName = useCallback((categoryId) => {
    if (!categoryId || categoryId === '0') return null;
    
    const category = categories.find(cat => cat.id.toString() === categoryId);
    return category ? category.name : null;
  }, [categories]);
  
  const activeFilters = useMemo(() => ({
    ...query,
    categoryName: getCategoryName(query.category)
  }), [query, getCategoryName]);

  const productList = useMemo(() => {
    if (isLoading) {
      return (
        <div className="flex flex-col items-center justify-center h-64 gap-4">
          <Triangle
            visible
            height="80"
            width="80"
            color="#1f2937"
            ariaLabel="triangle-loading"
            wrapperClass=""
          />
          <p className="text-gray-600 dark:text-gray-400">Loading products...</p>
        </div>
      );
    }
    
    if (isError) {
      return (
        <div className="flex items-center justify-center h-64">
          <p className="text-lg text-red-500 dark:text-red-400">
            Error loading products. Please try again later.
          </p>
        </div>
      );
    }
    
    if (notFound) {
      return <NoProductFound />;
    }
    
    if (!processedProducts.length) {
      return (
        <div className="flex items-center justify-center h-64">
          <p className="text-lg text-gray-500 dark:text-gray-400">
            No products found. Try adjusting your filters.
          </p>
        </div>
      );
    }
    
    return (
      <>
        <div className="grid grid-cols-1 gap-4 m-auto md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 lg:gap-7">
          {processedProducts.map((product) => (
            <Product key={product.id} productData={product} />
          ))}
        </div>
        
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          pageSize={pageSize}
          onPageChange={handlePageChange}
          onPageSizeChange={handlePageSizeChange}
        />
      </>
    );
  }, [
    isLoading, 
    isError, 
    notFound, 
    processedProducts, 
    currentPage, 
    totalPages, 
    pageSize, 
    handlePageChange, 
    handlePageSizeChange
  ]);

  return (
    <>
      <div className="wrapper">
        <ProductsHeader 
          title="Explore Our Products"
          totalProducts={processedProducts.length}
          onSortChange={handleSortChange}
          activeFilters={activeFilters}
          onClearFilters={handleClearFilters}
        />
        
        <div className="flex flex-col w-full lg:flex-row">
          <div className="w-full mb-6 lg:w-3/12 lg:mb-0">
            <div className="sticky top-0 lg:top-4 p-4 border rounded-lg border-grayshade-50 dark:border-grayshade-300 dark:bg-grayshade-500 mb-6 max-h-[90vh] overflow-y-auto z-10 bg-white dark:bg-grayshade-500">
              <div className="mb-6">
                <Search query={{ query, setQuery }} />
              </div>
              <FilterCategory query={{ query, setQuery }} />
            </div>
          </div>
          
          <div className="w-full lg:w-9/12 lg:pl-6">
            {productList}
          </div>
        </div>
      </div>
    </>
  );
}

export default Products;

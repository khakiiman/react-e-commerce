import axios, { AxiosInstance } from 'axios';

import {
  Category,
  DummyJsonCategory,
  DummyJsonProduct,
  DummyJsonProductsResponse,
  Product,
  ProductsParams,
  ProductsResponse,
} from '../types/api';

const DUMMY_JSON_BASE_URL = 'https://dummyjson.com';

const dummyJsonClient: AxiosInstance = axios.create({
  baseURL: DUMMY_JSON_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

const categoryCache = new Map<string, number>();
let categoriesListCache: string[] | null = null;
let categoriesListPromise: Promise<string[]> | null = null;
let totalProductCountCache: number | null = null;

async function getCachedCategories(): Promise<string[]> {
  if (categoriesListCache) {
    return categoriesListCache;
  }

  if (categoriesListPromise) {
    return categoriesListPromise;
  }

  categoriesListPromise = (async () => {
    try {
      // console.log('Fetching categories from API');
      const response = await dummyJsonClient.get<string[]>('/products/categories');
      categoriesListCache = response.data;
      return categoriesListCache;
    } catch (error) {
      console.error('Error fetching categories:', error);
      return [];
    } finally {
      setTimeout(() => {
        categoriesListPromise = null;
      }, 300000);
    }
  })();

  return categoriesListPromise;
}

function getCategoryId(slug: string | undefined, index: number): number {
  if (!slug) return index + 1;

  if (categoryCache.has(slug)) {
    return categoryCache.get(slug) || index + 1;
  }

  const id = index + 1;
  categoryCache.set(slug, id);
  return id;
}

export const convertProductFormat = async (product: DummyJsonProduct): Promise<Product> => {
  const {
    id,
    title,
    description,
    price,
    category,
    rating,
    stock,
    brand,
    thumbnail,
    images,
    discountPercentage,
    meta = {},
  } = product;

  const categoryObj: Category = {
    id: 1,
    name: 'Unknown',
    image: thumbnail || 'https://placeimg.com/640/480/any',
    creationAt: meta.createdAt || new Date().toISOString(),
    updatedAt: meta.updatedAt || new Date().toISOString(),
  };

  if (typeof category === 'string') {
    try {
      // console.log(`Converting category format for product ${id}, category: ${category}`);
      const categoriesList = await getCachedCategories();

      if (categoriesList && Array.isArray(categoriesList)) {
        let categoryIndex = -1;

        for (let i = 0; i < categoriesList.length; i++) {
          const cat = categoriesList[i];
          const catSlug =
            typeof cat === 'string'
              ? cat
              : cat && 'slug' in cat
                ? (cat as DummyJsonCategory).slug
                : undefined;

          if (catSlug === category) {
            categoryIndex = i;
            break;
          }
        }

        if (categoryIndex !== -1) {
          categoryObj.id = categoryIndex + 1;
          categoryObj.name =
            category.charAt(0).toUpperCase() + category.slice(1).replace(/-/g, ' ');
          // console.log(
          //   `Found category for product ${id}, id: ${categoryObj.id}, name: ${categoryObj.name}`
          // );
        }
      }
    } catch (error) {
      console.error('Error getting consistent category ID:', error);
    }
  }

  const ratingValue =
    typeof rating === 'string'
      ? parseFloat(rating)
      : rating || parseFloat((Math.random() * 4 + 1).toFixed(2));

  return {
    id,
    title,
    price,
    description,
    category: categoryObj,
    images: images && images.length ? images : [thumbnail || 'https://placeimg.com/640/480/any'],
    creationAt: meta.createdAt || new Date().toISOString(),
    updatedAt: meta.updatedAt || new Date().toISOString(),
    rating: ratingValue,
    brand: brand || '',
    discountPercentage: discountPercentage || 0,
    stock: stock || 0,
  };
};

export const convertCategoryFormat = (
  category: string | DummyJsonCategory,
  index: number
): Category => {
  let name: string, slug: string;

  if (typeof category === 'string') {
    name = category
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
    slug = category;
  } else if (category && typeof category === 'object') {
    name = category.name || '';
    slug = category.slug || '';
  } else {
    console.error('Unexpected category format:', category);
    name = 'Unknown';
    slug = 'unknown';
  }

  const id = getCategoryId(slug, index);

  return {
    id,
    name,
    image: `https://placeimg.com/640/480/any?category=${slug}`,
    creationAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
};

declare global {
  interface String {
    hashCode(): number;
  }
}

String.prototype.hashCode = function (): number {
  let hash = 0;
  for (let i = 0; i < this.length; i++) {
    const char = this.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }
  return Math.abs(hash);
};

interface DummyJsonProductService {
  getProducts(params?: ProductsParams): Promise<ProductsResponse | Product[]>;
  getProduct(id: number | string): Promise<Product>;
  getCategories(): Promise<Category[]>;
  getTotalProductCount(): Promise<number>;
}

export const productService: DummyJsonProductService = {
  getProducts: async (params: ProductsParams = {}): Promise<ProductsResponse | Product[]> => {
    if (params.disabled) {
      // console.log('Products API call disabled, returning empty result');
      return {
        data: [],
        total: 0,
      };
    }

    try {
      const {
        limit = 10,
        offset = 0,
        title,
        price,
        price_min,
        price_max,
        categoryId,
        min_rating,
      } = params;

      const dummyParams: Record<string, string | number> = {
        limit,
        skip: offset,
      };

      let url = '/products';

      if (title) {
        url = `/products/search?q=${title}`;
      }

      if (categoryId) {
        try {
          const categoriesList = await getCachedCategories();

          if (categoriesList && Array.isArray(categoriesList)) {
            const categoryIndex = parseInt(categoryId.toString(), 10) - 1;

            if (categoryIndex >= 0 && categoryIndex < categoriesList.length) {
              if (typeof categoriesList[categoryIndex] === 'string') {
                url = `/products/category/${categoriesList[categoryIndex]}`;
              } else if (
                categoriesList[categoryIndex] &&
                typeof categoriesList[categoryIndex] === 'object' &&
                'slug' in (categoriesList[categoryIndex] as DummyJsonCategory)
              ) {
                url = `/products/category/${
                  (categoriesList[categoryIndex] as DummyJsonCategory).slug
                }`;
              }
              // console.log(`Fetching products for category: ${url}`);
            } else {
              console.warn(
                `Category ID ${categoryId} out of range (total: ${categoriesList.length})`
              );
            }
          }
        } catch (categoryError) {
          console.error('Error using cached categories for filtering:', categoryError);
        }
      }

      const response = await dummyJsonClient.get<DummyJsonProductsResponse | DummyJsonProduct[]>(
        url,
        { params: dummyParams }
      );

      if (response.data && typeof response.data === 'object' && 'total' in response.data) {
        totalProductCountCache = (response.data as DummyJsonProductsResponse).total;
      }

      let products: DummyJsonProduct[] = [];
      if (response.data && typeof response.data === 'object' && 'products' in response.data) {
        products = (response.data as DummyJsonProductsResponse).products;
      } else if (Array.isArray(response.data)) {
        products = response.data;
      }

      if (price) {
        products = products.filter(product => product.price === parseFloat(price.toString()));
      }

      if (price_min) {
        products = products.filter(product => product.price >= parseFloat(price_min.toString()));
      }

      if (price_max) {
        products = products.filter(product => product.price <= parseFloat(price_max.toString()));
      }

      let filteredProducts = [...products];
      if (min_rating) {
        filteredProducts = products.filter(product => {
          if (product.rating !== undefined) {
            return product.rating >= parseFloat(min_rating.toString());
          }
          return false;
        });
      } else {
        filteredProducts = products;
      }

      const convertedProducts: Product[] = await Promise.all(
        filteredProducts.map(product => convertProductFormat(product))
      );

      const result: ProductsResponse = {
        data: convertedProducts,
        total: totalProductCountCache || convertedProducts.length,
      };

      return result;
    } catch (error) {
      console.error('Error in DummyJSON adapter getProducts:', error);
      return {
        data: [],
        total: 0,
      };
    }
  },

  getProduct: async (id: number | string): Promise<Product> => {
    try {
      const response = await dummyJsonClient.get<DummyJsonProduct>(`/products/${id}`);
      return await convertProductFormat(response.data);
    } catch (error) {
      console.error(`Error fetching product ${id} from DummyJSON:`, error);
      throw new Error(`Product with ID ${id} not found`);
    }
  },

  getCategories: async (): Promise<Category[]> => {
    try {
      const categoriesList = await getCachedCategories();
      return categoriesList.map((category, index) => convertCategoryFormat(category, index));
    } catch (error) {
      console.error('Error fetching categories from DummyJSON:', error);
      return [];
    }
  },

  getTotalProductCount: async (): Promise<number> => {
    if (totalProductCountCache) {
      return totalProductCountCache;
    }

    try {
      const response = await dummyJsonClient.get<DummyJsonProductsResponse>('/products', {
        params: { limit: 1 },
      });

      if (response.data && typeof response.data === 'object' && 'total' in response.data) {
        totalProductCountCache = response.data.total;
        return response.data.total;
      }

      return 100;
    } catch (error) {
      console.error('Error fetching product count from DummyJSON:', error);
      return 100;
    }
  },
};

export default productService;

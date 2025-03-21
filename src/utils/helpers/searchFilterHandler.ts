import { Product } from '../../types/api';

interface QueryParams {
  category?: string;
  minPrice?: string;
  maxPrice?: string;
  minRating?: string;
  search?: string;
  showFavorites?: string;
  [key: string]: string | undefined;
}

const searchFilterHandler = (query: QueryParams, displayData: Product[]): Product[] => {
  if (!displayData || !displayData.length) {
    return [];
  }
  
  const filteredByCategory = query.category === '0' || !query.category
    ? displayData
    : displayData.filter(product => {
        const productCategoryId = product.category && product.category.id 
          ? parseInt(product.category.id.toString(), 10) 
          : null;
        const queryCategoryId = parseInt(query.category as string, 10);
        
        return productCategoryId === queryCategoryId;
      });
  
  const filteredByPrice = query.minPrice || query.maxPrice
    ? filteredByCategory.filter(product => {
        const price = product.price;
        const minPrice = query.minPrice ? parseFloat(query.minPrice) : 0;
        const maxPrice = query.maxPrice ? parseFloat(query.maxPrice) : Infinity;
        
        return price >= minPrice && price <= maxPrice;
      })
    : filteredByCategory;
  
  const filteredByRating = query.minRating && parseFloat(query.minRating) > 0
    ? filteredByPrice.filter(product => {
        const productRating = product.rating !== undefined ? parseFloat(product.rating.toString()) : 0;
        const minRating = parseFloat(query.minRating as string);
        
        return productRating >= minRating;
      })
    : filteredByPrice;
  
  const filtered = query.search === "" || query.search === undefined
    ? filteredByRating
    : filteredByRating.filter((product) =>
        product.title.toLowerCase().includes(query.search!.toLowerCase())
      );
  
  return filtered;
};

export default searchFilterHandler; 
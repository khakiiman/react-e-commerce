import axios from 'axios';

const DUMMY_JSON_BASE_URL = 'https://dummyjson.com';
const ESCUELA_API_BASE_URL = 'https://api.escuelajs.co/api/v1';

const dummyJsonClient = axios.create({
  baseURL: DUMMY_JSON_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});


const categoryCache = new Map();

function getCategoryId(slug, index) {
  if (!slug) return index + 1;
  
  if (categoryCache.has(slug)) {
    return categoryCache.get(slug);
  }
  
  const id = index + 1;
  categoryCache.set(slug, id);
  return id;
}


export const convertProductFormat = async (product) => {
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
    meta = {}
  } = product;

  let categoryObj = {
    id: 1,
    name: 'Unknown',
    image: thumbnail || 'https://placeimg.com/640/480/any',
    creationAt: meta.createdAt || new Date().toISOString(),
    updatedAt: meta.updatedAt || new Date().toISOString()
  };


  if (typeof category === 'string') {
    try {
      const categoriesResponse = await dummyJsonClient.get('/products/categories');
      if (categoriesResponse.data && Array.isArray(categoriesResponse.data)) {
        let categoryIndex = -1;
        
        for (let i = 0; i < categoriesResponse.data.length; i++) {
          const cat = categoriesResponse.data[i];
          const catSlug = typeof cat === 'string' ? cat : (cat && cat.slug);
          
          if (catSlug === category) {
            categoryIndex = i;
            break;
          }
        }
        
        if (categoryIndex !== -1) {
          categoryObj.id = categoryIndex + 1;
          categoryObj.name = category.charAt(0).toUpperCase() + category.slice(1).replace(/-/g, ' ');
        }
      }
    } catch (error) {
      console.error('Error getting consistent category ID:', error);
    }
  }

  return {
    id,
    title,
    price,
    description,
    category: categoryObj,
    images: images && images.length ? images : [thumbnail || 'https://placeimg.com/640/480/any'],
    creationAt: meta.createdAt || new Date().toISOString(),
    updatedAt: meta.updatedAt || new Date().toISOString(),
    rating: rating || (Math.random() * 4 + 1).toFixed(2),
    brand: brand || '',
    discountPercentage: discountPercentage || 0,
    stock: stock || 0
  };
};

export const convertCategoryFormat = (category, index) => {
  let name, slug;
  
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
    updatedAt: new Date().toISOString()
  };
};


String.prototype.hashCode = function() {
  let hash = 0;
  for (let i = 0; i < this.length; i++) {
    const char = this.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; 
  }
  return Math.abs(hash);
};


async function logCategoryMappingsForDebugging() {
  try {
    const response = await dummyJsonClient.get('/products/categories');
    console.log('==== CATEGORY MAPPING DEBUG ====');
    console.log('Total categories:', response.data.length);
    
    response.data.forEach((category, index) => {
      const id = index + 1;
      const name = typeof category === 'string' 
        ? category 
        : (category && category.name) || 'Unknown';
      const slug = typeof category === 'string'
        ? category
        : (category && category.slug) || 'unknown';
      
      console.log(`ID: ${id}, Name: ${name}, Slug: ${slug}`);
    });
    
    console.log('================================');
  } catch (error) {
    console.error('Error logging category mappings:', error);
  }
}

export const productService = {
  getProducts: async (params = {}) => {
    try {
      const { 
        limit = 10, 
        offset = 0,
        title,
        price,
        price_min,
        price_max,
        categoryId
      } = params;
      
      const dummyParams = {
        limit,
        skip: offset,
      };
      
      let url = '/products';
      
      if (title) {
        url = `/products/search?q=${title}`;
      }
      
      if (categoryId) {
        try {
          const categoriesResponse = await dummyJsonClient.get('/products/categories');
          
          if (categoriesResponse.data && Array.isArray(categoriesResponse.data)) {
            const categoryIndex = parseInt(categoryId, 10) - 1;
            
            if (categoryIndex >= 0 && categoryIndex < categoriesResponse.data.length) {
              if (typeof categoriesResponse.data[categoryIndex] === 'string') {
                url = `/products/category/${categoriesResponse.data[categoryIndex]}`;
              } 
              else if (categoriesResponse.data[categoryIndex] && 
                       typeof categoriesResponse.data[categoryIndex] === 'object' &&
                       categoriesResponse.data[categoryIndex].slug) {
                url = `/products/category/${categoriesResponse.data[categoryIndex].slug}`;
              }
              console.log(`Fetching products for category: ${url}`);
            } else {
              console.warn(`Category ID ${categoryId} out of range (total: ${categoriesResponse.data.length})`);
            }
          }
        } catch (categoryError) {
          console.error('Error fetching categories for filtering:', categoryError);
        }
      }
      
      const response = await dummyJsonClient.get(url, { params: dummyParams });
      
      let products = [];
      if (response.data && response.data.products) {
        products = response.data.products;
      } else if (Array.isArray(response.data)) {
        products = response.data;
      }
      
      if (price) {
        products = products.filter(product => product.price === parseFloat(price));
      }
      
      if (price_min) {
        products = products.filter(product => product.price >= parseFloat(price_min));
      }
      
      if (price_max) {
        products = products.filter(product => product.price <= parseFloat(price_max));
      }
      
      const convertedProducts = [];
      for (const product of products) {
        const converted = await convertProductFormat(product);
        convertedProducts.push(converted);
      }
      
      return convertedProducts;
    } catch (error) {
      console.error('Error fetching products from DummyJSON:', error);
      throw new Error('Failed to fetch products');
    }
  },


  getProduct: async (id) => {
    try {
      const response = await dummyJsonClient.get(`/products/${id}`);
      return await convertProductFormat(response.data);
    } catch (error) {
      console.error(`Error fetching product ${id} from DummyJSON:`, error);
      throw new Error('Failed to fetch product details');
    }
  },


  getCategories: async () => {
    try {
      const response = await dummyJsonClient.get('/products/categories');
      
      return response.data.map(convertCategoryFormat);
    } catch (error) {
      console.error('Error fetching categories from DummyJSON:', error);
      throw new Error('Failed to fetch categories');
    }
  },


  getTotalProductCount: async () => {
    try {
      const response = await dummyJsonClient.get('/products?limit=1');
      return response.data.total || 100;
    } catch (error) {
      console.error('Error fetching product count from DummyJSON:', error);
      return 100;
    }
  }
};

logCategoryMappingsForDebugging();

export default productService; 
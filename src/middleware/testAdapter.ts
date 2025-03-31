import { Category, Product, ProductsParams, ProductsResponse } from '../types/api';

// Mock data for testing
const categories: Category[] = [
  {
    id: 1,
    name: 'Clothes',
    image: 'https://placeimg.com/640/480/any?category=clothes',
    creationAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 2,
    name: 'Electronics',
    image: 'https://placeimg.com/640/480/any?category=electronics',
    creationAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 3,
    name: 'Furniture',
    image: 'https://placeimg.com/640/480/any?category=furniture',
    creationAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 4,
    name: 'Shoes',
    image: 'https://placeimg.com/640/480/any?category=shoes',
    creationAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 5,
    name: 'Miscellaneous',
    image: 'https://placeimg.com/640/480/any?category=misc',
    creationAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

const generateMockProducts = (count: number): Product[] => {
  const products: Product[] = [];

  for (let i = 1; i <= count; i++) {
    const categoryIndex = Math.floor(Math.random() * categories.length);
    const category = categories[categoryIndex];
    const price = Math.floor(Math.random() * 1000) + 1;
    const discountPercentage = Math.floor(Math.random() * 30);
    const stock = Math.floor(Math.random() * 100);

    products.push({
      id: i,
      title: `Product ${i}`,
      price,
      description: `This is a description for product ${i}. It's a very good product in the ${category.name} category.`,
      category,
      images: [
        `https://placeimg.com/640/480/any?product=${i}`,
        `https://placeimg.com/640/480/any?product=${i}&image=2`,
      ],
      creationAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      rating: parseFloat((Math.random() * 5).toFixed(2)),
      discountPercentage,
      stock,
    });
  }

  return products;
};

// Generate 100 mock products
const mockProducts = generateMockProducts(100);

// Functions to simulate API delays
const delay = (ms: number): Promise<void> => new Promise(resolve => setTimeout(resolve, ms));

const simulateNetworkDelay = async (): Promise<void> => {
  const randomDelay = Math.floor(Math.random() * 500) + 100; // Between 100ms and 600ms
  await delay(randomDelay);
};

// Test adapter for products API - mimics the real API but works offline
export const productService = {
  getProducts: async (params: ProductsParams = {}): Promise<ProductsResponse> => {
    await simulateNetworkDelay();

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

    // Filter products based on params
    let filteredProducts = [...mockProducts];

    if (title) {
      const searchTerm = title.toLowerCase();
      filteredProducts = filteredProducts.filter(product =>
        product.title.toLowerCase().includes(searchTerm)
      );
    }

    if (price) {
      filteredProducts = filteredProducts.filter(product => product.price === Number(price));
    }

    if (price_min) {
      filteredProducts = filteredProducts.filter(product => product.price >= Number(price_min));
    }

    if (price_max) {
      filteredProducts = filteredProducts.filter(product => product.price <= Number(price_max));
    }

    if (categoryId) {
      const categoryIdNum = Number(categoryId);
      filteredProducts = filteredProducts.filter(product => product.category.id === categoryIdNum);
    }

    // Filter by minimum rating
    if (min_rating) {
      filteredProducts = filteredProducts.filter(
        product => product.rating !== undefined && product.rating >= Number(min_rating)
      );
    }

    // Paginate results
    const totalCount = filteredProducts.length;
    const paginatedProducts = filteredProducts.slice(offset, offset + limit);

    return {
      data: paginatedProducts,
      total: totalCount,
    };
  },

  getProduct: async (id: number | string): Promise<Product> => {
    await simulateNetworkDelay();

    const numericId = typeof id === 'string' ? parseInt(id, 10) : id;
    const product = mockProducts.find(p => p.id === numericId);

    if (!product) {
      throw new Error(`Product with ID ${id} not found`);
    }

    return product;
  },

  getCategories: async (): Promise<Category[]> => {
    await simulateNetworkDelay();
    return categories;
  },

  getTotalProductCount: async (): Promise<number> => {
    await simulateNetworkDelay();
    return mockProducts.length;
  },
};

export default productService;

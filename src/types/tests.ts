import { Page, Locator, BrowserContext, APIRequestContext } from '@playwright/test';
import { Product, Category } from './api';

// Page Object Models
export interface BasePage {
  page: Page;
  goto(): Promise<void>;
}

export interface ProductsPage extends BasePage {
  productCards: Locator;
  categoryFilter: Locator;
  searchInput: Locator;
  sortDropdown: Locator;
  paginationControls: Locator;
  
  searchProducts(query: string): Promise<void>;
  filterByCategory(categoryId: number | string): Promise<void>;
  sortBy(sortOption: string): Promise<void>;
  goToPage(pageNumber: number): Promise<void>;
  getProductCount(): Promise<number>;
  clickProduct(productId: number | string): Promise<void>;
}

export interface ProductDetailPage extends BasePage {
  productTitle: Locator;
  productPrice: Locator;
  productDescription: Locator;
  productImages: Locator;
  addToCartButton: Locator;
  
  getProductInfo(): Promise<Partial<Product>>;
  addToCart(quantity?: number): Promise<void>;
}

export interface LoginPage extends BasePage {
  emailInput: Locator;
  passwordInput: Locator;
  loginButton: Locator;
  errorMessage: Locator;
  
  login(email: string, password: string): Promise<void>;
  getErrorMessage(): Promise<string>;
}

// Test Fixtures
export interface TestFixtures {
  page: Page;
  context: BrowserContext;
  request: APIRequestContext;
  authenticatedPage: Page;
}

// Test Data
export interface TestProduct extends Product {
  // Additional test-specific product properties
  isVisible?: boolean;
  testId?: string;
}

export interface TestCategory extends Category {
  // Additional test-specific category properties
  testId?: string;
  displayOrder?: number;
}

// API Test Helpers
export interface ApiTestHelpers {
  getProducts(params?: Record<string, any>): Promise<TestProduct[]>;
  getProduct(id: number | string): Promise<TestProduct>;
  getCategories(): Promise<TestCategory[]>;
  login(email: string, password: string): Promise<{ token: string }>;
} 
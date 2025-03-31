import { APIRequestContext, BrowserContext, Locator, Page } from '@playwright/test';

import { Category, Product, ProductsParams } from './api';
export interface BasePage {
  page: Page;
  goto(): Promise<void>;
}
export interface ProductsPage {
  page: Page;
  productCards: Locator;
  searchInput: Locator;
  categoryFilter: Locator;
  sortDropdown: Locator;
  paginationControls: Locator;
  priceMinInput: Locator;
  priceMaxInput: Locator;
  ratingSlider: Locator;
  pageSizeSelect: Locator;
  favoritesToggle: Locator;
  goto(): Promise<void>;
  searchProducts(query: string): Promise<void>;
  filterByCategory(categoryId: number | string): Promise<void>;
  sortBy(sortOption: string): Promise<void>;
  goToPage(pageNumber: number): Promise<void>;
  getProductCount(): Promise<number>;
  clickProduct(productId: number | string): Promise<void>;
  getFavoriteButton(productId: number | string): Promise<Locator>;
  toggleFavorite(productId: number): Promise<void>;
  filterByFavorites(): Promise<void>;
  filterByPriceRange(minPrice: number, maxPrice: number): Promise<void>;
  filterByMinRating(rating: number): Promise<void>;
  setPageSize(size: number): Promise<void>;
}
export interface ProductDetailPage {
  page: Page;
  goto(productId: number): Promise<void>;
  productTitle: Locator;
  productPrice: Locator;
  productDescription: Locator;
  favoriteButton: Locator;
  addToCartButton: Locator;
  getProductInfo(): Promise<Partial<Product>>;
  isFavorite(): Promise<boolean>;
  toggleFavorite(): Promise<void>;
}
export interface LoginPage extends BasePage {
  emailInput: Locator;
  passwordInput: Locator;
  loginButton: Locator;
  errorMessage: Locator;
  login(email: string, password: string): Promise<void>;
  getErrorMessage(): Promise<string>;
}
export interface TestFixtures {
  page: Page;
  context: BrowserContext;
  request: APIRequestContext;
  authenticatedPage: Page;
}
export interface TestProduct extends Product {
  isVisible?: boolean;
  testId?: string;
}
export interface TestCategory extends Category {
  testId?: string;
  displayOrder?: number;
}
export interface ApiTestHelpers {
  getProducts(params?: ProductsParams): Promise<TestProduct[]>;
  getProduct(id: number | string): Promise<TestProduct>;
  getCategories(): Promise<TestCategory[]>;
  login(email: string, password: string): Promise<{ token: string }>;
}

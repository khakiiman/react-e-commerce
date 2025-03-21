import { Page, Locator } from '@playwright/test';
import { ProductsPage } from '../../types/tests';

export class ProductsPagePOM implements ProductsPage {
  page: Page;
  productCards: Locator;
  categoryFilter: Locator;
  searchInput: Locator;
  sortDropdown: Locator;
  paginationControls: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productCards = page.locator('[data-testid="product-card"]');
    this.categoryFilter = page.locator('[data-testid="category-filter"]');
    this.searchInput = page.locator('[data-testid="search-input"]');
    this.sortDropdown = page.locator('[data-testid="sort-dropdown"]');
    this.paginationControls = page.locator('[data-testid="pagination-controls"]');
  }

  async goto(): Promise<void> {
    await this.page.goto('/products');
    await this.page.waitForLoadState('networkidle');
  }

  async searchProducts(query: string): Promise<void> {
    await this.searchInput.fill(query);
    await this.searchInput.press('Enter');
    await this.page.waitForLoadState('networkidle');
  }

  async filterByCategory(categoryId: number | string): Promise<void> {
    await this.categoryFilter.click();
    await this.page.locator(`[data-testid="category-${categoryId}"]`).click();
    await this.page.waitForLoadState('networkidle');
  }

  async sortBy(sortOption: string): Promise<void> {
    await this.sortDropdown.click();
    await this.page.locator(`[data-testid="sort-option-${sortOption}"]`).click();
    await this.page.waitForLoadState('networkidle');
  }

  async goToPage(pageNumber: number): Promise<void> {
    await this.paginationControls.locator(`[data-testid="page-${pageNumber}"]`).click();
    await this.page.waitForLoadState('networkidle');
  }

  async getProductCount(): Promise<number> {
    return await this.productCards.count();
  }

  async clickProduct(productId: number | string): Promise<void> {
    await this.page.locator(`[data-testid="product-${productId}"]`).click();
    await this.page.waitForLoadState('networkidle');
  }
} 
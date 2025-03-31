import { Locator, Page } from '@playwright/test';

import { ProductsPage } from '../../types/tests';

export class ProductsPagePOM implements ProductsPage {
  readonly page: Page;
  readonly productCards: Locator;
  readonly searchInput: Locator;
  readonly categorySelect: Locator;
  readonly sortDropdown: Locator;
  readonly paginationControls: Locator;
  readonly priceMinInput: Locator;
  readonly priceMaxInput: Locator;
  readonly applyPriceFilter: Locator;
  readonly clearPriceFilter: Locator;
  readonly starRating: Locator;
  readonly clearRatingFilter: Locator;
  readonly pageSizeSelect: Locator;
  readonly favoritesToggle: Locator;
  readonly clearAllFilters: Locator;
  readonly clearSearchButton: Locator;
  readonly categoryFilter: Locator;
  readonly ratingSlider: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productCards = page.locator('[data-testid="product-card"]');
    this.searchInput = page.locator('[data-testid="search-input"]');
    this.categorySelect = page.locator('#category-select');
    this.sortDropdown = page.locator('[data-testid="sort-dropdown"]');
    this.paginationControls = page.locator('[data-testid="pagination-controls"]');
    this.priceMinInput = page.locator('input[name="min"]');
    this.priceMaxInput = page.locator('input[name="max"]');
    this.applyPriceFilter = page.locator('[data-testid="apply-price-filter"]');
    this.clearPriceFilter = page.locator('[data-testid="clear-price-filter"]');
    this.starRating = page.locator('.react-stars span');
    this.clearRatingFilter = page.locator('[data-testid="clear-rating-filter"]');
    this.pageSizeSelect = page.locator('[data-testid="page-size-select"]');
    this.favoritesToggle = page.locator('[data-testid="favorites-toggle"]');
    this.clearAllFilters = page.locator('[data-testid="clear-all-filters"]');
    this.clearSearchButton = page.locator('[data-testid="clear-search-button"]');
    this.categoryFilter = page.locator('#category-select');
    this.ratingSlider = page.locator('.react-stars');
  }

  async goto(): Promise<void> {
    await this.page.goto('/products');
    await this.page.waitForLoadState('networkidle');
  }

  async searchProducts(query: string): Promise<void> {
    await this.searchInput.fill(query);
    await this.searchInput.press('Enter');
    await this.page.waitForURL(url => url.searchParams.has('search'));
  }

  async filterByCategory(categoryId: number | string): Promise<void> {
    await this.categorySelect.selectOption(categoryId.toString());
    await this.page.waitForURL(url => url.searchParams.has('category'));
  }

  async sortBy(sortOption: string): Promise<void> {
    await this.sortDropdown.selectOption(sortOption);
    await this.page.waitForURL(url => url.searchParams.has('sort'));
  }

  async goToPage(pageNumber: number): Promise<void> {
    await this.paginationControls.locator(`[data-testid="page-${pageNumber}"]`).click();
    await this.page.waitForURL(url => url.searchParams.get('page') === pageNumber.toString());
  }

  async getProductCount(): Promise<number> {
    return await this.productCards.count();
  }

  async clickProduct(productId: number | string): Promise<void> {
    await this.page.locator(`[data-testid="product-${productId}"]`).click();
    await this.page.waitForLoadState('networkidle');
  }

  async filterByPriceRange(minPrice: number, maxPrice: number): Promise<void> {
    await this.priceMinInput.fill(minPrice.toString());
    await this.priceMaxInput.fill(maxPrice.toString());
    await this.applyPriceFilter.click();
    await this.page.waitForURL(url => url.searchParams.has('minPrice'));
  }

  async filterByMinRating(rating: number): Promise<void> {
    await this.starRating.nth(rating - 1).click();
    await this.page.waitForURL(url => url.searchParams.has('minRating'));
  }

  async setPageSize(size: number): Promise<void> {
    await this.pageSizeSelect.selectOption(size.toString());
    await this.page.waitForURL(url => url.searchParams.get('pageSize') === size.toString());
  }

  async toggleProductFavorite(productIndex: number): Promise<void> {
    await this.productCards
      .nth(productIndex)
      .locator('button[aria-label="Add to favorites"]')
      .click();
  }

  async filterByFavorites(): Promise<void> {
    await this.favoritesToggle.click();
    await this.page.waitForURL(url => url.searchParams.has('showFavorites'));
  }

  async clearAllFiltersAndSearch(): Promise<void> {
    await this.clearAllFilters.click();
    await this.page.waitForURL(url => url.searchParams.toString() === '');
  }

  async clearSearch(): Promise<void> {
    await this.clearSearchButton.click();
    await this.page.waitForURL(url => !url.searchParams.has('search'));
  }

  async getFavoriteButton(productId: number): Promise<Locator> {
    return this.page
      .locator(`[data-testid="product-${productId}"]`)
      .locator('[data-testid="favorite-button"]');
  }

  async toggleFavorite(productId: number): Promise<void> {
    const favoriteButton = await this.getFavoriteButton(productId);
    await favoriteButton.click();
  }
}

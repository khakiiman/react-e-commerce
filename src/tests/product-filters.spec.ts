import { expect, test } from '@playwright/test';

import { Product } from '../types/api';
import { ProductsPagePOM } from './pages/ProductsPage';

test.describe('Product Filters Functionality', () => {
  // Mock data for testing
  const mockProducts: Product[] = [
    {
      id: 1,
      title: 'iPhone 9',
      price: 549,
      description: 'An apple mobile which is nothing like apple',
      category: {
        id: 1,
        name: 'Smartphones',
        image: 'https://example.com/smartphone.jpg',
        creationAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      images: ['https://example.com/iphone9-1.jpg', 'https://example.com/iphone9-2.jpg'],
      creationAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      rating: 4.2,
      stock: 94,
    },
    {
      id: 2,
      title: 'iPhone X',
      price: 899,
      description: 'SIM-Free, Model A19211 6.5-inch Super Retina HD display with OLED technology',
      category: {
        id: 1,
        name: 'Smartphones',
        image: 'https://example.com/smartphone.jpg',
        creationAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      images: ['https://example.com/iphonex-1.jpg', 'https://example.com/iphonex-2.jpg'],
      creationAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      rating: 4.7,
      stock: 34,
    },
    {
      id: 3,
      title: 'Samsung Universe 9',
      price: 1249,
      description: "Samsung's new variant which goes beyond Galaxy to the Universe",
      category: {
        id: 1,
        name: 'Smartphones',
        image: 'https://example.com/smartphone.jpg',
        creationAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      images: ['https://example.com/samsung-1.jpg', 'https://example.com/samsung-2.jpg'],
      creationAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      rating: 3.8,
      stock: 36,
    },
    {
      id: 4,
      title: 'MacBook Pro',
      price: 1749,
      description: 'MacBook Pro 2021 with mini-LED display may launch between September, November',
      category: {
        id: 2,
        name: 'Laptops',
        image: 'https://example.com/laptop.jpg',
        creationAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      images: ['https://example.com/macbook-1.jpg', 'https://example.com/macbook-2.jpg'],
      creationAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      rating: 4.9,
      stock: 83,
    },
  ];

  // Setup: intercept API calls and provide mock data
  test.beforeEach(async ({ page }) => {
    // Mock the general products endpoint
    await page.route('**/products*', async route => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          data: mockProducts,
          total: mockProducts.length,
        }),
      });
    });

    // Mock categories endpoint
    await page.route('**/categories*', async route => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify([
          { id: 1, name: 'Smartphones' },
          { id: 2, name: 'Laptops' },
        ]),
      });
    });
  });

  test('should filter products by price range', async ({ page }) => {
    // Arrange
    const productsPage = new ProductsPagePOM(page);
    await productsPage.goto();

    // Wait for products to load
    await page.waitForSelector('[data-testid="product-card"]');

    // Act - Filter by price range: 600 - 1500
    const minPrice = 600;
    const maxPrice = 1500;

    // Fill in price range inputs
    await page.fill('input[name="min"]', minPrice.toString());
    await page.fill('input[name="max"]', maxPrice.toString());
    await page.click('[data-testid="apply-price-filter"]');

    // Assert - Check URL parameters
    await page.waitForURL(url => url.searchParams.has('minPrice'));
    const url = new URL(page.url());
    expect(url.searchParams.get('minPrice')).toBe(minPrice.toString());
    expect(url.searchParams.get('maxPrice')).toBe(maxPrice.toString());

    // Assert - Check visible products match the filter
    const productTitles = await page.locator('[data-testid="product-card"]').allInnerTexts();
    expect(productTitles.join('')).toContain('iPhone X');
    expect(productTitles.join('')).toContain('Samsung Universe 9');
    expect(productTitles.join('')).not.toContain('iPhone 9'); // Price too low
    expect(productTitles.join('')).not.toContain('MacBook Pro'); // Price too high

    // Assert - Check filter badge is displayed
    const priceFilterBadge = page.locator(`text=Price: ${minPrice} - ${maxPrice}`);
    await expect(priceFilterBadge).toBeVisible();

    // Act - Clear the price filter
    await page.click('[data-testid="clear-price-filter"]');

    // Assert - Check URL parameters are removed
    await page.waitForURL(url => !url.searchParams.has('minPrice'));
    const updatedUrl = new URL(page.url());
    expect(updatedUrl.searchParams.has('minPrice')).toBeFalsy();
    expect(updatedUrl.searchParams.has('maxPrice')).toBeFalsy();
  });

  test('should filter products by minimum rating', async ({ page }) => {
    // Arrange
    const productsPage = new ProductsPagePOM(page);
    await productsPage.goto();

    // Wait for products to load
    await page.waitForSelector('[data-testid="product-card"]');

    // Get the star rating elements and click on the 4th star (rating 4.5)
    const stars = page.locator('.react-stars span');
    await stars.nth(3).click(); // 0-indexed, so 4th star is index 3

    // Assert - Check URL parameters
    await page.waitForURL(url => url.searchParams.has('minRating'));
    const url = new URL(page.url());
    expect(url.searchParams.get('minRating')).toBeTruthy();

    // Assert - Check visible products match the filter
    const productTitles = await page.locator('[data-testid="product-card"]').allInnerTexts();
    expect(productTitles.join('')).toContain('iPhone X'); // 4.7 rating
    expect(productTitles.join('')).toContain('MacBook Pro'); // 4.9 rating
    expect(productTitles.join('')).not.toContain('iPhone 9'); // 4.2 rating - too low
    expect(productTitles.join('')).not.toContain('Samsung Universe 9'); // 3.8 rating - too low

    // Assert - Check filter badge is displayed
    const ratingFilterBadge = page.locator('text=Min Rating:');
    await expect(ratingFilterBadge).toBeVisible();

    // Act - Clear the rating filter
    await page.click('[data-testid="clear-rating-filter"]');

    // Assert - Check URL parameters are removed
    await page.waitForURL(url => !url.searchParams.has('minRating'));
    const updatedUrl = new URL(page.url());
    expect(updatedUrl.searchParams.has('minRating')).toBeFalsy();
  });

  test('should toggle favorite products and filter by favorites', async ({ page }) => {
    // Arrange
    const productsPage = new ProductsPagePOM(page);
    await productsPage.goto();

    // Wait for products to load
    await page.waitForSelector('[data-testid="product-card"]');

    // Act - Add product to favorites by clicking the favorite button on the product cards
    await page
      .locator('[data-testid="product-card"]')
      .first()
      .locator('button[aria-label="Add to favorites"]')
      .click();
    await page
      .locator('[data-testid="product-card"]')
      .nth(2)
      .locator('button[aria-label="Add to favorites"]')
      .click();

    // Assert - Check localStorage for favorites
    const favorites = await page.evaluate(() => {
      return JSON.parse(localStorage.getItem('favorites') || '[]');
    });
    expect(favorites.length).toBeGreaterThan(0);

    // Act - Filter by favorites
    await page.click('[data-testid="favorites-toggle"]');

    // Assert - Check URL parameters
    await page.waitForURL(url => url.searchParams.has('showFavorites'));
    const url = new URL(page.url());
    expect(url.searchParams.get('showFavorites')).toBe('true');

    // Assert - Check only favorited products are shown
    const visibleProducts = await page.locator('[data-testid="product-card"]').count();
    expect(visibleProducts).toBe(2); // We favorited two products

    // Act - Toggle favorites filter off
    await page.click('[data-testid="favorites-toggle"]');

    // Assert - Check URL parameters are removed
    await page.waitForURL(url => !url.searchParams.has('showFavorites'));
    const updatedUrl = new URL(page.url());
    expect(updatedUrl.searchParams.has('showFavorites')).toBeFalsy();

    // Assert - All products should be visible again
    const allProductCount = await page.locator('[data-testid="product-card"]').count();
    expect(allProductCount).toBe(mockProducts.length);
  });

  test('should apply multiple filters together', async ({ page }) => {
    // Arrange
    const productsPage = new ProductsPagePOM(page);
    await productsPage.goto();

    // Wait for products to load
    await page.waitForSelector('[data-testid="product-card"]');

    // Act - Apply multiple filters
    // 1. Category filter - Smartphones
    await page.selectOption('#category-select', '1');

    // 2. Price range filter - 500 to 1000
    await page.fill('input[name="min"]', '500');
    await page.fill('input[name="max"]', '1000');
    await page.click('[data-testid="apply-price-filter"]');

    // 3. Rating filter - Click the 4th star (4.0)
    const stars = page.locator('.react-stars span');
    await stars.nth(3).click();

    // Assert - Check URL parameters for all filters
    await page.waitForURL(
      url =>
        url.searchParams.has('category') &&
        url.searchParams.has('minPrice') &&
        url.searchParams.has('maxPrice') &&
        url.searchParams.has('minRating')
    );

    const url = new URL(page.url());
    expect(url.searchParams.get('category')).toBe('1');
    expect(url.searchParams.get('minPrice')).toBe('500');
    expect(url.searchParams.get('maxPrice')).toBe('1000');
    expect(url.searchParams.get('minRating')).toBeTruthy();

    // Assert - Check visible products match all filters combined
    const productTitles = await page.locator('[data-testid="product-card"]').allInnerTexts();
    expect(productTitles.join('')).toContain('iPhone X'); // Matches all filters

    // Act - Clear all filters
    await page.click('[data-testid="clear-all-filters"]');

    // Assert - Check all URL parameters are removed
    await page.waitForURL(url => url.searchParams.toString() === '');
    const updatedUrl = new URL(page.url());
    expect(updatedUrl.searchParams.toString()).toBe('');

    // Assert - All products should now be visible
    const allProductCount = await page.locator('[data-testid="product-card"]').count();
    expect(allProductCount).toBe(mockProducts.length);
  });

  test('should handle search alongside other filters', async ({ page }) => {
    // Arrange
    const productsPage = new ProductsPagePOM(page);
    await productsPage.goto();

    // Wait for products to load
    await page.waitForSelector('[data-testid="product-card"]');

    // Act - Search for "iPhone"
    await page.fill('[data-testid="search-input"]', 'iPhone');
    await page.press('[data-testid="search-input"]', 'Enter');

    // Assert - Check search results
    await page.waitForURL(url => url.searchParams.has('search'));
    let productTitles = await page.locator('[data-testid="product-card"]').allInnerTexts();
    expect(productTitles.join('')).toContain('iPhone 9');
    expect(productTitles.join('')).toContain('iPhone X');
    expect(productTitles.join('')).not.toContain('Samsung Universe 9');
    expect(productTitles.join('')).not.toContain('MacBook Pro');

    // Act - Add price filter to search
    await page.fill('input[name="min"]', '800');
    await page.click('[data-testid="apply-price-filter"]');

    // Assert - Check combined results
    await page.waitForURL(url => url.searchParams.has('minPrice'));
    productTitles = await page.locator('[data-testid="product-card"]').allInnerTexts();
    expect(productTitles.join('')).not.toContain('iPhone 9'); // Price too low
    expect(productTitles.join('')).toContain('iPhone X'); // Matches both filters

    // Act - Clear search via clear button
    await page.click('[data-testid="clear-search-button"]');

    // Assert - Price filter should remain, but search cleared
    await page.waitForURL(url => !url.searchParams.has('search'));
    const url = new URL(page.url());
    expect(url.searchParams.has('search')).toBeFalsy();
    expect(url.searchParams.get('minPrice')).toBe('800');

    // Assert - Should show all products matching the price filter
    productTitles = await page.locator('[data-testid="product-card"]').allInnerTexts();
    expect(productTitles.join('')).not.toContain('iPhone 9'); // Price too low
    expect(productTitles.join('')).toContain('iPhone X');
    expect(productTitles.join('')).toContain('Samsung Universe 9');
    expect(productTitles.join('')).toContain('MacBook Pro');
  });

  test('should show empty state with appropriate message when no products match filters', async ({
    page,
  }) => {
    // Arrange
    const productsPage = new ProductsPagePOM(page);
    await productsPage.goto();

    // Wait for products to load
    await page.waitForSelector('[data-testid="product-card"]');

    // Act - Apply impossible filter combination
    // Set price too high for any product
    await page.fill('input[name="min"]', '2000');
    await page.click('[data-testid="apply-price-filter"]');

    // Assert - Check empty state is shown
    await page.waitForSelector('text=No products found for your current filters');
    const emptyState = page.locator('text=No products found for your current filters');
    await expect(emptyState).toBeVisible();

    // Assert - Check that filter badges are still visible
    const priceFilterBadge = page.locator('text=Price: 2000 -');
    await expect(priceFilterBadge).toBeVisible();

    // Act - Clear filters and verify products return
    await page.click('[data-testid="clear-all-filters"]');

    // Assert - Products should be visible again
    await page.waitForSelector('[data-testid="product-card"]');
    const productCount = await page.locator('[data-testid="product-card"]').count();
    expect(productCount).toBe(mockProducts.length);
  });
});

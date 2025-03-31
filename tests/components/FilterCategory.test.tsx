import { expect, test } from '@playwright/test';

// Define test constants
const TEST_URL = 'http://localhost:3000/products';

test.describe('FilterCategory Component', () => {
  test.beforeEach(async ({ page }) => {
    // Go to products page where the FilterCategory component is used
    await page.goto(TEST_URL);
    
    // Wait for the component to load
    await page.waitForSelector('[data-testid="category-dropdown"]', { state: 'visible' });
  });

  test('should display all filter sections correctly', async ({ page }) => {
    // Check favorites filter is visible
    await expect(page.locator('[data-testid="favorites-toggle"]')).toBeVisible();
    
    // Check category filter is visible
    await expect(page.locator('[data-testid="category-dropdown"]')).toBeVisible();
    
    // Check price filter is visible
    await expect(page.locator('[data-testid="min-price-input"]')).toBeVisible();
    await expect(page.locator('[data-testid="max-price-input"]')).toBeVisible();
    
    // Check rating filter is visible
    await expect(page.locator('[data-testid="star-rating"]')).toBeVisible();
  });

  test('should filter by category', async ({ page }) => {
    // Get initial products count
    const initialCount = await page.locator('[data-testid="product-card"]').count();
    
    // Select a specific category
    await page.selectOption('[data-testid="category-dropdown"]', { index: 1 });
    
    // Wait for products to reload
    await page.waitForLoadState('networkidle');
    
    // Get new products count after filtering
    const filteredCount = await page.locator('[data-testid="product-card"]').count();
    
    // Verify that the URL has been updated with the category parameter
    const url = page.url();
    expect(url).toContain('category=');
    
    // The counts should be different in most cases, but this depends on the actual data
    // We just verify that the products are showing
    expect(filteredCount).toBeGreaterThan(0);
  });

  test('should filter by price range', async ({ page }) => {
    // Enter min price
    await page.fill('[data-testid="min-price-input"]', '10');
    
    // Enter max price
    await page.fill('[data-testid="max-price-input"]', '100');
    
    // Click apply button
    await page.click('[data-testid="apply-price-filter"]');
    
    // Wait for page to update
    await page.waitForLoadState('networkidle');
    
    // Verify URL contains price parameters
    const url = page.url();
    expect(url).toContain('minPrice=10');
    expect(url).toContain('maxPrice=100');
    
    // Clear price filter
    await page.click('[data-testid="clear-price-filter"]');
    
    // Wait for page to update
    await page.waitForLoadState('networkidle');
    
    // Verify price parameters are removed from URL
    const clearedUrl = page.url();
    expect(clearedUrl).not.toContain('minPrice=');
    expect(clearedUrl).not.toContain('maxPrice=');
  });

  test('should show validation error for invalid price range', async ({ page }) => {
    // Enter max price less than min price
    await page.fill('[data-testid="min-price-input"]', '100');
    await page.fill('[data-testid="max-price-input"]', '50');
    
    // Error message should be visible
    await expect(page.locator('[data-testid="price-error"]')).toBeVisible();
    await expect(page.locator('[data-testid="price-error"]')).toContainText('Min price must be lower than max price');
    
    // Apply button should be disabled
    await expect(page.locator('[data-testid="apply-price-filter"]')).toBeDisabled();
  });

  test('should filter by rating', async ({ page }) => {
    // Click on third star
    await page.click('[data-testid="star-3"]');
    
    // Wait for page to update
    await page.waitForLoadState('networkidle');
    
    // Verify URL contains rating parameter
    const url = page.url();
    expect(url).toContain('minRating=3');
    
    // Clear rating filter
    await page.click('[data-testid="clear-rating-filter"]');
    
    // Wait for page to update
    await page.waitForLoadState('networkidle');
    
    // Verify rating parameter is removed from URL
    const clearedUrl = page.url();
    expect(clearedUrl).not.toContain('minRating=');
  });

  test('should toggle favorites filter', async ({ page }) => {
    // Add a product to favorites (mock this if needed)
    await page.click('[data-testid="product-card"]:first-child [data-testid="favorite-button"]');
    
    // Click favorites toggle
    await page.click('[data-testid="favorites-toggle"]');
    
    // Wait for page to update
    await page.waitForLoadState('networkidle');
    
    // Verify URL contains favorites parameter
    const url = page.url();
    expect(url).toContain('showFavorites=true');
    
    // Click toggle again to show all products
    await page.click('[data-testid="favorites-toggle"]');
    
    // Wait for page to update
    await page.waitForLoadState('networkidle');
    
    // Verify favorites parameter is removed from URL
    const clearedUrl = page.url();
    expect(clearedUrl).not.toContain('showFavorites=');
  });
}); 
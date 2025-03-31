import { expect, test } from '@playwright/test';

import { Product } from '../types/api';
import { ProductDetailPagePOM } from './pages/ProductDetailPage';
test.describe('Product Detail Page', () => {
  const mockProduct: Product = {
    id: 1,
    title: 'iPhone 9',
    price: 549,
    description: 'An apple mobile which is nothing like apple',
    category: {
      id: 1,
      name: 'Smartphones',
      image: 'https://example.com/image.jpg',
      creationAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    images: ['https://example.com/image1.jpg', 'https://example.com/image2.jpg'],
    creationAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    rating: 4.69,
    stock: 94,
  };
  test('should load product detail page dynamically', async ({ page }) => {
    const productDetailPage = new ProductDetailPagePOM(page);
    await page.route('**/products/1', async route => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(mockProduct),
      });
    });
    await productDetailPage.goto(1);
    await expect(productDetailPage.productTitle, 'Product title should be visible').toBeVisible();
    await expect(productDetailPage.productTitle, 'Product title should match').toHaveText(
      'iPhone 9'
    );
    await expect(productDetailPage.productPrice, 'Product price should be visible').toBeVisible();
    await expect(productDetailPage.productPrice, 'Product price should match').toContainText('549');
  });
  test('should toggle favorite status on product detail page', async ({ page }) => {
    const productDetailPage = new ProductDetailPagePOM(page);
    await page.evaluate(() => {
      localStorage.setItem(
        'persist:root',
        JSON.stringify({
          favorites: JSON.stringify([]),
        })
      );
    });
    await page.route('**/products/1', async route => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(mockProduct),
      });
    });
    await productDetailPage.goto(1);
    const isFavorite = await productDetailPage.isFavorite();
    expect(isFavorite, 'Product should not be favorited initially').toBeFalsy();
    await productDetailPage.toggleFavorite();
    const isNowFavorite = await productDetailPage.isFavorite();
    expect(isNowFavorite, 'Product should be favorited after toggle').toBeTruthy();
    const favorites = await page.evaluate(() => {
      const storage = JSON.parse(localStorage.getItem('persist:root') || '{}');
      return JSON.parse(storage.favorites || '[]');
    });
    expect(favorites, 'Favorites should contain product ID').toContain(1);
  });
  test('should navigate to product detail from products listing', async ({ page }) => {
    const products = [mockProduct];
    await page.route('**/products*', async route => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          data: products,
          total: products.length,
        }),
      });
    });
    await page.route('**/products/1', async route => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(mockProduct),
      });
    });
    await page.goto('/products');
    await page.waitForSelector('[data-testid="product-card"]');
    await page.click('[data-testid="product-1"]');
    await page.waitForURL('**/products/1');
    const title = page.locator('[data-testid="product-title"]');
    await expect(title, 'Product title should be visible after navigation').toBeVisible();
    await expect(title, 'Product title should match after navigation').toHaveText('iPhone 9');
  });
});

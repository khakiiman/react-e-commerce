import { expect, test } from '@playwright/test';

import { Product } from '../types/api';
import { ProductsPagePOM } from './pages/ProductsPage';
test.describe('Products Page', () => {
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
      rating: 4.69,
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
      rating: 4.44,
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
      rating: 4.09,
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
      rating: 4.57,
      stock: 83,
    },
  ];
  test('should display products when page loads', async ({ page }) => {
    const productsPage = new ProductsPagePOM(page);
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
    await productsPage.goto();
    const productCount = await productsPage.getProductCount();
    await expect(productCount, 'Product count should match mock data').toBe(mockProducts.length);
    await expect(
      productsPage.productCards.first(),
      'First product should be visible'
    ).toBeVisible();
  });
  test('should filter products by category', async ({ page }) => {
    const productsPage = new ProductsPagePOM(page);
    const categoryId = 1;
    await page.route(`**/products*categoryId*${categoryId}*`, async route => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          data: mockProducts.filter(p => p.category.id === categoryId),
          total: mockProducts.filter(p => p.category.id === categoryId).length,
        }),
      });
    });
    await productsPage.goto();
    await productsPage.filterByCategory(categoryId);
    await expect(
      page.locator('[data-testid="active-category"]'),
      'Category filter should be active'
    ).toHaveText('Smartphones');
    const productCount = await productsPage.getProductCount();
    await expect(productCount, 'Filtered product count should match').toBe(3);
  });
  test('should search products by title', async ({ page }) => {
    const productsPage = new ProductsPagePOM(page);
    const searchQuery = 'iPhone X';
    await page.route(`**/products*title*${searchQuery}*`, async route => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          data: mockProducts.filter(p => p.title.includes(searchQuery)),
          total: mockProducts.filter(p => p.title.includes(searchQuery)).length,
        }),
      });
    });
    await productsPage.goto();
    await productsPage.searchProducts(searchQuery);
    await expect(productsPage.searchInput, 'Search input should contain the query').toHaveValue(
      searchQuery
    );
    const productCount = await productsPage.getProductCount();
    await expect(productCount, 'Search results count should match').toBe(1);
    await expect(
      productsPage.productCards.first(),
      'Search result should be visible'
    ).toContainText('iPhone X');
  });
  test('should filter products by price range', async ({ page }) => {
    const productsPage = new ProductsPagePOM(page);
    const minPrice = 1000;
    const maxPrice = 2000;
    await page.route(`**/products*price_min*${minPrice}*price_max*${maxPrice}*`, async route => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          data: mockProducts.filter(p => p.price >= minPrice && p.price <= maxPrice),
          total: mockProducts.filter(p => p.price >= minPrice && p.price <= maxPrice).length,
        }),
      });
    });
    await productsPage.goto();
    await productsPage.filterByPriceRange(minPrice, maxPrice);
    const productCount = await productsPage.getProductCount();
    await expect(productCount, 'Price filtered product count should match').toBe(2);
    await expect(
      productsPage.productCards.first(),
      'Price filtered product should be visible'
    ).toContainText('Samsung Universe 9');
  });
  test('should filter products by minimum rating', async ({ page }) => {
    const productsPage = new ProductsPagePOM(page);
    const minRating = 4.5;
    await page.route(`**/products*min_rating*${minRating}*`, async route => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          data: mockProducts.filter(p => p.rating !== undefined && p.rating >= minRating),
          total: mockProducts.filter(p => p.rating !== undefined && p.rating >= minRating).length,
        }),
      });
    });
    await productsPage.goto();
    await productsPage.filterByMinRating(minRating);
    const productCount = await productsPage.getProductCount();
    await expect(productCount, 'Rating filtered product count should match').toBe(2);
  });
  test('should paginate products', async ({ page }) => {
    const productsPage = new ProductsPagePOM(page);
    const pageSize = 2;
    const totalProducts = mockProducts.length;
    await page.route('**/products*offset=0*limit=2*', async route => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          data: mockProducts.slice(0, 2),
          total: totalProducts,
        }),
      });
    });
    await page.route('**/products*offset=2*limit=2*', async route => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          data: mockProducts.slice(2, 4),
          total: totalProducts,
        }),
      });
    });
    await productsPage.goto();
    await productsPage.setPageSize(pageSize);
    await expect(
      productsPage.productCards.first(),
      'First product on first page should be visible'
    ).toContainText('iPhone 9');
    await expect(
      productsPage.productCards.nth(1),
      'Second product on first page should be visible'
    ).toContainText('iPhone X');
    await productsPage.goToPage(2);
    await expect(
      productsPage.productCards.first(),
      'First product on second page should be visible'
    ).toContainText('Samsung Universe 9');
    await expect(
      productsPage.productCards.nth(1),
      'Second product on second page should be visible'
    ).toContainText('MacBook Pro');
  });
  test('should toggle favorite products', async ({ page }) => {
    const productsPage = new ProductsPagePOM(page);
    await page.evaluate(() => {
      localStorage.setItem(
        'persist:root',
        JSON.stringify({
          favorites: JSON.stringify([1]),
        })
      );
    });
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
    await productsPage.goto();

    const favButton1 = await productsPage.getFavoriteButton(1);
    const favButton2 = await productsPage.getFavoriteButton(2);

    await expect(
      await favButton1.getAttribute('class'),
      'First product should be favorited'
    ).toContain('favorited');
    await expect(
      await favButton2.getAttribute('class'),
      'Second product should not be favorited'
    ).not.toContain('favorited');

    await productsPage.toggleFavorite(2);

    await expect(
      await favButton2.getAttribute('class'),
      'Second product should now be favorited'
    ).toContain('favorited');

    await productsPage.filterByFavorites();
    const productCount = await productsPage.getProductCount();
    await expect(productCount, 'Favorite products count should match').toBe(2);
  });
});

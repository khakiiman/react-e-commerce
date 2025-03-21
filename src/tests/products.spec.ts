import { test, expect } from '@playwright/test';
import { ProductsPagePOM } from './pages/ProductsPage';
import { Product } from '../types/api';

test.describe('Products Page', () => {
  // Arrange - Set up test data and conditions
  const mockProducts: Product[] = [
    {
      id: 1,
      title: 'iPhone 9',
      price: 549,
      description: 'An apple mobile which is nothing like apple',
      category: {
        id: 1,
        name: 'Smartphones',
        image: 'https://placeimg.com/640/480/any',
        creationAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      images: ['https://i.dummyjson.com/data/products/1/1.jpg'],
      creationAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      rating: 4.69,
      stock: 94
    },
    {
      id: 2,
      title: 'iPhone X',
      price: 899,
      description: 'SIM-Free, Model A19211 6.5-inch Super Retina HD display with OLED technology',
      category: {
        id: 1,
        name: 'Smartphones',
        image: 'https://placeimg.com/640/480/any',
        creationAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      images: ['https://i.dummyjson.com/data/products/2/1.jpg'],
      creationAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      rating: 4.44,
      stock: 34
    }
  ];

  test('should display products when page loads', async ({ page }) => {
    // Arrange
    const productsPage = new ProductsPagePOM(page);
    
    // Mock the API response
    await page.route('**/products*', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          data: mockProducts,
          total: mockProducts.length
        })
      });
    });

    // Act
    await productsPage.goto();

    // Assert
    const productCount = await productsPage.getProductCount();
    await expect(productCount, 'Product count should match mock data').toBe(mockProducts.length);
    await expect(productsPage.productCards.first(), 'First product should be visible').toBeVisible();
  });

  test('should filter products by category', async ({ page }) => {
    // Arrange
    const productsPage = new ProductsPagePOM(page);
    const categoryId = 1;
    
    // Mock the API response for category filter
    await page.route(`**/products*category*${categoryId}*`, async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          data: mockProducts.filter(p => p.category.id === categoryId),
          total: mockProducts.filter(p => p.category.id === categoryId).length
        })
      });
    });

    // Act
    await productsPage.goto();
    await productsPage.filterByCategory(categoryId);

    // Assert
    await expect(page.locator('[data-testid="active-category"]'), 'Category filter should be active')
      .toHaveText('Smartphones');
    const productCount = await productsPage.getProductCount();
    await expect(productCount, 'Filtered product count should match').toBe(2);
  });

  test('should search products by title', async ({ page }) => {
    // Arrange
    const productsPage = new ProductsPagePOM(page);
    const searchQuery = 'iPhone X';
    
    // Mock the API response for search
    await page.route(`**/products*search*${searchQuery}*`, async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          data: mockProducts.filter(p => p.title.includes(searchQuery)),
          total: mockProducts.filter(p => p.title.includes(searchQuery)).length
        })
      });
    });

    // Act
    await productsPage.goto();
    await productsPage.searchProducts(searchQuery);

    // Assert
    await expect(productsPage.searchInput, 'Search input should contain the query').toHaveValue(searchQuery);
    const productCount = await productsPage.getProductCount();
    await expect(productCount, 'Search results count should match').toBe(1);
    await expect(productsPage.productCards.first(), 'Search result should be visible').toContainText('iPhone X');
  });
}); 
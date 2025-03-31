import { Locator, Page } from '@playwright/test';

import { Product } from '../../types/api';
import { ProductDetailPage } from '../../types/tests';

export class ProductDetailPagePOM implements ProductDetailPage {
  readonly page: Page;
  readonly productTitle: Locator;
  readonly productPrice: Locator;
  readonly productDescription: Locator;
  readonly favoriteButton: Locator;
  readonly addToCartButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productTitle = page.locator('[data-testid="product-title"]');
    this.productPrice = page.locator('[data-testid="product-price"]');
    this.productDescription = page.locator('[data-testid="product-description"]');
    this.favoriteButton = page.locator('[data-testid="detail-favorite-button"]');
    this.addToCartButton = page.locator('[data-testid="add-to-cart-detail-button"]');
  }

  async goto(productId: number): Promise<void> {
    await this.page.goto(`/products/${productId}`);
    await this.page.waitForLoadState('networkidle');
  }

  async toggleFavorite(): Promise<void> {
    await this.favoriteButton.click();
  }

  async isFavorite(): Promise<boolean> {
    const classList = await this.favoriteButton.innerHTML();
    return classList.includes('text-red-500');
  }

  async addToCart(): Promise<void> {
    await this.addToCartButton.click();
  }

  async getTitle(): Promise<string> {
    return (await this.productTitle.textContent()) || '';
  }

  async getPrice(): Promise<string> {
    return (await this.productPrice.textContent()) || '';
  }

  async getDescription(): Promise<string> {
    return (await this.productDescription.textContent()) || '';
  }

  async getProductInfo(): Promise<Partial<Product>> {
    return {
      title: (await this.productTitle.textContent()) || '',
      price: parseFloat(((await this.productPrice.textContent()) || '0').replace(/[^0-9.]/g, '')),
      description: (await this.productDescription.textContent()) || '',
    };
  }
}

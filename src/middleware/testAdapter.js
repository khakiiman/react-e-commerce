/**
 * Test file for DummyJSON adapter
 * 
 * This file can be run to verify that the adapter is properly converting
 * DummyJSON API responses to the format expected by the frontend.
 */

import { productService } from './dummyJsonAdapter.js';


async function testProducts() {
  console.log('===== Testing Products =====');
  try {
    const products = await productService.getProducts({ limit: 5 });
    console.log(`Retrieved ${products.length} products`);
    console.log('First product sample:');
    console.log(JSON.stringify(products[0], null, 2));
    
    
    const product = products[0];
    const requiredFields = ['id', 'title', 'price', 'description', 'category', 'images'];
    
    const missingFields = requiredFields.filter(field => !(field in product));
    if (missingFields.length) {
      console.error('ERROR: Product is missing required fields:', missingFields);
    } else {
      console.log('SUCCESS: Product has all required fields');
    }
    
    
    if (typeof product.category === 'object' && 
        'id' in product.category && 
        'name' in product.category) {
      console.log('SUCCESS: Category has correct structure');
    } else {
      console.error('ERROR: Category has incorrect structure');
      console.log(product.category);
    }
    
    
    if (Array.isArray(product.images) && product.images.length > 0) {
      console.log('SUCCESS: Images array is correct');
    } else {
      console.error('ERROR: Images array is incorrect');
      console.log(product.images);
    }
  } catch (error) {
    console.error('Error testing products:', error);
  }
}


async function testSingleProduct() {
  console.log('\n===== Testing Single Product =====');
  try {
    const product = await productService.getProduct(1);
    console.log('Retrieved product:');
    console.log(JSON.stringify(product, null, 2));
    
    
    const requiredFields = ['id', 'title', 'price', 'description', 'category', 'images'];
    
    const missingFields = requiredFields.filter(field => !(field in product));
    if (missingFields.length) {
      console.error('ERROR: Product is missing required fields:', missingFields);
    } else {
      console.log('SUCCESS: Product has all required fields');
    }
  } catch (error) {
    console.error('Error testing single product:', error);
  }
}


async function testCategories() {
  console.log('\n===== Testing Categories =====');
  try {
    const categories = await productService.getCategories();
    console.log(`Retrieved ${categories.length} categories`);
    console.log('First category sample:');
    console.log(JSON.stringify(categories[0], null, 2));
    
    
    const category = categories[0];
    const requiredFields = ['id', 'name', 'image'];
    
    const missingFields = requiredFields.filter(field => !(field in category));
    if (missingFields.length) {
      console.error('ERROR: Category is missing required fields:', missingFields);
    } else {
      console.log('SUCCESS: Category has all required fields');
    }
  } catch (error) {
    console.error('Error testing categories:', error);
  }
}


async function testProductCount() {
  console.log('\n===== Testing Product Count =====');
  try {
    const count = await productService.getTotalProductCount();
    console.log(`Total product count: ${count}`);
    
    if (typeof count === 'number' && count > 0) {
      console.log('SUCCESS: Product count is valid');
    } else {
      console.error('ERROR: Product count is invalid');
    }
  } catch (error) {
    console.error('Error testing product count:', error);
  }
}


async function testCategoryFiltering() {
  console.log('\n===== Testing Category Filtering =====');
  try {
    
    const categories = await productService.getCategories();
    
    if (categories.length === 0) {
      console.error('ERROR: No categories available for testing');
      return;
    }
    
    
    const testCategoryId = categories[0].id;
    console.log(`Testing category filter with ID: ${testCategoryId}, Name: ${categories[0].name}`);
    
    
    const products = await productService.getProducts({ categoryId: testCategoryId });
    
    console.log(`Retrieved ${products.length} products for category ID ${testCategoryId}`);
    
    if (products.length > 0) {
      console.log('First product sample:');
      console.log(JSON.stringify(products[0], null, 2));
      console.log('SUCCESS: Products retrieved for category');
    } else {
      console.error('ERROR: No products retrieved for category');
    }
  } catch (error) {
    console.error('Error testing category filtering:', error);
  }
}


async function testCategoryConsistency() {
  console.log('\n===== Testing Category ID Consistency =====');
  try {
    
    const categories = await productService.getCategories();
    
    if (categories.length === 0) {
      console.error('ERROR: No categories available for testing');
      return;
    }
    
    
    const testCategory = categories[0];
    console.log(`Testing with category: ID ${testCategory.id}, Name ${testCategory.name}`);
    
    
    const products = await productService.getProducts({ categoryId: testCategory.id });
    
    if (products.length === 0) {
      console.error('ERROR: No products found for category');
      return;
    }
    
    
    const matchingProducts = products.filter(
      p => p.category && p.category.id === testCategory.id
    );
    
    console.log(`Found ${matchingProducts.length} of ${products.length} products with matching category ID`);
    
    if (matchingProducts.length === products.length) {
      console.log('SUCCESS: All products have consistent category IDs');
    } else {
      console.error('ERROR: Some products have inconsistent category IDs');
      
      
      const mismatchedProducts = products.filter(p => p.category.id !== testCategory.id);
      if (mismatchedProducts.length > 0) {
        console.log('Sample mismatched product:');
        console.log(`Product category ID: ${mismatchedProducts[0].category.id}, Expected: ${testCategory.id}`);
        console.log(`Product category name: ${mismatchedProducts[0].category.name}, Expected: ${testCategory.name}`);
      }
    }
  } catch (error) {
    console.error('Error testing category consistency:', error);
  }
}


async function runTests() {
  console.log('======================================');
  console.log('STARTING DUMMYJSON ADAPTER TESTS');
  console.log('======================================\n');
  
  await testProducts();
  await testSingleProduct();
  await testCategories();
  await testProductCount();
  await testCategoryFiltering();
  await testCategoryConsistency();
  
  console.log('\n======================================');
  console.log('TESTS COMPLETED');
  console.log('======================================');
}


runTests(); 
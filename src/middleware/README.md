# DummyJSON API Adapter

## Overview

This middleware adapter converts responses from the [DummyJSON API](https://dummyjson.com/) to match the format expected by the frontend which was originally designed to work with the [Escuela JS API](https://api.escuelajs.co/api/v1/).

## Why This Middleware?

The DummyJSON API provides better images, more structured data, and more comprehensive product information. However, our frontend was built to work with the Escuela JS API structure. This middleware allows us to benefit from the better data quality of DummyJSON without having to refactor the entire frontend.

## How It Works

1. The middleware intercepts API calls intended for Escuela JS API
2. It maps the request parameters to compatible DummyJSON endpoints
3. It fetches data from DummyJSON
4. It transforms the response to match the structure expected by the frontend
5. It returns the transformed data to the frontend

## Implementation Details

### DummyJSON Product → Escuela JS Format

```javascript
{
  "id": 1,
  "title": "iPhone 9",
  "description": "An apple mobile...",
  "price": 549,
  "discountPercentage": 12.96,
  "rating": 4.69,
  "stock": 94,
  "brand": "Apple",
  "category": "smartphones",
  "thumbnail": "https://cdn.dummyjson.com/product-images/1/thumbnail.jpg",
  "images": [
    "https://cdn.dummyjson.com/product-images/1/1.jpg",
    "https://cdn.dummyjson.com/product-images/1/2.jpg"
  ]
}

{
  "id": 1,
  "title": "iPhone 9",
  "price": 549,
  "description": "An apple mobile...",
  "category": {
    "id": 123456,
    "name": "Smartphones",
    "image": "https://cdn.dummyjson.com/product-images/1/thumbnail.jpg",
    "creationAt": "2023-01-01T00:00:00.000Z",
    "updatedAt": "2023-01-01T00:00:00.000Z"
  },
  "images": [
    "https://cdn.dummyjson.com/product-images/1/1.jpg",
    "https://cdn.dummyjson.com/product-images/1/2.jpg"
  ],
  "creationAt": "2023-01-01T00:00:00.000Z",
  "updatedAt": "2023-01-01T00:00:00.000Z",
  "rating": 4.69,
  "brand": "Apple",
  "discountPercentage": 12.96,
  "stock": 94
}
```

## API Endpoint Mapping

| Escuela JS Endpoint | DummyJSON Equivalent | Notes |
|---------------------|----------------------|-------|
| `/products` | `/products` | Pagination params adapted (offset → skip) |
| `/products?title=X` | `/products/search?q=X` | Client-side filtering may be needed |
| `/products/{id}` | `/products/{id}` | Direct mapping |
| `/products?categoryId=X` | `/products/category/{name}` | Needs category name lookup |
| `/categories` | `/products/categories` | Transformed to match expected structure |

## Testing

You can test the adapter by running:

```bash
node src/middleware/testAdapter.js
```

This will run a series of tests to verify that the adapter is correctly transforming DummyJSON responses to the format expected by the frontend. 
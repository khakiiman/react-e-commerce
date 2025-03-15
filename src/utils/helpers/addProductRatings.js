/**
 * Adds random ratings to products if they don't already have them
 * Ratings are between 1 and 5 with 0.5 step increments
 * @param {Array} products - Array of product objects
 * @returns {Array} - Products with ratings added
 */
const addProductRatings = (products) => {
  const possibleRatings = [1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5];
  
  return products.map(product => {
    if (!product.rating) {
      const randomIndex = Math.floor(Math.random() * possibleRatings.length);
      return {
        ...product,
        rating: possibleRatings[randomIndex]
      };
    }
    return product;
  });
};

export default addProductRatings; 
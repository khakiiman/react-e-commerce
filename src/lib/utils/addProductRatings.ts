interface Product {
  rating?: number;
  [key: string]: number | string | boolean | undefined;
}
const addProductRatings = (products: Product[]): Product[] => {
  const possibleRatings: number[] = [1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5];
  return products.map(product => {
    if (!product.rating) {
      const randomIndex = Math.floor(Math.random() * possibleRatings.length);
      return {
        ...product,
        rating: possibleRatings[randomIndex],
      };
    }
    return product;
  });
};
export default addProductRatings;

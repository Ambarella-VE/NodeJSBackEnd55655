// ProductsManager.test.mjs
import { describe, expect, test, afterEach, beforeEach } from "@jest/globals";
import ProductsManager from "./ProductsManager.js";

describe('ProductsManager', () => {
  let productManager;

  beforeEach(() => {
    productManager = new ProductsManager();
  });

  afterEach(() => {
    productManager.items = [];
  });

  test('should start with an empty products array', () => {
    expect(productManager.getAll()).toEqual([]);
  });

  test('should add a product successfully', () => {
    const data = {
      title: 'Test Product',
      description: 'This is a test product',
      price: 100,
      thumbnail: 'No image',
      code: 'abc123',
      stock: 10,
    };

    productManager.add(data);

    const products = productManager.getAll();

    expect(products).toHaveLength(1);
    expect(products[0]).toEqual(expect.objectContaining(data));
  });

  test('should throw an error when adding a product with a duplicate code', () => {
    const data = {
      title: 'Test Product',
      description: 'This is a test product',
      price: 100,
      thumbnail: 'No image',
      code: 'abc123',
      stock: 10,
    };

    productManager.add(data);

    // Check for the substring in the error message
    expect(() => productManager.add(data)).toThrowError(`Product with the same code ${data.code} already exists.`);
  });

  test('should throw an error when getting a non-existing product', () => {
    const nonExistingProductId = 999;

    expect(() => productManager.get(nonExistingProductId)).toThrowError(`Item with ID ${nonExistingProductId} not found`);
  });
});

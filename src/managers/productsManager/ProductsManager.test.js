// ProductsManager.test.js
import { describe, expect, test, beforeEach } from '@jest/globals';
import ProductsManager from './ProductsManager';

describe('ProductsManager', () => {
  let productsManager;
  const filePath = 'src/data/products.json';

  beforeEach(() => {
    // Always start with a new instance of ProductsManager
    productsManager = new ProductsManager(filePath);
  });

  test('should start with an empty products array or load existing data', () => {
    // Initialize ProductsManager and let the init method handle loading or starting empty
    productsManager.init();

    // Check if the items array is either empty or contains existing data
    const products = productsManager.getAll();
    expect(Array.isArray(products)).toBe(true);
  });
  const randomThreeDigitNumber = () => {
    return Math.floor(Math.random() * (999 - 100 + 1)) + 100;
  }
  const randCode = `abc${randomThreeDigitNumber()}`;

  const data = {
    title: 'Test Product',
    description: 'This is a test product',
    price: 100,
    thumbnail: 'No image',
    code: randCode,
    stock: 10,
  };
  test('should add a product successfully', () => {

    productsManager.add(data);

    const products = productsManager.getAll();

    expect(products[products.length - 1]).toEqual(expect.objectContaining(data));
  });


  test('should throw an error when adding a product with a duplicate code', () => {
    const duplicateProduct = {
      ...data,
      id: data.code
    }

    expect(() => productsManager.add(duplicateProduct)).toThrowError(`Product with the same code ${data.code} already exists`);
  });

  test('should throw an error when getting a non-existing product', () => {
    const nonExistingProductCode = 'non-existing-code';

    expect(() => productsManager.get(nonExistingProductCode)).toThrowError(`Item with ID ${nonExistingProductCode} not found`);
  });

  test('should throw an error when deleting a non-existing product', () => {
    const nonExistingProductCode = 'non-existing-code';

    expect(() => productsManager.delete(nonExistingProductCode)).toThrowError(`Item with ID ${nonExistingProductCode} not found`);
  });

  test('should delete a product successfully', () => {

    // Delete the added product
    const indexToDel = () => {
      return  Math.floor(Math.random() * (productsManager.getAll().length + 1));
    }
    const products = productsManager.getAll();
    const idToDel = products[indexToDel()].id;
    productsManager.delete(idToDel);

    // Verify that the product was deleted successfully
    expect(() => productsManager.get(idToDel).toThrowError(
      `Item with ID ${idToDel} not found`
    ));
  });

});

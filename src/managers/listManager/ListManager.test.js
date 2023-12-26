// ListManager.test.js
import { describe, expect, test, afterEach, beforeEach } from '@jest/globals';
import fs from 'fs';
import ListManager from './ListManager';

describe('ListManager', () => {
  let listManager;
  const testFilePath = 'src/data/test.json';

  beforeEach(() => {
    listManager = new ListManager(testFilePath);
  });


  test('should start with an empty array or load existing data', () => {
    // Initialize listManager and let the init method handle loading or starting empty
    listManager.init();

    // Check if the items array is either empty or contains existing data
    const items = listManager.getAll();
    expect(Array.isArray(items)).toBe(true);
  });

  test('should add an item successfully', () => {
    const data = {
      title: 'Test Item',
      description: 'This is a test item',
      price: 50,
      thumbnail: 'No image',
      code: 'def456',
      stock: 5,
    };

    listManager.add(data);

    const items = listManager.getAll();

    expect(items[items.length-1]).toEqual(expect.objectContaining(data));
  });

  test('should delete an item successfully', () => {

    // Delete the added item
    const indexToDel = () => {
      return  Math.floor(Math.random() * (listManager.getAll().length + 1));
    }
    const items = listManager.getAll();
    const idToDel = items[indexToDel()].id;
    listManager.delete(idToDel);

    // Verify that the product was deleted successfully
    expect(() => listManager.get(idToDel).toThrowError(
      `Item with ID ${idToDel} not found`
    ));
  });

  test('should throw an error when deleting a non-existing item', () => {
    const nonExistingItemId = 'non-existing-id';

    expect(() => listManager.delete(nonExistingItemId)).toThrowError(`Item with ID ${nonExistingItemId} not found`);
  });
});

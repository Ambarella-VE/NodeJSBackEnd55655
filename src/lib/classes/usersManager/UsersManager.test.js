// UsersManager.test.js
import { describe, expect, test, beforeEach } from '@jest/globals';
import { UsersManager } from './UsersManager.js';

describe('UsersManager', () => {
  let userManager;
  const filePath = 'src/data/users.json';

  beforeEach(() => {
    // Always start with a new instance of UsersManager
    userManager = new UsersManager(filePath);
  });

  test('should start with an empty users array or load existing data', () => {
    // Initialize UsersManager and let the init method handle loading or starting empty
    userManager.init();

    // Check if the items array is either empty or contains existing data
    const users = userManager.getAll();
    expect(Array.isArray(users)).toBe(true);
  });
  const randomThreeDigitNumber = () => {
    return Math.floor(Math.random() * (999 - 100 + 1)) + 100;
  }
  const randCode = `abc${randomThreeDigitNumber()}`;

  const data = {
    name: "Ana Doe",
    photo: "http://",
    email: `my${randCode}@example.com`
  };
  test('should add a product successfully', () => {

    userManager.add(data);

    const users = userManager.getAll();

    expect(users[users.length - 1]).toEqual(expect.objectContaining(data));
  });


  test('should throw an error when adding a user with a duplicate email', () => {
    const duplicateUser = {
      ...data,
      id: data.email
    }

    expect(() => userManager.add(duplicateUser)).toThrowError('User with the same email already exists');
  });

  test('should throw an error when getting a non-existing user', () => {
    const nonExistingID = 'non-existing-code';

    expect(() => userManager.get(nonExistingID)).toThrowError(`Item with ID ${nonExistingID} not found`);
  });

  test('should throw an error when deleting a non-existing product', () => {
    const nonExistingID = 'non-existing-code';

    expect(() => userManager.delete(nonExistingID)).toThrowError(`Item with ID ${nonExistingID} not found`);
  });

  test('should delete a user successfully', () => {

    // Delete the added product
    const indexToDel = () => {
      return  Math.floor(Math.random() * (userManager.getAll().length + 1));
    }
    const users = userManager.getAll();
    const idToDel = users[indexToDel()].id;
    userManager.delete(idToDel);

    // Verify that the product was deleted successfully
    expect(() => userManager.get(idToDel).toThrowError(
      `Item with ID ${idToDel} not found`
    ));
  });

});

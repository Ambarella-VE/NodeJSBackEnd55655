// UserManager.test.js
import { describe, expect, test, afterEach, beforeEach } from '@jest/globals';
import UsersManager from './UsersManager';

describe('UsersManager', () => {
  let userManager;

  beforeEach(() => {
    userManager = new UsersManager();
  });

  afterEach(() => {
    userManager.items = [];
  });

  test('should start with an empty users array', () => {
    expect(userManager.getAll()).toEqual([]);
  });

  test('should add a user successfully', () => {
    const data = {
      name: 'Test User',
      photo: 'No image',
      email: 'test@example.com',
    };

    userManager.add(data);

    const users = userManager.getAll();

    expect(users).toHaveLength(1);
    expect(users[0]).toEqual(expect.objectContaining(data));
  });

  test('should throw an error when adding a user with a duplicate email', () => {
    const data = {
      name: 'Test User',
      photo: 'No image',
      email: 'test@example.com',
    };

    userManager.add(data);

    expect(() => userManager.add(data)).toThrowError('User with the same email already exists.');
  });

  test('should throw an error when getting a non-existing user', () => {
    const nonExistingUserId = 999;

    expect(() => userManager.get(nonExistingUserId)).toThrowError(`Item with ID ${nonExistingUserId} not found`);
  });
});

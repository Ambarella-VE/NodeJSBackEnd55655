// ListManager.test.js
import ListManager from "./ListManager";

describe("ListManager", () => {
  let listManager;

  beforeEach(() => {
    // Initialize a new ListManager instance before each test
    listManager = new ListManager();
  });

  test("should add an item to the list", () => {
    const item = { name: "Example Item" };
    listManager.add(item);

    expect(listManager.getAll()).toEqual([
      expect.objectContaining({ id: 1, name: "Example Item" }),
    ]);
  });

  test("should get an item by id", () => {
    const item = { name: "Example Item" };
    listManager.add(item);

    const retrievedItem = listManager.get(1);

    expect(retrievedItem).toEqual(
      expect.objectContaining({ id: 1, name: "Example Item" })
    );
  });

  test("should throw an error when getting an item with an invalid id", () => {
    expect(() => listManager.get(1)).toThrowError("Item with ID 1 not found");
  });

  // Add more test cases as needed
});

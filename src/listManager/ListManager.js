// ListManager.js
export default class ListManager {
  items= [];

  constructor() {}

  generateID() {
    return this.items.length === 0
      ? 1
      : this.items[this.items.length - 1].id + 1;
  }

  add(item) {
    const newItem = {
      ...item,
      id: this.generateID(),
    };
    this.items.push(newItem);
  }

  getAll() {
    return this.items;
  }

  get(id) {
    const itemFound = this.items.find((item) => item.id === id);

    if (!itemFound) {
      throw new Error(`Item with ID ${id} not found`);
    }

    return itemFound;
  }
}

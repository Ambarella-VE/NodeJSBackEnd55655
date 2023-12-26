import fs from 'fs';
import crypto from 'crypto';

export default class ListManager {
  constructor(path) {
    this.path = path;
    this.items = [];
    this.init();
  }

  init() {
    const fileExists = fs.existsSync(this.path);
    if (fileExists) {
      try {
        const fileContent = fs.readFileSync(this.path, 'utf-8');
        this.items = JSON.parse(fileContent);
      } catch (err) {
        console.error(err);
        throw new Error(`Could not read ${this.path}`);
      }
    } else {
      this.saveToFile();
    }
  }

  add(item) {
    const newItem = {
      ...item,
      id: crypto.randomUUID(),
    };

    this.items.push(newItem);
    this.saveToFile();
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

  delete(id) {
    const itemFoundIndex = this.items.findIndex((item) => item.id === id);

    if (itemFoundIndex === -1) {
      throw new Error(`Item with ID ${id} not found`);
    }
    this.items.splice(itemFoundIndex, 1);
    this.saveToFile();
  }

  saveToFile() {
    fs.writeFileSync(this.path, JSON.stringify(this.items, null, 2));
  }
}

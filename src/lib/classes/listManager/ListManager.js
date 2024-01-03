/* -------------------------------------------- */
/*               //* ListManager.js             */
/* -------------------------------------------- */
import fs from 'fs';
import crypto from 'crypto';

export default class ListManager {
  constructor(path) {
    this.path = path;
    this.items = [];
    this.init();
  }

  async init() {
    return new Promise(async (resolve, reject) => {
      const fileExists = fs.existsSync(this.path);
      if (fileExists) {
        try {
          const fileContent = await fs.promises.readFile(this.path, 'utf-8');
          this.items = JSON.parse(fileContent);
          resolve();
        } catch (err) {
          console.error(err);
          reject(
            new Error(`Could not read ${this.path}. Error: ${err.message}`),
          );
        }
      } else {
        await this.saveToFile();
        resolve();
      }
    });
  }

  add(item) {
    return new Promise(async (resolve, reject) => {
      const newItem = {
        ...item,
        id: crypto.randomBytes(12).toString('hex'),
      };
      this.items.push(newItem);
      try {
        await this.saveToFile();
        resolve(newItem);
      } catch (err) {
        reject(new Error(`Error adding item: ${err.message}`));
      }
    });
  }

  getAll() {
    return new Promise((resolve, reject) => {
      resolve(this.items);
    });
  }

  get(id) {
    return new Promise((resolve, reject) => {
      const itemFound = this.items.find((item) => item.id === id);

      if (!itemFound) {
        reject(new Error(`Item with ID ${id} not found`));
      } else {
        resolve(itemFound);
      }
    });
  }

  delete(id) {
    return new Promise(async (resolve, reject) => {
      const itemFoundIndex = this.items.findIndex((item) => item.id === id);

      if (itemFoundIndex === -1) {
        reject(new Error(`Item with ID ${id} not found`));
      } else {
        this.items.splice(itemFoundIndex, 1);
        try {
          await this.saveToFile();
          resolve();
        } catch (err) {
          reject(new Error(`Error deleting item: ${err.message}`));
        }
      }
    });
  }

  update(id, item) {
    return new Promise(async (resolve, reject) => {
      
    });
  }

  async saveToFile() {
    try {
      await fs.promises.writeFile(
        this.path,
        JSON.stringify(this.items, null, 2),
      );
    } catch (error) {
      throw new Error(`Error writing to file ${this.path}. ${error.message}`);
    }
  }
}

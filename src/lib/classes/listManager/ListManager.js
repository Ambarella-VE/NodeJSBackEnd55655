/* -------------------------------------------- */
/*               //* ListManager.js             */
/* -------------------------------------------- */
import fs from 'fs';
import crypto from 'crypto';
import { cliError } from '../../functions/cliLogs.js';

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
        resolve({
          statusCode: 201,
          response: newItem
        });
      } catch (err) {
        reject(new Error(`Error adding item: ${err.message}`));
      }
    });
  }

  addBulk(items) {
    return new Promise(async (resolve, reject) => {
      try {
        const addedItems = []
        for (const item of items) {
          try {
            const addedItem = await this.add(item);
            addedItems.push(addedItem);
          } catch (err) {
            // Log the error, but continue with the next item
            cliError(`Error adding item: ${err.message}`);
          }
        }
        if (addedItems.length > 0) {
          const statusCodes = [...new Set(await addedItems.map(item => item.statusCode))];
          if (statusCodes.length > 1 ) {
            resolve({
              statusCode: 207,
              response: addedItems
            })
          } else if (statusCodes.length > 0) {
            resolve({
              statusCode: statusCodes[0],
              response: addedItems
            })
          } else {
            resolve({
              statusCode: 201,
              response: addedItems
            })  
          }
        } else {
          resolve({
            statusCode: 400,
            response: addedItems
          })
        }
      } catch (err) {
        reject(new Error(`Error adding items: ${err.message}`));
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

  update(id, updatedItem) {
    return new Promise(async (resolve, reject) => {
      const itemIndex = this.items.findIndex((item) => item.id === id);
      if (itemIndex === -1) {
        reject(new Error(`Item with ID ${id} not found`));
      } else {
        // Provide a default value for updatedItem if it is undefined
        const { id: updatedItemId, ...updatedItemWithoutId } = updatedItem || {};
        // Merge the current item's properties (excluding 'id') with updatedItemWithoutId
        this.items[itemIndex] = {
          ...this.items[itemIndex],
          ...updatedItemWithoutId,
        };
        try {
          // Save the updated list to the file
          await this.saveToFile();
          resolve(this.items[itemIndex]);
        } catch (err) {
          reject(new Error(`Error updating item: ${err.message}`));
        }
      }
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

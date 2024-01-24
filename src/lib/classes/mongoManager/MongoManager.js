/* -------------------------------------------- */
/*              //* MongoManager.js             */
/* -------------------------------------------- */
import { cliError } from '../../functions/cliLogs.js';

export default class MongoManager {
  constructor(model) {
    this.model = model;
  }

  add(item) {
    return new Promise(async (resolve, reject) => {
      try {
        const itemAdded = await this.model.create(item);
        if (itemAdded) {
          resolve({
            statusCode: 201,
            response: itemAdded
          })
        }
      } catch (err) {
        reject(new Error(`Error adding item: ${err.message}`))
      }
    })
  };

  // async create(data) {
  //   try {
  //     const itemAdded = await this.model.create(data);
  //     if (itemAdded) {
  //       return {
  //         statusCode: 201,
  //         response: itemAdded
  //       };
  //     }
  //   } catch (error) {
  //     throw error;
  //   }
  // }


  async addBulk(items) {

  };

  async getAll() {

  };

  async get(id) {

  };

  async delete(id) {

  };

  async update(id, item) {

  };
  
}

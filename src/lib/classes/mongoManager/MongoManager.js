/* -------------------------------------------- */
/*              //* MongoManager.js             */
/* -------------------------------------------- */
import { cliMsg } from '../../functions/cliLogs.js';

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

  async get({filter,order,limit,sort}) {

  };

  async getOne(query) {

  };

  async delete(id) {

  };

  async update(id, item) {

  };
  
  async stats({filter}){
    return new Promise(async (resolve, reject) => {
      try {
        let stats = await this.model.find(filter).explain('executionStats');
        cliMsg(stats)
        
      } catch (error) {
        reject(new Error(error.message))
      }
    })
  }
}

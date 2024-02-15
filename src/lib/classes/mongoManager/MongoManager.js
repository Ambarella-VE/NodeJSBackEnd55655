/* -------------------------------------------- */
/*              //* MongoManager.js             */
/* -------------------------------------------- */
import { cliMsg } from '../../functions/cliLogs.js';
import Product from '../../../data/mongo/models/products.model.js';
import User from '../../../data/mongo/models/users.model.js';
import Order from '../../../data/mongo/models/orders.model.js';

export default class MongoManager {
  constructor(model) {
    this.model = model;
  }

  add(item) {
    return new Promise(async (resolve, reject) => {
      try {
        const itemAdded = await this.model.create(item);
        resolve(itemAdded.id);
      } catch (err) {
        reject(new Error(`Error adding item: ${err.message}`));
      }
    });
  }

  async get({filter = {}, options = {page: 0,limit:10}}) {
    return new Promise(async (resolve, reject) => {
      try {
        const found = await this.model.paginate(filter,options)
        if (found) {
          resolve(found);
        } else {
          reject(new Error(`No documents found for this query`))
        }
      } catch (err) {
        reject(new Error(err.message));
      }
    })
  }

  
  async getOne(id) {
    return new Promise(async (resolve, reject) => {
      try {
        const found = await this.model.findById(id)
        resolve(found)
      } catch (err) {
        reject(new Error(err.message));
      }
    })
  }
  
  async getBy(filter) {
    return new Promise(async (resolve, reject) => {
      try {
        const found = await this.model.find(filter)
        resolve(found)
      } catch (err) {
        reject(new Error(err.message));
      }
    });
  }
  
  async delete(id) {
    return new Promise(async (resolve, reject) => {
      try {
        const deleted = await this.model.findByIdAndDelete(id);
        resolve(deleted);
      } catch (err) {
        reject(new Error(err.message));
      }
    })
  }
  
  async update(id, item) {
    return new Promise(async (resolve, reject) => {
      try {
        const updated = await this.model.findByIdAndUpdate(id,item);
        resolve(updated)
      } catch (err) {
        reject(new Error(err.message));
      }
    })
  }

  async stats({ filter }) {
    return new Promise(async (resolve, reject) => {
      try {
        const  stats = await this.model.find(filter).explain('executionStats');
        cliMsg(stats);
        resolve(stats)
      } catch (err) {
        reject(new Error(err.message));
      }
    });
  }
}


export const productsManager = new MongoManager(Product);
export const usersManager = new MongoManager(User);
export const ordersManager = new MongoManager(Order);

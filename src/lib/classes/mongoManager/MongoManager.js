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
        resolve(itemAdded.id);
      } catch (err) {
        reject(new Error(`Error adding item: ${err.message}`));
      }
    });
  }

  async get(filter = {}, sortAndPaginate = {limit: 10, page: 1, sort: asc}) {
    return new Promise(async (resolve, reject) => {
      try {
        const found = await this.model.paginate(filter, sortAndPaginate)
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

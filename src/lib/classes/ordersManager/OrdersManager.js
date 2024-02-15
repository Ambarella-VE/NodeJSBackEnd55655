/* -------------------------------------------- */
/*              //* OrdersManager.js            */
/* -------------------------------------------- */
import ListManager from '../listManager/ListManager.js';

export default class OrdersManager extends ListManager {
  constructor(path) {
    super(path);
  }

  getByUser(uid) {
    return new Promise((resolve, reject) => {
      const itemsFound = this.items.filter((item) => item.uid === uid);
      if (itemsFound.length > 0) {
        resolve(itemsFound);
      } else {
        reject(new Error(`Items not found for user ${uid}`));
      }
    });
  }
}

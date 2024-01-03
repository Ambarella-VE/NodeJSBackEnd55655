/* -------------------------------------------- */
/*             //* ProductsManager.js           */
/* -------------------------------------------- */
import ListManager from '../listManager/ListManager.js';

export default class ProductsManager extends ListManager {
  constructor(path) {
    super(path);
  }

  add(item) {
    return new Promise((resolve, reject) => {
      const itemExists = this.items.find(
        (product) => product.code === item.code,
      );
      if (itemExists) {
        reject(
          new Error(`Product with the same code ${item.code} already exists`),
        );
      } else {
        super.add(item).then(resolve).catch(reject);
      }
    });
  }
}

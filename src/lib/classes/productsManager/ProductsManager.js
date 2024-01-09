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
      try{
        const itemExists = this.items.find(
          (product) => product.code === item.code,
        );
        if (itemExists) {
          resolve({
            statusCode: 400,
            response: itemExists
          }
          );
        } else {
          super.add(item)
        }
      } catch (err){
        reject(new Error(`Error adding item: ${err.message}`));
      }
    });
  }
}

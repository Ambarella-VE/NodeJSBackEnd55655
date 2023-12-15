// ProductsManager.js
import ListManager from "../listManager/ListManager";

export default class ProductsManager extends ListManager {
  static items;
  
  constructor() {
    super();
  }

  add(item) {
    if (this.items.find((product) => product.code === item.code)) {
      throw new Error(`Product with the same code ${item.code} already exists.`);
    } else {
      super.add(item);
    }
  }
}

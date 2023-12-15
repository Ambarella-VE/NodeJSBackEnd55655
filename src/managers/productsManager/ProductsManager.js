// ProductsManager.js
import ListManager from "../listManager/ListManager";

export default class ProductsManager extends ListManager {
  static items;
  
  constructor(path) {
    super(path);
  }

  add(item) {
    const itemExists = this.items.find((product) => product.code === item.code) 
    if (itemExists) {
      throw new Error(`Product with the same code ${item.code} already exists`);
    } else {
      super.add(item);
    }
  }
}

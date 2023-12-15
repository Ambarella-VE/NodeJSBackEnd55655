// UsersManager.js
import ListManager from "../listManager/ListManager";

export default class UsersManager extends ListManager {
  static items;
  
  constructor() {
    super();
  }

  add(item) {
    if (this.items.find(user => user.email === item.email)) {
      throw new Error('User with the same email already exists.');
    } else {
      super.add(item);
    }
  }

}

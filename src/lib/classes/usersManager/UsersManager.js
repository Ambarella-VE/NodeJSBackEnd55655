/* -------------------------------------------- */
/*              //* UsersManager.js             */
/* -------------------------------------------- */
import ListManager from "../listManager/ListManager.js";
import toTitleCase from "../../functions/toTitleCase.js";

export default class UsersManager extends ListManager {
  static items;

  constructor(path) {
    super(path);
  }

  add(item) {
    return new Promise((resolve, reject) => {
      const itemExists = this.items.find((user) => user.email === item.email);
      if (itemExists) {
        reject(new Error("User with the same email already exists"));
      } else {
        const newUser = {
          ...item,
          fName: toTitleCase(item.fName),
          lName: toTitleCase(item.lName)
        }
        super.add(newUser).then(resolve).catch(reject);
      }
    });
  }
}

/* -------------------------------------------- */
/*              //* UsersManager.js             */
/* -------------------------------------------- */
import ListManager from '../listManager/ListManager.js';
import toTitleCase from '../../functions/toTitleCase.js';

export default class UsersManager extends ListManager {
  static items;

  constructor(path) {
    super(path);
  }

  add(item) {
    return new Promise((resolve, reject) => {
      try {
        const itemExists = this.items.find((user) => user.email === item.email);
        if (itemExists) {
          resolve({
            statusCode: 400,
            response: itemExists,
          });
        } else {
          const newUser = {
            ...item,
            fName: toTitleCase(item.fName),
            lName: toTitleCase(item.lName),
          };
          super.add(newUser);
        }
      } catch (err) {
        reject(new Error(`Error adding item: ${err.message}`));
      }
    });
  }
}

/* -------------------------------------------- */
/*                //* products.js               */
/* -------------------------------------------- */

import ProductsManager from "../../lib/classes/productsManager/ProductsManager.js";

const products = new ProductsManager(
  "src/data/products.json"
);

export default products;

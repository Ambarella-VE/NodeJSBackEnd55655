/* -------------------------------------------- */
/*             //* products.router.js           */
/* -------------------------------------------- */
import express from 'express';
// import productsManager from '../../data/memory/products.js';
import {productsManager} from '../../lib/classes/mongoManager/MongoManager.js';
import { cliError, cliMsg, cliSuccess } from '../../lib/functions/cliLogs.js';

const router = express.Router();

//? getAll
router.get('/', (req, res, next) => {
  productsManager
    .get({})
    .then((products) => {
      if (products.length > 0) {
        cliSuccess(`${products.length} Products found`);
        res.json({
          statusCode: 200,
          response: products,
        });
        cliMsg('Products sent to requester');
      } else {
        const msg = 'No products found';
        cliError(msg);
        res.json({
          statusCode: 404,
          response: msg,
        });
        cliMsg('Response sent to requester');
      }
    })
    .catch((err) => {
      next(err);
    });
});

//? add
router.post('/', (req, res, next) => {
  const newProduct = req.body;
  productsManager
    .add(newProduct)
    .then((createdProduct) => {
      cliSuccess(`Product added with id ${createdProduct.id}`);
      res.json({
        statusCode: 201,
        response: createdProduct,
      });
      cliMsg('Response sent to requester');
    })
    .catch((err) => {
      next(err);
    });
});

//? add bulk
// router.post('/bulk', (req, res, next) => {
//   const newProducts = req.body;
//   productsManager
//     .addBulk(newProducts)
//     .then((createdProducts) => {
//       cliSuccess('Products added successfully');
//       res.json(createdProducts);
//       cliMsg('Response sent to requester');
//     })
//     .catch((err) => {
//       next(err);
//     });
// });

//? update
router.put('/:pid', (req, res, next) => {
  const productId = req.params.pid;
  const newProductData = req.body;
  usersManager
    .update(productId, newProductData)
    .then((updatedProduct) => {
      cliSuccess(`User with id ${updatedProduct.id} updated`);
      res.json({
        statusCode: 200,
        response: updatedProduct,
      });
      cliMsg('Response sent to requester');
    })
    .catch((err) => {
      next(err);
    });
});

//? get by ID
router.get('/:pid', (req, res, next) => {
  const productId = req.params.pid;
  productsManager
    .getOne(productId)
    .then((product) => {
      cliSuccess(`Product with ID ${productId} found`);
      res.json({
        statusCode: 200,
        response: product,
      });
      cliMsg('Response sent to requester');
    })
    .catch((err) => {
      next(err);
    });
});

//? delete by ID
router.delete('/:pid', (req, res, next) => {
  const productId = req.params.pid;
  productsManager
    .delete(productId)
    .then(() => {
      const msg = `Product with ID ${productId} deleted`;
      cliSuccess(msg);
      res.json({
        statusCode: 204,
        response: msg,
      });
      cliMsg('Response sent to requester');
    })
    .catch((err) => {
      next(err);
    });
});

export default router;

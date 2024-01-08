/* -------------------------------------------- */
/*             //* products.router.js           */
/* -------------------------------------------- */
import express from 'express';
import productsManager from '../../data/memory/products.js';
import { cliError, cliMsg, cliSuccess } from '../../lib/functions/cliLogs.js';

const router = express.Router();

//? getAll
router.get('/', (req, res) => {
  productsManager
    .getAll()
    .then((products) => {
      if (products.length > 0) {
        cliSuccess(`${products.length} Products found`);
        res.json({
          statusCode: 200,
          response: products
        });
        cliMsg('Products sent to requester');
      } else {
        const msg = 'No products found' 
        cliError(msg);
        res.json({
          statusCode: 404,
          response: msg
        });
        cliMsg('Response sent to requester');
      }
    })
    .catch((err) => {
      const msg = err.message
      cliError(msg);
      res.json({
        statusCode: 500,
        response: msg,
      });
      cliMsg('Response sent to requester');
    });
});

//? add
router.post('/', (req, res) => {
  const newProduct = req.body; // Assuming the new product data is in the request body
  productsManager
    .add(newProduct)
    .then((createdProduct) => {
      cliSuccess(`Product added with id ${createdProduct.id}`);
      res.json({
        statusCode: 201,
        response: createdProduct
      });
      cliMsg('Response sent to requester');
    })
    .catch((err) => {
      const msg = err.message
      cliError(msg);
      res.json({
        statusCode: 400,
        response: msg
      });
      cliMsg('Response sent to requester');
    });
});

//? update
router.put('/:pid', (req, res) => {
  const userId = req.params.pid;
  const newProductData = req.body;
  usersManager
    .update(userId, newProductData)
    .then(updatedProduct => {
      cliSuccess(`User with id ${updatedProduct.id} updated`);
      res.json({
        statusCode: 200,
        response: updatedProduct
      });
      cliMsg('Response sent to requester');
    })
    .catch((err) => {
      const msg = err.message
      cliError(msg);
      res.json({
        statusCode: 400,
        response: msg
      });
      cliMsg('Response sent to requester');
    });
});

//? get by ID
router.get('/:pid', (req, res) => {
  const productId = req.params.pid;
  productsManager
    .get(productId)
    .then((product) => {
      cliSuccess(`Product with ID ${productId} found`);
      res.json({
        statusCode: 200,
        response: product,
      });
      cliMsg('Response sent to requester');
    })
    .catch((err) => {
      const msg = err.message
      cliError(msg);
      res.json({
        statusCode: 404,
        response: msg,
      });
      cliMsg('Response sent to requester');
    });
});

//? delete by ID
router.delete('/:pid', (req, res) => {
  const productId = req.params.pid;
  productsManager
    .delete(productId)
    .then(() => {
      const msg = `Product with ID ${productId} deleted` 
      cliSuccess(msg);
      res.json({
        statusCode: 204,
        response: msg
      });
      cliMsg('Response sent to requester');
    })
    .catch((err) => {
      const msg = err.message
      cliError(msg);
      res.json({
        statusCode: 404,
        response: msg
      });
      cliMsg('Response sent to requester');
    });
});

export default router;

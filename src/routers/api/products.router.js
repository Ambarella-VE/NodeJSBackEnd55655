/* -------------------------------------------- */
/*             //* products.router.js           */
/* -------------------------------------------- */
import express from 'express';
import productsManager from '../../data/memory/products.js';
import { cliError, cliMsg, cliSuccess } from '../../lib/functions/cliLogs.js';

const router = express.Router();

// getAll
router.get('/', (req, res) => {
  productsManager
    .getAll()
    .then((products) => {
      if (products.length > 0) {
        cliSuccess(`${products.length} Products found`);
        res.json({
          success: true,
          statusCode: 200,
          message: `${products.length} Products found`,
          data: products,
        });
        cliMsg('Products sent to requester');
      } else {
        cliError('No products found');
        res.json({
          success: false,
          statusCode: 404,
          message: 'No products found',
        });
        cliMsg('Response sent to requester');
      }
    })
    .catch((err) => {
      cliError(err.message);
      res.json({
        statusCode: 500,
        message: err.message,
      });
      cliMsg('Response sent to requester');
    });
});

// add
router.post('/', (req, res) => {
  const newProduct = req.body; // Assuming the new product data is in the request body
  productsManager
    .add(newProduct)
    .then((createdProduct) => {
      cliSuccess(`Product added with id ${createdProduct.id}`);
      res.json({
        success: true,
        statusCode: 201,
        message: `Product added with id ${createdProduct.id}`,
        data: createdProduct,
      });
      cliMsg('Response sent to requester');
    })
    .catch((err) => {
      cliError(err.message);
      res.json({
        statusCode: 400,
        message: err.message,
      });
      cliMsg('Response sent to requester');
    });
});

// get by ID
router.get('/:id', (req, res) => {
  const productId = req.params.id;
  productsManager
    .get(productId)
    .then((product) => {
      cliSuccess(`Product with ID ${productId} found`);
      res.json({
        success: true,
        statusCode: 200,
        message: `Product with ID ${productId} found`,
        data: product,
      });
      cliMsg('Response sent to requester');
    })
    .catch((err) => {
      cliError(err.message);
      res.json({
        statusCode: 404,
        message: err.message,
      });
      cliMsg('Response sent to requester');
    });
});

// delete by ID
router.delete('/:id', (req, res) => {
  const productId = req.params.id;
  productsManager
    .delete(productId)
    .then(() => {
      cliSuccess(`Product with ID ${productId} deleted`);
      res.json({
        success: true,
        statusCode: 204,
        message: `Product with ID ${productId} deleted`,
      });
      cliMsg('Response sent to requester');
    })
    .catch((err) => {
      cliError(err.message);
      res.json({
        statusCode: 404,
        message: err.message,
      });
      cliMsg('Response sent to requester');
    });
});

export default router;

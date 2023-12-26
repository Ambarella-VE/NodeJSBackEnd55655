/* -------------------------------------------- */
/*             //* products.router.js           */
/* -------------------------------------------- */
import express, { Router } from "express";
import productsManager from "../../data/memory/products.js";
import {
  cliError,
  cliMsg,
  cliNotice,
  cliSuccess,
  cliWarn,
} from "../../lib/functions/cliLogs.js";

export const productsRoute = "/api/products";
export const productsRouter = Router();

// getAll
productsRouter.get("/", (req, res) => {
  cliMsg(`Get request received on ${productsRoute}${req.url}`);
  productsManager.getAll()
    .then((products) => {
      if (products.length > 0) {
        cliSuccess(`${products.length} Products found`);
        res.json({
          success: true,
          statusCode: 200,
          message: `${products.length} Products found`,
          data: products
        });
        cliMsg("Products sent to requester");
      } else {
        cliError("No products found");
        res.json({
          success: false,
          statusCode: 404,
          message: "No products found",
        });
        cliMsg("Response sent to requester");
      }
    })
    .catch((err) => {
      cliError(err.message);
      res.json({
        statusCode: 500,
        message: err.message,
      });
      cliMsg("Response sent to requester");
    });
});

// add
productsRouter.post("/", (req, res) => {
  cliMsg(`Post request received on ${productsRoute}${req.url}`);
  const newProduct = req.body; // Assuming the new product data is in the request body
  productsManager.add(newProduct)
  .then((createdProduct) => {
    cliSuccess(`Product added with id ${createdProduct.id}`);
    res.json({
      success: true,
      statusCode: 201,
      message: `Product added with id ${createdProduct.id}`,
      data: createdProduct,
    });
    cliMsg("Response sent to requester");
  })
  .catch((err) => {
    cliError(err.message);
    res.json({
      statusCode: 400,
      message: err.message,
    });
    cliMsg("Response sent to requester");
  });
});

// get by ID
productsRouter.get("/:id", (req, res) => {
  const productId = req.params.id;
  cliMsg(`Get request received on ${productsRoute}${req.url}`);
  productsManager.get(productId)
    .then((product) => {
      cliSuccess(`Product with ID ${productId} found`);
      res.json({
        success: true,
        statusCode: 200,
        message: `Product with ID ${productId} found`,
        data: product
      });
      cliMsg("Response sent to requester");
    })
    .catch((err) => {
      cliError(err.message);
      res.json({
        statusCode: 404,
        message: err.message,
      });
      cliMsg("Response sent to requester");
    });
});

// delete by ID
productsRouter.delete("/:id", (req, res) => {
  const productId = req.params.id;
  cliMsg(`Delete request received on ${productsRoute}${req.url} for product with ID ${productId}`);
  productsManager.delete(productId)
    .then(() => {
      cliSuccess(`Product with ID ${productId} deleted`);
      res.json({
        success: true,
        statusCode: 204,
        message: `Product with ID ${productId} deleted`,
      });
      cliMsg("Response sent to requester");
    })
    .catch((err) => {
      cliError(err.message);
      res.json({
        statusCode: 404,
        message: err.message,
      });
      cliMsg("Response sent to requester");
    });
});

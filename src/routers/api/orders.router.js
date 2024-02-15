/* -------------------------------------------- */
/*              //* orders.router.js            */
/* -------------------------------------------- */
import express from 'express';
import ordersManager from '../../data/memory/orders.js';
import { cliError, cliMsg, cliSuccess } from '../../lib/functions/cliLogs.js';

const router = express.Router();

//? getAll
router.get('/', (req, res, next) => {
  ordersManager
    .getAll()
    .then((orders) => {
      if (orders.length > 0) {
        cliSuccess(`${orders.length} orders found`);
        res.json({
          statusCode: 200,
          response: orders,
        });
      } else {
        const msg = 'No orders found';
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
  const newOrder = req.body; // Assuming the new user data is in the request body
  ordersManager
    .add(newOrder)
    .then((createdOrder) => {
      cliSuccess(`Order added with id ${createdOrder.id}`);
      res.json({
        statusCode: 201,
        response: createdOrder,
      });
      cliMsg('Response sent to requester');
    })
    .catch((err) => {
      next(err);
    });
});

//? add bulk
router.post('/bulk', (req, res, next) => {
  const newOrders = req.body;
  ordersManager
    .addBulk(newOrders)
    .then((createdOrders) => {
      cliSuccess('Products added successfully');
      res.json(createdOrders);
      cliMsg('Response sent to requester');
    })
    .catch((err) => {
      next(err);
    });
});

//? update
router.put('/:oid', (req, res, next) => {
  const orderId = req.params.oid;
  const newOrderData = req.body;
  ordersManager
    .update(orderId, newOrderData)
    .then((updatedOrder) => {
      cliSuccess(`Order with id ${updatedOrder.id} updated`);
      res.json({
        statusCode: 200,
        response: updatedOrder,
      });
      cliMsg('Response sent to requester');
    })
    .catch((err) => {
      next(err);
    });
});

//? get by Order ID
router.get('/order/:oid', (req, res, next) => {
  const orderId = req.params.oid;
  ordersManager
    .get(orderId)
    .then((order) => {
      cliSuccess(`Order with ID ${orderId} found`);
      res.json({
        statusCode: 200,
        response: order,
      });
      cliMsg('Response sent to requester');
    })
    .catch((err) => {
      next(err);
    });
});

//? get by User ID
router.get('/:uid', (req, res, next) => {
  const userId = req.params.uid;
  ordersManager
    .getByUser(userId)
    .then((orders) => {
      if (orders.length > 0) {
        cliSuccess(`${orders.length} orders found for user ${userId}`);
        res.json({
          statusCode: 200,
          response: orders,
        });
        cliMsg('Response sent to requester');
      } else {
        const msg = `No orders found for user ${userId}`;
        cliError(msg);
        res.json({
          statusCode: 404,
          response: msg,
        });
      }
    })
    .catch((err) => {
      next(err);
    });
});

export default router;

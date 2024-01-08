/* -------------------------------------------- */
/*              //* orders.router.js            */
/* -------------------------------------------- */
import express, { response } from 'express';
import ordersManager from '../../data/memory/orders.js';
import { cliError, cliMsg, cliSuccess } from '../../lib/functions/cliLogs.js';


const router = express.Router();

//? getAll
router.get('/',(req,res)=>{
  ordersManager
    .getAll()
    .then((orders) =>{
      if (orders.length > 0) {
        cliSuccess(`${orders.length} orders found`);
        res.json({
          statusCode: 200,
          response: orders
        });
      } else {
        const msg = 'No orders found' 
        cliError(msg);
        res.json({
          statusCode: 404,
          response: msg
        });
        cliMsg('Response sent to requester')
      };
    })
    .catch((err) => {
      const msg = err.message
      cliError(msg);
      res.json({
        statusCode: 500,
        response: msg
      });
      cliMsg('Response sent to requester');
    });
})

//? add
router.post('/', (req, res) => {
  const newOrder = req.body; // Assuming the new user data is in the request body
  ordersManager
    .add(newOrder)
    .then((createdOrder) => {
      cliSuccess(`Order added with id ${createdOrder.id}`);
      res.json({
        statusCode: 201,
        response: createdOrder
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
router.put('/:oid', (req, res) => {
  const orderId = req.params.oid;
  const newOrderData = req.body;
  ordersManager
    .update(orderId, newOrderData)
    .then(updatedOrder => {
      cliSuccess(`Order with id ${updatedOrder.id} updated`);
      res.json({
        statusCode: 200,
        response: updatedOrder
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

//? get by Order ID
router.get('/order/:oid', (req, res) => {
  const orderId = req.params.oid;
  ordersManager
    .get(orderId)
    .then((order) => {
      cliSuccess(`Order with ID ${orderId} found`);
      res.json({
        statusCode: 200,
        response: order
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

//? get by User ID
router.get('/:uid', (req, res) => {
  const userId = req.params.uid;
  ordersManager
    .getByUser(userId)
    .then((orders)=>{
      if (orders.length > 0) {
        cliSuccess(`${orders.length} orders found for user ${userId}`);
        res.json({
          statusCode: 200,
          response: orders
        });
        cliMsg('Response sent to requester')
      } else {
        const msg = `No orders found for user ${userId}`
        cliError(msg)
        res.json({
          statusCode: 404,
          response: msg
        })
      }
    })
    .catch((err) =>{
      const msg = err.message
      cliError(msg)
      res.json({
        statusCode: 404,
        response: msg
      });
      cliMsg('Response sent to requester');
    })
});

export default router;

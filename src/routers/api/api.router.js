/* -------------------------------------------- */
/*               //* api.router.js              */
/* -------------------------------------------- */
import express from 'express';
import productsRouter from './products.router.js';
import usersRouter from './users.router.js';
import ordersRouter from './orders.router.js';

const router = express.Router();

router.use('/products', productsRouter);
router.use('/users', usersRouter);
router.use('/orders', ordersRouter);

export default router;

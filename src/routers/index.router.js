/* -------------------------------------------- */
/*              //* index.router.js             */
/* -------------------------------------------- */
import express from 'express';
import apiRouter from './api/api.router.js';
import viewsRouter from './views/views.router.js';

const router = express.Router();

router.use('/', viewsRouter);
router.use('/api', apiRouter);

export default router;

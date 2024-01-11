/* -------------------------------------------- */
/*                 //* server.js                */
/* -------------------------------------------- */
import express from 'express';
import { cliNotice } from './src/lib/functions/cliLogs.js';
import router from './src/routers/index.router.js';
import morgan from 'morgan';
import __dirname from './utils.js';
import {
  errorHandler,
  pathHandler
} from './src/middlewares/index.mid.js';

/* --------- //# Server Configuration --------- */
const server = express();
const PORT = process.env.PORT || 8080;
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(express.static(`${__dirname}/public`));

/* ---------------- //# Routes ---------------- */
server.use('/', router);

/* -------------- //# Middlewares ------------- */
server.use(morgan('dev'));
server.use(errorHandler)
server.use(pathHandler)

/* ------------- //# Raise Server ------------- */
function ready() {
  cliNotice(`Server listening... on port ${PORT}`);
}
server.listen(PORT, ready());

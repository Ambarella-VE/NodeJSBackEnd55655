/* -------------------------------------------- */
/*                 //* server.js                */
/* -------------------------------------------- */
import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { cliNotice } from './src/lib/functions/cliLogs.js';
import router from './src/routers/index.router.js';
import morgan from 'morgan';
import __dirname from './utils.js';
import {
  errorHandler,
  pathHandler
} from './src/middlewares/index.mid.js';
import {engine} from 'express-handlebars';

/* --------- //# Server Configuration --------- */
const server = express();
const PORT = process.env.PORT || 8080;
const httpServer = createServer(server);
const socketServer = new Server(httpServer);
server.engine('handlebars', engine());
server.set('view engine', 'handlebars');
server.set('views', `${__dirname}/src/views`);
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

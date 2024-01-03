/* -------------------------------------------- */
/*                 //* server.js                */
/* -------------------------------------------- */
import express from 'express';
import { cliMsg, cliNotice } from './src/lib/functions/cliLogs.js';
import router from './src/routers/index.router.js';
import morgan from 'morgan';
import __dirname from './utils.js';

/* --------- //# Server Configuration --------- */
const server = express();
const PORT = process.env.PORT || 8080;

/* -------------- //# Middlewares ------------- */
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(express.static(`${__dirname}/public`));
server.use(morgan('dev'));

/* ---------------- //# Routes ---------------- */
server.get('/', (req, res) => {
  cliMsg(`Get request received on ${req.originalUrl}`);
  res.json({
    statusCode: 200,
  });
});

server.use('/', router);

/* ------------- //# Raise Server ------------- */
function ready() {
  cliNotice(`Server listening... on port ${PORT}`);
}
server.listen(PORT, ready());

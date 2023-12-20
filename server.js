/* -------------------------------------------- */
/*                 //* server.js                */
/* -------------------------------------------- */
import  express from 'express';
import {
  cliNotice
} from './src/lib/index.js'

/* --------- //# Server Configuration --------- */
const server = express();
const PORT = process.env.PORT || 8080;

/* -------------- //# Middlewares ------------- */
server.use(express.urlencoded({ extended: true }))

/* ---------------- //# Routes ---------------- */
server.get('/', (req, res) => {
  cliWarn(`A request was made on path ${req.url}`);
  res.sendStatus(200)
})

/* ------------- //# Raise Server ------------- */
function ready() {
  cliNotice(`Server listening on port ${PORT}`)
}
server.listen(PORT,ready());

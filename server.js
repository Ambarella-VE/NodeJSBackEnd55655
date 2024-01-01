/* -------------------------------------------- */
/*                 //* server.js                */
/* -------------------------------------------- */
import express from "express";
import {
  cliMsg,
  cliNotice,
} from "./src/lib/functions/cliLogs.js";
import {
  productsRoute,
  productsRouter,
} from "./src/api/routes/products.router.js";
import {
  usersRoute,
  usersRouter
} from "./src/api/routes/users.router.js";

/* --------- //# Server Configuration --------- */
const server = express();
const PORT = process.env.PORT || 8080;
server.use(express.json());

/* -------------- //# Middlewares ------------- */
server.use(express.urlencoded({ extended: true }));

/* ---------------- //# Routes ---------------- */
server.get("/", (req, res) => {
  cliMsg(`Get request received on ${req.originalUrl}`);
  res.json({
    statusCode: 200,
  });
});

server.use(productsRoute, productsRouter);
server.use(usersRoute, usersRouter);

/* ------------- //# Raise Server ------------- */
function ready() {
  cliNotice(`Server listening... on port ${PORT}`);
}
server.listen(PORT, ready());

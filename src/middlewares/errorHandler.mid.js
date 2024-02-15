/* -------------------------------------------- */
/*             //* errorHandler.mid.js          */
/* -------------------------------------------- */

import { cliError } from '../lib/functions/cliLogs.js';

const errorHandler = (err, req, res, next) => {
  const msg = `${req.method} ${req.originalUrl} ${err.message}`;
  cliError(msg);
  return res.json({
    statusCode: err.statusCode || 500,
    response: msg,
  });
};

export default errorHandler;

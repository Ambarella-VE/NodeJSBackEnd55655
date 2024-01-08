/* -------------------------------------------- */
/*             //* errorHandler.mid.js          */
/* -------------------------------------------- */

import { cliError } from '../lib/functions/cliLogs';

const errorHandler = (err,req,res,next) => {
  const msg = `${req.method} ${req.originalUrl} ${err.message}`
  cliError(msg)
  return res.json({
    status: 500,
    response: msg
  })
};

export default errorHandler;
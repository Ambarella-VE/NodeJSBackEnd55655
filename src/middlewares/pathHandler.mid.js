/* -------------------------------------------- */
/*             //* pathHandler.mid.js           */
/* -------------------------------------------- */
import { cliError } from '../lib/functions/cliLogs.js'

const pathHandler = (req, res, next) => {
  const msg = `${req.method} ${req.originalUrl} endpoint not found` 
  cliError(msg)
  return res.json({
    status: 404,
    response: msg
  });
};

export default pathHandler;
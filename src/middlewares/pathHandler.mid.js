/* -------------------------------------------- */
/*             //* pathHandler.mid.js           */
/* -------------------------------------------- */

const pathHandler = (req, res, next) => {
  const msg = `${req.method} ${req.originalUrl} path not found` 
  cliError(msg)
  return res.json({
    status: 500,
    response: msg
  })
};
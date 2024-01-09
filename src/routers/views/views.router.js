/* -------------------------------------------- */
/*              //* views.router.js             */
/* -------------------------------------------- */
import express from 'express';

const router = express.Router();

router.get('/', (req, res, next) => {
  try{
    res.json({
      statusCode: 200,
    });
  } catch (err) {
    next(err);
  }
});

export default router;

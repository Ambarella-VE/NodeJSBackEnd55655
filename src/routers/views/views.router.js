/* -------------------------------------------- */
/*              //* views.router.js             */
/* -------------------------------------------- */
import express from 'express';
import productsManager from '../../data/memory/products.js';
import __dirname from '../../../utils.js';

const router = express.Router();

router.get('/', (req, res, next) => {
  try {
    return res.render('index', {});
  } catch (err) {
    next(err);
  }
});

router.get('/products', (req, res, next) => {
  try {
    return res.render('products', { title: 'products' });
  } catch (err) {
    next(err);
  }
});

// router.get('/real', (req, res, next) =>{
//   productsManager
//   .getAll()
//   .then((products) => {
//     if (products.length > 0) {
//       return res.render('products',{products});
//     } else {
//       return res.render('products',{});
//     }
//   })
//   .catch((err) => {
//     next(err);
//   })
// });

router.get('/form', (req, res, next) => {
  try {
    return res.render('form', {});
  } catch (err) {
    next(err);
  }
});

router.get('/register', (req, res, next) => {
  try {
    return res.render('register', {});
  } catch (err) {
    next(err);
  }
});

export default router;

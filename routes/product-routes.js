const express = require('express');
const router = express.Router();
const { checkCookiesForUnguardedRoutes } = require('../middlewares/middlewares');
const {
    getMainPage,
    getProduct,
    searchProduct,
    getProductsByCategories,
    getSaleProducts
} = require('../controllers/product-controller');

router.get('/', checkCookiesForUnguardedRoutes, getMainPage);
router.get('/product/:id', checkCookiesForUnguardedRoutes, getProduct);
router.get('/search/:product', checkCookiesForUnguardedRoutes, searchProduct);
router.get('/category/:categoryName', checkCookiesForUnguardedRoutes, getProductsByCategories);
router.get('/sale', checkCookiesForUnguardedRoutes, getSaleProducts);

module.exports = router;
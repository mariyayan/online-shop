const express = require('express');
const router = express.Router();
const { checkCookies, checkUsersExistense, authenticateTokenMW } = require('../middlewares/middlewares');
const {
    getListOfCartProducts,
    getListOfWishlistProducts,
    addProductToCart,
    addProductToWishlist,
    removeProductFromCart,
    removeProductFromWishlist,
    authenticateToken,
} = require('../controllers/cart-wishlist-controller');

router.get('/cart', checkCookies, checkUsersExistense, authenticateTokenMW, getListOfCartProducts);
router.get('/wishlist', checkCookies, checkUsersExistense, authenticateTokenMW, getListOfWishlistProducts);
router.get('/addToCart/:id/:quantity', checkCookies, checkUsersExistense, authenticateTokenMW, addProductToCart);
router.get('/addToWishlist/:id/:quantity', checkCookies, checkUsersExistense, authenticateTokenMW, addProductToWishlist);
router.get('/removeFromCart/:id', checkCookies, checkUsersExistense, authenticateTokenMW, removeProductFromCart);
router.get('/removeFromWishlist/:id', checkCookies, checkUsersExistense, authenticateTokenMW, removeProductFromWishlist);

module.exports = router;
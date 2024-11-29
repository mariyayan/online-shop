const mongoose = require('mongoose');
const Wishlist = require('../models/Wishlist');
const Cart = require('../models/Cart');
const Product = require('../models/Product');
const { User } = require('../models/User');
const { getMenuProducts } = require('./product.service.js');



const getCartOrWishlist = async function(opt, userId) {

    let cartOrWishlist;
    if (opt === 'Cart') {
        cartOrWishlist = await Cart.findOne({ user: userId });
    } else if (opt === 'Wishlist') {
        cartOrWishlist = await Wishlist.findOne({ user: userId });
    }
    return cartOrWishlist;
};

const getLeanCartOrWishlist = async function(opt, userId) {

    let cartOrWishlist;
    if (opt === 'Cart') {
        cartOrWishlist = await Cart.findOne({ user: userId }).lean();
    } else if (opt === 'Wishlist') {
        cartOrWishlist = await Wishlist.findOne({ user: userId }).lean();
    }
    return cartOrWishlist;
};

const getListOfProductsFromDB = async function(opt, refreshToken) {

    await mongoose.connect("mongodb://0.0.0.0:27017/");

    let menuData = await getMenuProducts();
    let user = await User.getUserByRefreshToken(refreshToken);
    let products = await getLeanCartOrWishlist(opt, user._id);
    await mongoose.disconnect();
    return [menuData, products];
};


const removeProductFromList = async function(refreshToken, userId, productId) {

    await mongoose.connect("mongodb://0.0.0.0:27017/");

    let product = await Product.findById(productId);

    if (!product) {
        return ('Товар не найден');
    }

    let user = await User.getUserByRefreshToken(refreshToken);
    let cartOrWishlist = await getCartOrWishlist(opt, user._id);

    if (opt === 'Cart') {
        let newQuantity = product.quantity + cartOrWishlist.products.id(productId).quantity;
        product.changeQuantity(newQuantity);
        await product.save();
    }

    await cartOrWishlist.products.id(productId).remove();
    await cartOrWishlist.save();
    await mongoose.disconnect();
}


const addProduct = async function(refreshToken, productId, productQuantity, opt) {

    await mongoose.connect("mongodb://0.0.0.0:27017/");

    let product = await Product.findById(productId);

    if (!product) {
        return ('Товар не найден');
    }

    let quantity = +productQuantity;

    let user = await User.getUserByRefreshToken(refreshToken);
    let cartOrWishlist = await getCartOrWishlist(opt, user._id);
    let isProductAdded = cartOrWishlist.products.id(product._id);

    if (!isProductAdded || (isProductAdded && isProductAdded.quantity < quantity)) {

        let isQuantityEnough = product.isEnoughProductQuantity(quantity);
        if (!isQuantityEnough) {
            return (`в наличии единиц ${product.quantity} товара`);
        }
    } else if (isProductAdded.quantity === quantity) {
        return ('Товар добавлен');
    }

    let commonArgs = [quantity, isProductAdded, product];
    let args = isProductAdded ? [commonArgs, [isProductAdded.quantity > quantity, isProductAdded.quantity]] : [commonArgs];
    let result = await changeCartOrWishlistProducts(cartOrWishlist, args, opt);


    await mongoose.disconnect();
    return result;
};


async function changeCartOrWishlistProducts(cartOrWishlist, args, opt) {

    let commonArgs = args[0];
    await changeCartOrWishlist(cartOrWishlist, commonArgs);
    if (opt === 'Cart') {
        let additionalArgs = args[1];
        await changeProductQuantity(commonArgs, additionalArgs);
    }
    return ('Товар добавлен');
}

async function changeCartOrWishlist(cartOrWishlist, args) {
    let [quantity, isAdded, product] = args;
    if (isAdded) {
        cartOrWishlist.changeProductQuantity(product._id, quantity);
    } else {
        cartOrWishlist.addProduct(product, quantity);
    }
    await cartOrWishlist.save();
}

async function changeProductQuantity(commonArgs, additionalArgs) {
    let [quantity, isAdded, product] = commonArgs;
    let newQuantity;
    if (isAdded) {

        newQuantity = calculateNewQuantity(quantity, product, additionalArgs);
    } else {
        newQuantity = quantity;
    }
    product.changeQuantity(newQuantity);
    await product.save();
}

function calculateNewQuantity(quantity, product, additionalArgs) {
    let [comparisonResult, cartProductQuantity] = additionalArgs;
    let newQuantity = comparisonResult ? cartProductQuantity - quantity : product.quantity - (quantity - cartProductQuantity);
    return newQuantity;
}


module.exports = {
    getListOfProductsFromDB,
    removeProductFromList,
    addProduct,
}
const mongoose = require('mongoose');
const Product = require('../models/Product');
const { isUserAuth, sortProductsBySubCategory } = require('../helpers/products-helpers');

const getMenuProducts = async function() {
    let products = await Product.find().lean();
    let productsList = sortProductsBySubCategory(products);
    return productsList;
};

const addMenuData = function(func) {
    return async function(...args) {
        let [cookies, ...restArgs] = args;
        let showUserNavMenu = isUserAuth(cookies);
        await mongoose.connect("mongodb://0.0.0.0:27017/");
        let menuProductsList = await getMenuProducts();
        let data = await func(...restArgs);
        await mongoose.disconnect();
        return [showUserNavMenu, menuProductsList, data];
    }
};

const getProductFullInfo = async function(productId) {
    let product = await Product.findById(productId).lean();
    return product;
};

const getSearchedProduct = async function(productName) {
    let products = await Product.findProducts(productName).lean();
    return products;
};

const getCategoriesProducts = async function(categoryName) {
    let products = await Product.find({ category: categoryName }).lean();
    return products;
};

const getProductsOnSale = async function() {
    let products = await Product.find({ sale: true }).lean();
    return products;
};


const getMainPageData = async function(cookies) {
    await mongoose.connect("mongodb://0.0.0.0:27017/");
    let showUserNavMenu = isUserAuth(cookies);
    let menuProductsList = await getMenuProducts();
    await mongoose.disconnect();
    return [showUserNavMenu, menuProductsList];
};


const getProductFullInfoData = addMenuData(getProductFullInfo);
const getSearchedProductData = addMenuData(getSearchedProduct);
const getCategoriesProductsData = addMenuData(getCategoriesProducts);
const getProductsOnSaleData = addMenuData(getProductsOnSale);


module.exports = {
    getMenuProducts,
    getMainPageData,
    getProductFullInfoData,
    getSearchedProductData,
    getCategoriesProductsData,
    getProductsOnSaleData
};
const {
    sortProductsBySubCategory,
    getSubCategoriesIdNames,
    getBtnsInfo
} = require('../helpers/products-helpers');
const { getMainPageData, getProductFullInfoData, getSearchedProductData, getCategoriesProductsData, getProductsOnSaleData } = require('../services/product.service.js');



const getMainPage = async function(req, res) {

    let [showUserNavMenu, menuData] = await getMainPageData(req.cookies);

    res.render('index.hbs', {
        menuData,
        showUserNavMenu,
    })
};

const getProduct = async function(req, res) {

    let [showUserNavMenu, menuData, product] = await getProductFullInfoData(req.cookies, req.params["id"]);
    if (!product) {
        return;
    }
    res.render('product.hbs', {
        menuData,
        showUserNavMenu,
        product,
    })
};

const searchProduct = async function(req, res) {

    let [showUserNavMenu, menuData, products] = await getSearchedProductData(req.cookies, req.params["product"]);

    res.render('search-container.hbs', {
        menuData,
        showUserNavMenu,
        products,
    })
};


const getProductsByCategories = async function(req, res) {

    let [showUserNavMenu, menuData, products] = await getCategoriesProductsData(req.cookies, req.params['categoryName']);
    let productsData = sortProductsBySubCategory(products);
    let subCategoriesNames = Object.keys(productsData);
    let subCategoriesIdNames = getSubCategoriesIdNames(subCategoriesNames);
    let btnsInfo = getBtnsInfo(subCategoriesNames);

    res.render('categories-carousel-container.hbs', {
        menuData,
        showUserNavMenu,
        productsData,
        subCategoriesArr: subCategoriesIdNames,
        switchBtnsInfo: {
            id: 'categories-btns',
            btnInfo: btnsInfo
        }
    })
};


const getSaleProducts = async function(req, res) {

    let [showUserNavMenu, menuData, products] = await getProductsOnSaleData(req.cookies);
    let btnsInfo = getBtnsInfo(['all', 'care', 'colors']);

    res.render('sales-cards-container.hbs', {
        menuData,
        showUserNavMenu,
        products,
        switchBtnsInfo: {
            id: 'sales-btns',
            btnInfo: btnsInfo
        }
    })
};


module.exports = {
    getMainPage,
    getProduct,
    searchProduct,
    getProductsByCategories,
    getSaleProducts,
};
const { getListOfProductsFromDB, removeProductFromList, addProduct } = require('../services/cart-wishlist.service.js');
const { checkIsUserExists } = require('../services/reg-auth-logout.service.js');


function getListOfProductsRenderData(menuData, opt, products) {

    let renderData = {
        showUserNavMenu: true,
        menuData: menuData,
        route: `removeFrom${opt}`
    };
    renderData.productsData = products.products;
    return renderData;
}


async function getListOfProducts(opt, refreshToken) {

    let [menuData, products] = await getListOfProductsFromDB(opt, refreshToken);
    let renderData = getListOfProductsRenderData(menuData, opt, products);
}


const getListOfCartProducts = async function(req, res) {

    let renderData = await getListOfProducts('Cart', req.cookies['refreshToken']);
    res.render('cards-container.hbs', renderData);
};


const getListOfWishlistProducts = async function(req, res) {

    let renderData = await getListOfProducts('Wishlist', req.cookies['refreshToken']);
    res.render('cart-wishlist-cards-container.hbs', renderData);
};


const addProductToCart = async function(req, res) {

    let messageText = await addProduct(req.cookies['refreshToken'], req.params["id"], req.params['quantity'], 'Cart');
    return res.json({ message: messageText });
};


const addProductToWishlist = async function(req, res) {

    let messageText = await addProduct(req.cookies['refreshToken'], req.params["id"], req.params['quantity'], 'Wishlist');
    return res.json({ message: messageText });
};


const removeProductFromCart = async function(req, res) {

    await removeProductFromList('Cart', req.cookies['refreshToken'], req.params["id"]);
    return res.json({ 'removed': 'true', 'elementId': req.params["id"] })
};



const removeProductFromWishlist = async function(req, res) {

    await removeProductFromList('Wishlist', req.cookies['refreshToken'], req.params["id"]);
    return res.json({ 'removed': 'true', 'elementId': req.params["id"] })
};


module.exports = {
    getListOfCartProducts,
    getListOfWishlistProducts,
    addProductToCart,
    addProductToWishlist,
    removeProductFromCart,
    removeProductFromWishlist,
};
const isUserAuth = function(cookies){
   return (cookies['jwt'] && cookies['jwtExpiration'] && cookies['refreshToken']);
};


const sortProductsBySubCategory = function(products) {

    const sortedProducts = {};
    products.forEach(product=>{
        sortedProducts[product.subCategory] ? sortedProducts[product.subCategory].push(product) : sortedProducts[product.subCategory] = [product];
        product.popular ? sortedProducts.popular ? sortedProducts.popular.push(product) : sortedProducts.popular = [product] : null;
    });
    return sortedProducts;
};

const getSubCategoriesIdNames = function(subCategoriesNames) {

   let idNames = subCategoriesNames.map((name, index) => {
    let className = !index ? 'category-active' : '';
    return {id: name,
    'class': className
}
});
   return idNames;
};


const getBtnsInfo = function(subCategoriesNames) {

   let btnsInfo = subCategoriesNames.map((name, index) => {
    let className = `nav-btn ${!index ? 'nav-btn-active' : ''}`;
    return {id: `${name}-btn`, name, 'class': className}
});
   return btnsInfo;
};

module.exports = {
    isUserAuth,
    sortProductsBySubCategory,
    getSubCategoriesIdNames,
    getBtnsInfo,
};
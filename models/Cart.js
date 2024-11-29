const mongoose = require('mongoose');
const { Schema } = mongoose;
const cartSchema = new Schema({
    id: mongoose.Schema.Types.ObjectId,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    products: [new Schema({
        id: mongoose.Schema.Types.ObjectId,
        name: String,
        src: String,
        price: Number,
        description: String,
        quantity: Number
    })]
});



cartSchema.methods.addProduct = function(product, productQuantity) {
    this.products.push({ _id: product._id, name: product.name, src: product.src, price: product.price, description: product.description, quantity: productQuantity });
}

cartSchema.methods.changeProductQuantity = function(productId, newQuantity) {
    let product = this.products.id(productId);
    product.quantity = newQuantity;
}

let Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
const mongoose = require('mongoose');
const { Schema } = mongoose;

const productSchema = new Schema({
    id: mongoose.Schema.Types.ObjectId,
    name: String,
    src: String,
    price: Number,
    category: String,
    subCategory: String,
    quantity: Number,
    description: String,
    sale: Boolean,
    popular: Boolean
});



productSchema.statics.findProducts = function(productName) {
    let re = new RegExp(productName);
    return this.find({ name: { $regex: re } });
};


productSchema.methods.isEnoughProductQuantity = function(requiredQuantity) {
    return this.quantity >= requiredQuantity ? true : false;
}

productSchema.methods.changeQuantity = function(newQuantity) {
    this.quantity = newQuantity;
}

let Product = mongoose.model('Product', productSchema);

module.exports = Product;
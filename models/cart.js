const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  products: [
    {
      productName: { type: String },
      img: { type: String },
      price: { type: Number },
      size: { type: String },
      quantity: { type: Number },
      color: { type: String },
      unitSumPrice: { type: Number },
    },
  ],
  cartTotalPrice: { type: Number },
});

module.exports = mongoose.model('Cart', cartSchema);

const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  userId: { type: String },
  products: [
    {
      productName: { type: String },
      img: { type: String },
      price: { type: Number },
      size: { type: String },
      color: { type: String },
      quantity: { type: Number },
      unitSumPrice: { type: Number },
    },
  ],
  totalPrice: { type: Number },
});

module.exports = mongoose.model('Cart', cartSchema);

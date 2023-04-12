const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  cartNo: { type: String, unique: true },
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
      },
      img: { type: String },
      color: { type: String },
      size: { type: String },
      quantity: { type: Number },
      price: { type: Number },
    },
  ],
  totalPrice: { type: Number },
  createAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Cart', cartSchema);

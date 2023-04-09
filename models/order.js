const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  totalPrice: { type: Number },
  productIds: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
    },
  ],
  paymentType: { type: String, required: true },
  createdDate: { type: Date },
});

module.exports = mongoose.model('Order', orderSchema);

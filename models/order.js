const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  name: {
    type: String,
  },
  address: {
    type: String,
  },
  message: {
    type: String,
  },
  phoneNumber: {
    type: String,
  },
  points: {
    type: Number,
    default: 0,
  },
  totalPrice: {
    type: Number,
    default: 0,
  },
  isPaid: {
    type: Boolean,
    default: false,
  },
  orderDate: {
    type: Date,
    default: Date.now,
  },

  products: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
      },
      color: {
        type: String,
      },
      size: {
        type: String,
      },
      quantity: {
        type: Number,
      },
      image: {
        type: String,
      },
      productName: {
        type: String,
      },
      price: {
        type: Number,
      },
    },
  ],

  // productIds: [
  //   {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: 'Product',
  //   },
  // ],
  // totalPrice: { type: Number },

  // paymentType: { type: String, required: true },
  // createdDate: { type: Date },
});

module.exports = mongoose.model('Order', orderSchema);

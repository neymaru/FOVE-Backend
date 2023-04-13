const mongoose = require('mongoose');

// const { Schema } = mongoose;

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Types.ObjectId, ref: 'User' }, // User 모델의 ObjectId를 참조
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
  message: {
    type: String,
  },
  // cartTotalPrice: { type: Number },

  // userId: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'User',
  // },
  // name: {
  //   type: String,
  // },
  // address: {
  //   type: String,
  // },

  // phoneNumber: {
  //   type: String,
  // },
  // points: {
  //   type: Number,
  //   default: 0,
  // },
  // totalPrice: {
  //   type: Number,
  //   default: 0,
  // },
  // isPaid: {
  //   type: Boolean,
  //   default: false,
  // },
  // orderDate: {
  //   type: Date,
  //   default: Date.now,
  // },

  // products: [
  //   {
  //     color: {
  //       type: String,
  //     },
  //     size: {
  //       type: String,
  //     },
  //     quantity: {
  //       type: Number,
  //     },
  //     image: {
  //       type: String,
  //     },
  //     productName: {
  //       type: String,
  //     },
  //     price: {
  //       type: Number,
  //     },
  //   },
  // ],

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

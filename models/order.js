const mongoose = require('mongoose');

// const { Schema } = mongoose;

const orderSchema = new mongoose.Schema({
  // user: { type: mongoose.Types.ObjectId, ref: 'User' }, // User 모델의 ObjectId를 참조
  payments: {
    status: { type: String, require: true },
    approvedAt: { type: String, require: true },
    method: { type: String, require: true },
    discount: { type: Number },
    totalAmount: { type: Number },
  },
  user: {
    // TODO : 나중에는 userID만 넣어서 참조가능하게 할것!!
    // userId: { type: mongoose.Types.ObjectId },
    name: { type: String, require: true }, // 이름
    // address: { type: String },
    // phone: { type: String },
    // email: { type: String },
  },
  recipient: {
    recipientName: { type: String },
    recipientZipcode: { type: String },
    recipientAddress: { type: String },
    recipientAddressDetail: { type: String },
    telAreaCode: { type: String },
    telMidNum: { type: String },
    telLastNum: { type: String },
    phoneCode: { type: String },
    phoneMidNum: { type: String },
    phoneLastNum: { type: String },
  },
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
  // status: {
  //   type: String,
  //   enum: ['ordered', 'shipping', 'delivered'],
  //   default: 'ordered',
  // },
  isOrdered: {
    // 주문완료
    type: Boolean,
    default: false, // 활동 상태 여부(회원/탈퇴)
  },
  isShipping: {
    // 배송중
    type: Boolean,
    default: false,
  },
  isDelivered: {
    // 배송완료
    type: Boolean,
    default: false,
  },
  isReturn: {
    type: Boolean,
    default: false,
  },
  paymentMethod: {
    type: String,
  },
  sumPrice: { type: Number },
  // paymentMethod: {
  //   type: String,
  //   enum: ['nobankbook', 'deposit', 'creditcard'],
  //   default: 'nobankbook',
  // },
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

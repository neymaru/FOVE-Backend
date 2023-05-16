const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  user: { type: String }, // 유저 아이디
  products: [
    {
      productName: { type: String }, // 상품명
      img: { type: String }, // 이미지
      price: { type: Number }, // 가격
      size: { type: String }, // 사이즈
      color: { type: String }, // 색상
      quantity: { type: Number }, // 수량
      unitSumPrice: { type: Number }, // 상품별 합산 가격
    },
  ],
  cartTotalPrice: { type: Number }, // 장바구니 총 금액
});

module.exports = mongoose.model('Cart', cartSchema);

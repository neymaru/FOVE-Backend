const router = require('express').Router();

const {
  addProductToCart,
  getCartInfo,
  removeCartItem,
  cleanCart,
  cartProductQtyPlus,
  cartProductQtyMinus,
} = require('../controllers/cartController');

// 장바구니 정보 불러오기 /cart/list/"유저아이디"
router.post('/list/:userid', getCartInfo); // 장바구니 정보 불러오기(장바구니 전체 데이터, 장바구니 products length)

// 장바구니에 상품 추가 /cart/add/"유저아이디"
router.post('/add/:userid', addProductToCart);

// 장바구니 상품 하나 삭제 /cart/productId/"상품고유코드"
router.post('/cart/productId/:productId', removeCartItem);

// 장바구니 비우기 localhost:4000/cleancart
router.post('/cleancart', cleanCart);

// 장바구니 상품 수량 증가 + 1 /cart/count/productId/"상품고유코드"
router.post('/cart/countplus/productId/:productId', cartProductQtyPlus);

// 장바구니 상품 수량 감소 - 1 /cart/count/productId/"상품고유코드"
router.post('/cart/countminus/productId/:productId', cartProductQtyMinus);

module.exports = router;

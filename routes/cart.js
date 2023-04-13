const router = require('express').Router();

const { addProductToCart, getCartInfo, removeCartItem, cleanCart } = require('../controllers/cartController');

// localhost:4000/
router.get('/', getCartInfo); // 장바구니 정보 불러오기(장바구니 데이터, 장바구니 products length)

// /store/productId/"상품고유코드"
router.post('/store/productId/:productId', addProductToCart); // 장바구니에 상품 추가

// 장바구니 상품 하나 삭제 /cart/productId/"상품고유코드"
router.post('/cart/productId/:productId', removeCartItem);

// 장바구니 비우기 localhost:4000/cleancart
router.post('/cleancart', cleanCart);

module.exports = router;

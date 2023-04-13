const router = require('express').Router();

const { addProductToCart, getCartInfo } = require('../controllers/cartController');

// localhost:4000/
router.get('/', getCartInfo); // 장바구니 정보 불러오기(장바구니 데이터, 장바구니 products length)

// /store/productId/"상품고유코드"
router.post('/store/productId/:productId', addProductToCart); // 장바구니에 상품 추가

module.exports = router;

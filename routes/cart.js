const router = require('express').Router();

const { addProductToCart, getCartInfo } = require('../controllers/cartController');

// 장바구니 정보 불러오기(장바구니 데이터, 장바구니 products length)
router.get('/', getCartInfo);

// 장바구니 상품 추가
router.post('/store/productId/:productId', addProductToCart);

module.exports = router;

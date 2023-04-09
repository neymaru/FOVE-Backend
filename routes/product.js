const router = require('express').Router();
const { createProduct, getAllProducts } = require('../controllers/productController');

// 관리자 상품등록 페이지
router.get('/register-product', (req, res) => {
  res.send('관리자 상품 등록 페이지');
});

router.post('/register-product', createProduct);

// 전체 상품 리스트
router.get('/list', getAllProducts);

module.exports = router;

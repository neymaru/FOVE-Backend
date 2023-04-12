const router = require('express').Router();
const {
  getAllProducts,
  getNewProducts,
  getProductsByCategory,
  getProductDetail,
} = require('../controllers/productController');

const { addProductToCart } = require('../controllers/cartController');

// /store
router.get('/', getAllProducts);

// /store/all
router.get('/all', getAllProducts);

// /store/new
router.get('/new', getNewProducts);

// /store/beanie
// router.get('/beanie', getBeanieProducts);

// /store/cap
// router.get('/cap', (req, res) => {
//   res.send('캡 페이지입니다.');
// });

// // /store/training
// router.get('/training', (req, res) => {
//   res.send('트레이닝 페이지입니다.');
// });

// // /store/windbreaker
// router.get('/windbreaker', (req, res) => {
//   res.send('윈드브레이커 페이지입니다.');
// });

// /store/카테고리
router.get('/:category', getProductsByCategory);

// 특정 상품 상세페이지
router.get('/productId/:productId', getProductDetail);

// 장바구니 상품 추가
router.get('/productId/:productId', (req, res) => {
  console.log(req.body);
});

module.exports = router;

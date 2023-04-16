const router = require('express').Router();
const {
  getAllProducts,
  getNewProducts,
  getProductsByCategory,
  getProductDetail,
  searchProduct,
} = require('../controllers/productController');

const { sendOrder, addOrder } = require('../controllers/orderController');

// 'store' 페이지 /store
router.get('/', getAllProducts); // 전체 상품 데이터 가져오기

// 전체상품 보기 /store/all
router.get('/all', getAllProducts); //  전체 상품 데이터 가져오기

// 신상품 보기 /store/new
router.get('/new', getNewProducts); // 일정 기간 내 등록된 상품 데이터 가져오기

// 카테고리별 상품 보기 /store/"카테고리명"
router.get('/:category', getProductsByCategory); // 카테고리에 따른 상품 데이터 가져오기

// 특정상품 상세페이지 /store/productId/"상품고유코드"
router.get('/productId/:productId', getProductDetail); // 특정 상품 데이터 가져오기

// 상품 검색 /store/search
router.post('/search', searchProduct);

// 상품 바로 주문하기  /store/sendOrder
// router.post('/sendOrder', sendOrder);

// 상품 주문
router.post('/order', addOrder);

// ------------------- 예비 코드 -------------------
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

module.exports = router;

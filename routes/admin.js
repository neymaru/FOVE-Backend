const router = require('express').Router();
const multer = require('multer');
const fs = require('fs');

const { createProduct, getAllProducts, getOrderList } = require('../controllers/productController');

// ------------------- 이미지 저장 -------------------
const dir = './uploads';
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });
if (!fs.existsSync(dir)) fs.mkdirSync(dir);
// ---------------------------------------------------

// 관리자 페이지
router.get('/', (req, res) => {
  res.send('관리자 페이지입니다.');
});

// 관리자 상품등록 페이지
router.get('/register-product', (req, res) => {
  res.send('관리자 상품등록 페이지입니다.');
});

// router.post(
//   '/register-product',
//   upload.fields([
//     { name: 'imgMain', maxCount: 1 },
//     { name: 'imgSub1', maxCount: 1 },
//     { name: 'imgSub2', maxCount: 1 },
//     { name: 'imgSub3', maxCount: 1 },
//     { name: 'imgSub4', maxCount: 1 },
//     { name: 'imgSub5', maxCount: 1 },
//   ]),
//   createProduct,
// );
router.post('/register-product', upload.array('img'), createProduct);

// 전체 상품 리스트
router.get('/poductlist', getAllProducts);

// 전체 주문 리스트
// router.get('/orderlist', getOrderList);

module.exports = router;

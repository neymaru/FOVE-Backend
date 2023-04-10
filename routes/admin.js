const router = require('express').Router();
const multer = require('multer');
const fs = require('fs');

const { createProduct } = require('../controllers/productController');

// multer
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

router.get('/', (req, res) => {
  res.send('관리자 페이지');
});

router.get('/register-product', (req, res) => {
  res.send('관리자 상품 등록 페이지');
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

module.exports = router;

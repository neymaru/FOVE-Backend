const router = require('express').Router();
const multer = require('multer');
const fs = require('fs');

const { createProduct, getAllProducts, deleteProduct, modifyProduct } = require('../controllers/productController');
const { getAllOrder } = require('../controllers/orderController');

// ------------------- multer, 이미지 저장 관련 -------------------
const dir = './uploads';
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
// distStorage를 사용하여 multer 스토리지 엔진을 생성
// destination 함수는 세가지 매개변수를 사용함(req: Http요청, file: 업로드 된 파일 객체, cb: 콜백함수)
// cb에 업로드 된 파일의 대상 폴더 저장
// filename 함수도 동일한 세개의 매개변수 하용
// originalname속성을 사용해 파일의 원본 이름을 저장

const upload = multer({ storage });

if (!fs.existsSync(dir)) fs.mkdirSync(dir);
// -----------------------------------------------------------------

// 관리자 상품등록 페이지 /admin/register-product
router.post('/register-product', upload.array('img'), createProduct);

// 상품리스트 페이지 /admin/productlist
router.get('/productlist', getAllProducts); // 전체 상품 데이터 가져오기

// 상품리스트 페이지에서 상품 수정 /admin/productlist/modify/"상품고유코드"
router.post('/productlist/modify/:productId', upload.array('img'), modifyProduct);

// 상품리스트 페이지에서 상품 삭제
router.post('/productlist/delete/:productId', deleteProduct);

// 전체 주문 리스트
router.get('/orderlist', getAllOrder);

// 전체 주문 리스트 /admin/orderlist
// router.get('/orderlist', getOrderList);

module.exports = router;

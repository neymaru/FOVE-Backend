const router = require('express').Router();
const multer = require('multer');
const fs = require('fs');

const {
  getAllReviews,
  writeReview,
  modifyReview,
  deleteReview,
  getLikeCount,
  addUserIdtoLike,
  removeUserIdFromLike,
} = require('../controllers/boardController');

// ------------------- multer, 이미지 저장 관련 -------------------
const dir = './uploads/review';
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
// 앞서 정의한 storage 엔진을 사용하는 multer 미들웨어 함수 upload를 생성(업로드 처리 담당)

if (!fs.existsSync(dir)) fs.mkdirSync(dir); // dir 디렉토리 존재하는지 확인하고 없으면 생성
// -----------------------------------------------------------------

// 로그인 확인용 미들웨어
// function isLogin(req, res, next) {
//   if (req.session.login || req.signedCookies.user) {
//     // 암호화된 정보는 req.signedCookies 로 접근 (쿠키가 없으면 undefined)
//     next();
//   } else {
//     res.status(400);
//     res.send('로그인 필요한 서비스 입니다!<br><a href="/login">로그인 페이지로 이동</a>');
//   }
// }

// 리뷰 게시판 /board/review/
router.get('/review', getAllReviews);

// 리뷰 작성 /board/review/write
router.post('/review/write', upload.array('img'), writeReview);

// 리뷰 수정 /board/review/modify/"리뷰고유코드"
router.post('/review/modify/:reviewId', upload.array('img'), modifyReview);

// 리뷰 수정 /board/review/delete/"리뷰고유코드"
router.post('/review/delete/:reviewId', deleteReview);

// 좋아요 수 반환 /board/review/likecount
router.get('/review', getLikeCount);

// 좋아요 수 증가(좋아요 누른 유저 아이디 게시글 db에 저장) /board/review/likeplus/:"리뷰고유코드"
router.post('/review/likeplus/:reviewId', addUserIdtoLike);

// 좋아요 수 감소(좋아요 해제한 유저 아이디 게시글 db에서 제거) /board/review/likeminus/:"리뷰고유코드"
router.post('/review/likeminus/:reviewId', removeUserIdFromLike);

module.exports = router;

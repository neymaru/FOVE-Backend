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
  searchReview,
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

const upload = multer({ storage });

if (!fs.existsSync(dir)) fs.mkdirSync(dir);
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

// 리뷰 게시판 /board/review
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

// 리뷰 검색 /board/review/search
router.post('/review/search', searchReview);

module.exports = router;

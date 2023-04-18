const router = require('express').Router();
const {
  getUserInfo,
  editUserInfo,
  deleteUserInfo,
  addAddress,
  getAddress,
  deleteAddress,
} = require('../controllers/userController');

// http://localhost:3000/mypage 뒤에 붙는 url

router.post('/editInfo', editUserInfo); // 회원 정보 수정
router.post('/editInfo/fillInfo', getUserInfo); // DB에 있는 회원정보 input태그에 불러오기
router.post('/deleteInfo', deleteUserInfo); // 회원 정보 삭제
router.post('/editAddress/', addAddress); // 주소록 등록
router.post('/getAddress', getAddress); // 주소록 데이터 가져오기
router.post('/deleteAddress', deleteAddress); // 주소록 삭제하기

module.exports = router;

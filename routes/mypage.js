const router = require('express').Router();
const { getUserInfo, editUserInfo, deleteUserInfo } = require('../controllers/userController');

// http://localhost:3000/mypage 뒤에 붙는 url

router.post('/editInfo', editUserInfo); // 회원 정보 수정
router.post('/editInfo/fillInfo', getUserInfo); // DB에 있는 회원정보 input태그에 불러오기
router.post('/deleteInfo', deleteUserInfo); // 회원 정보 삭제

module.exports = router;

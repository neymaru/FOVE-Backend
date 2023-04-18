const router = require('express').Router();
const { getUserInfo, editUserInfo } = require('../controllers/userController');

// http://localhost:3000/mypage 뒤에 붙는 url

router.post('/editInfo', editUserInfo); // 회원정보 수정
router.post('/editInfo/fillInfo', getUserInfo); // DB에 있는 회원정보 input태그에 불러오기

module.exports = router;

const router = require('express').Router();
const { registerUser, checkDuplicateId } = require('../controllers/userController');

// http://localhost:3000/register 뒤에 붙는 url

// router.get('/', (req, res) => {
//   res.send('회원가입 페이지입니다.');
// });

// req.body 는 get 방식에서 사용 못 함
router.post('/', registerUser); // 회원 가입
router.post('/checkId', checkDuplicateId); // 아이디 중복 확인

module.exports = router;

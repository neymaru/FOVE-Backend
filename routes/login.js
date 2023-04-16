const router = require('express').Router();
const { loginUser, verifyToken } = require('../controllers/userController');

// http://localhost:3000/login 뒤에 붙는 url

// router.get('/', async (req, res) => {
//   res.send('로그인 페이지입니다.');
// });

router.post('/', loginUser);
router.post('/token', verifyToken);
// router.post('/logout', logoutUser);

module.exports = router;

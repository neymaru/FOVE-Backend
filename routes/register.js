const router = require('express').Router();
const { registerUser } = require('../controllers/userController');

router.get('/', (req, res) => {
  res.send('회원가입 페이지입니다.');
});

router.post('/', registerUser);

module.exports = router;

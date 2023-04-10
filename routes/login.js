const router = require('express').Router();
const { loginUser } = require('../controllers/userController');

router.get('/', async (req, res) => {
  res.send('로그인 페이지입니다.');
});

router.post('/', loginUser);

module.exports = router;

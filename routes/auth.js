const router = require('express').Router();

// 회원가입
router.get('/register', async (req, res) => {
  res.send('회원가입 페이지');
});

module.exports = router;

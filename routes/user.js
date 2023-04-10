const router = require('express').Router();

router.get('/test', (req, res) => {
  res.send('유저 테스트');
});

module.exports = router;

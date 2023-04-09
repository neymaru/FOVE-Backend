const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const { PORT } = process.env;

app.use(cors());
// bodyparser 를 위한 코드 2줄
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// ------------------- 라우터 -------------------
const userRouter = require('./routes/user');
const loginRouter = require('./routes/login');
const productRouter = require('./routes/product');
const adminRouter = require('./routes/admin');

app.use('/user', userRouter);
app.use('/login', loginRouter);
app.use('/product', productRouter);
app.use('/admin', adminRouter);
app.use('/list', productRouter);

// ------------------- 미들웨어 -------------------
app.get('/', (req, res) => {
  res.send('FOVE HOME');
});

// ------------------- DB 연결 -------------------
app.listen(PORT, () => {
  console.log(`${PORT}번 포트에서 서버가 실행 중입니다.`);
});

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
const cartRouter = require('./routes/cart');
const userRouter = require('./routes/user');
const loginRouter = require('./routes/login');
const adminRouter = require('./routes/admin');
const productRouter = require('./routes/product');
const storeRouter = require('./routes/store');
const registerRouter = require('./routes/register');
const boardRouter = require('./routes/board');
const noticeRouter = require('./routes/notice');
const mypageRouter = require('./routes/mypage');
// const orderRouter = require('./routes/order');

app.use('/cart', cartRouter);
app.use('/user', userRouter);
app.use('/login', loginRouter);
app.use('/admin', adminRouter);
app.use('/product', productRouter);
app.use('/store', storeRouter);
app.use('/register', registerRouter);
app.use('/uploads', express.static('uploads'));
app.use('/board', boardRouter);
app.use('/notice', noticeRouter);
app.use('/mypage', mypageRouter);
// app.use('/order', orderRouter);

// ------------------- 미들웨어 -------------------

// ------------------- DB 연결 -------------------
app.listen(PORT, () => {
  console.log(`${PORT}번 포트에서 서버가 실행 중입니다.`);
});

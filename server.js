// ------------------- 패키지 -------------------
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config(); // 바로 불러서 실행시키는 방식. 이 서버한테 env 방식을 적용 시키겠다

// ------------------- 중요 정보 -------------------
const app = express();
const { PORT } = process.env;

// ------------------- 서버 설정 -------------------
app.use(cors());

// bodyparser 를 위한 코드 2줄
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// ------------------- Routes -------------------
app.get('/', (req, res) => {
  res.send('FOVE HOME');
});

// ------------------- MongoDB 연결 -------------------
app.listen(PORT, () => {
  console.log(`${PORT}번 포트에서 서버가 실행 중입니다.`);
});

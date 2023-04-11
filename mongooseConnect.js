const mongoose = require('mongoose');

// Mongoose Connect

const { MDB_URI } = process.env;
const connect = async () => {
  try {
    await mongoose.connect(MDB_URI, {
      dbName: 'test',
      useNewUrlParser: true,
    });
    console.log('몽구스 접속 성공!');

    mongoose.connection.on('error', (err) => {
      console.error('몽구스 연결 에러', err);
    });

    mongoose.connection.on('disconnected', () => {
      console.error('몽구스 연결이 끊어졌습니다. 연결을 재시도 합니다.');
      connect();
    });
  } catch (err) {
    console.error(err);
  }
};

connect();

module.exports = connect;

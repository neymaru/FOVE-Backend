// 접속은 mongooseConnect.js 로. 이미 거기서 접속하므로 여기엔 불러오기만.
require('../mongooseConnect'); // 변수에 담을 필요 없음.
const User = require('../models/user'); // 스키마

// 에러 메시지 변수로 저장
const CHECKID_SUCCESS_MSG = '회원 가입이 가능한 ID입니다.';
const CHECKID_UNEXPECTED_MSG = '아이디 중복 확인 실패, 알 수 없는 문제 발생';
const REGISTER_DUPLICATED_MSG = '동일한 ID를 가진 회원이 존재합니다.';
const REGISTER_SUCCESS_MSG = '회원 가입 완료!';
const REGISTER_UNEXPECTED_MSG = '회원 가입 실패, 알 수 없는 문제 발생';
const LOGIN_NOT_REGISTERED_MSG = '입력하신 ID를 가진 회원이 존재하지 않습니다.';
const LOGIN_WRONG_PASSWORD_MSG = '비밀번호가 틀렸습니다.';
const LOGIN_UNEXPECTED_MSG = '로그인 실패, 알 수 없는 문제 발생';

// 아이디 중복 확인
const checkDuplicateId = async (req, res) => {
  try {
    // 동일한 아이디 있는지. 쿼리문.
    const duplicatedUser = await User.findOne({ id: req.body.id });

    // 중복 회원이 있으면. 리턴을 만나 함수 종료.
    if (duplicatedUser) return res.status(400).json(REGISTER_DUPLICATED_MSG);
    // 중복 회원이 없으면.
    return res.status(200).json(CHECKID_SUCCESS_MSG);
  } catch (err) {
    console.error(err);
    res.status(500).json(CHECKID_UNEXPECTED_MSG); // 500 ; 백엔드 잘못.
  }
};

// 회원 가입
const registerUser = async (req, res) => {
  try {
    // 동일한 아이디 있는지. 혹시 모를 중복 아이디에 대비.
    const duplicatedUser = await User.findOne({ id: req.body.id });

    // 중복 회원이 있으면. 리턴을 만나 함수 종료.
    if (duplicatedUser) return res.status(400).json(REGISTER_DUPLICATED_MSG);

    // 중복 회원 없으면, 회원 가입.
    await User.create(req.body);
    res.status(200).json(REGISTER_SUCCESS_MSG);
  } catch (err) {
    console.error(err);
    res.status(500).json(REGISTER_UNEXPECTED_MSG);
  }
};

// 로그인 - 아직 작성 중!!!
const loginUser = async (req, res) => {
  try {
    // 폼에서 입력한 값과 같은 아이디인지 확인.
    const findUser = await User.findOne({ id: req.body.id });
    // 아이디가 없을 때 -> 메시지 출력
    if (!findUser) return res.status(400).json(LOGIN_NOT_REGISTERED_MSG);

    // findUser 에 값이 있음 -> 비번 대조
    // 비번 틀렸을 때.
    if (findUser.password !== req.body.password) {
      return res.status(400).json(LOGIN_WRONG_PASSWORD_MSG);
    } // depth 줄이기!

    // 비번 맞았을 때 -> 로그인 처리
    // req.session.login = true;
    // req.session.userId = req.body.id;
    // ... res.cookie ...

    res.status(200);
    // res.redirect('/dbBoard'); // 게시판 출력
  } catch (err) {
    console.error(err);
    res.status(500).json(LOGIN_UNEXPECTED_MSG);
  }
};

// Redux 데이터를 가지고 오는 컨트롤러
const getUserData = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users); // json 형태로 보냄
  } catch (err) {
    console.error(err); // 백엔드 콘솔에 뜨는.
    res.status(500).json('데이터 삽입 실패, 알 수 없는 문제 발생'); // 500 ; 백엔드 잘못
  }
};

module.exports = {
  checkDuplicateId,
  registerUser,
  loginUser,
  getUserData,
};

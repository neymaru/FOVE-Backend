// 접속은 mongooseConnect.js 로. 이미 거기서 접속하므로 여기엔 불러오기만.
require('../mongooseConnect'); // 변수에 담을 필요 없음.
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user'); // 스키마

const { JWT_ACCESS_SECRET } = process.env;

// 에러 메시지 변수로 저장
const CHECKID_SUCCESS_MSG = '회원 가입이 가능한 ID입니다.';
const CHECKID_UNEXPECTED_MSG = '아이디 중복 확인 실패, 알 수 없는 문제 발생';
const REGISTER_DUPLICATED_MSG = '동일한 ID를 가진 회원이 존재합니다.';
const REGISTER_SUCCESS_MSG = '회원 가입 완료!';
const REGISTER_UNEXPECTED_MSG = '회원 가입 실패, 알 수 없는 문제 발생';
const LOGIN_NOT_REGISTERED_MSG = '입력하신 ID를 가진 회원이 존재하지 않습니다.';
const LOGIN_WRONG_PASSWORD_MSG = '비밀번호가 틀렸습니다.';
const LOGIN_UNEXPECTED_MSG = '로그인 실패, 알 수 없는 문제 발생';
const LOGIN_SUCCESS_MSG = '로그인 완료!';
const FINDINFO_UNEXPECTED_MSG = '회원 정보 찾기 실패, 알 수 없는 문제 발생';
const EDITINFO_SUCCESS_MSG = '회원 정보 수정 성공!';
const EDITINFO_UNEXPECTED_MSG = '회원 정보 수정 실패, 알 수 없는 문제 발생';

// 이름에 * 처리하는 함수
const encodingName = (name) => {
  let encodedName = '';

  for (let i = 0; i < name.length; i += 1) {
    if (i % 2 === 0) {
      encodedName += name[i];
    } else {
      encodedName += '*';
    }
  }

  return encodedName;
};

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
    // 입력 받은 비밀번호를 bcrypt 모듈을 사용하여 암호화하여 저장
    const newUser = {
      ...req.body,
      password: bcrypt.hashSync(req.body.password, 10),
    };

    await User.create(newUser);
    res.status(200).json(REGISTER_SUCCESS_MSG);
  } catch (err) {
    console.error(err);
    res.status(500).json(REGISTER_UNEXPECTED_MSG);
  }
};

// 로그인
const loginUser = async (req, res) => {
  try {
    // 폼에서 입력한 값과 같은 아이디인지 확인.
    const findUser = await User.findOne({ id: req.body.id });
    // 회원이 아닐 경우 -> 메시지 출력
    if (!findUser) return res.status(400).json({ message: LOGIN_NOT_REGISTERED_MSG });

    // findUser 에 값이 있음 -> 비번 대조
    // bcrypt 모듈을 사용해 암호화 된 비밀번호와 입력한 비밀번호가 동일한지 비교
    const isSamePassword = bcrypt.compareSync(req.body.password, findUser.password);

    // 비번이 동일하면 로그인 성공 -> 토큰 발행
    if (isSamePassword) {
      // 토큰에 넣을 이름 암호화. 중간에 * 표시
      const encodedName = encodingName(findUser.name);

      // jwt 모듈을 사용해 accessToken 발행
      const accessToken = jwt.sign(
        {
          id: findUser.id,
          name: findUser.name,
          nameEncoded: encodedName, // * 처리된 이름
          points: findUser.points,
          isAdmin: findUser.isAdmin,
        }, // 유저 정보를 암호화하여 토큰 발행
        JWT_ACCESS_SECRET, // 해당 JWT를 쉽게 풀 수 없도록, 암호키 삽입
        { expiresIn: '6h' }, // 해당 토큰 만료기간 설정, 6시간 동안 토큰을 인증할 수 있음
      );

      // 생성된 토큰을 프론트로 전달
      // 프론트에서는 로컬 스토리지에 저장 할 것이므로, 쿠키에 담지 않고 데이터로 전송
      res.status(200).json({
        token: accessToken,
        message: LOGIN_SUCCESS_MSG,
      });
    } else {
      // 비밀번호 틀렸을 경우
      return res.status(400).json({ message: LOGIN_WRONG_PASSWORD_MSG });
    }
  } catch (err) {
    console.error(err.response.data);
    res.status(500).json({ message: LOGIN_UNEXPECTED_MSG });
  }
};

// 브라우저 로컬 스토리지에 저장 된, 토큰을 검증하는 컨트롤러
// 토큰 검증이 완료 되면 원하는 정보를 담아서 전달 -> 프론트에서는 로그인 처리
const verifyToken = (req, res) => {
  jwt.verify(req.body.token, JWT_ACCESS_SECRET, (err, decoded) => {
    // 토큰 검증 실패 시, 권한 없음 결과 전달
    if (err) return res.status(401).json({ message: '토큰 기한 만료. 로그아웃!!' });

    // 토큰 검증 성공 시, 토큰을 푼 결과(decoded) 안의 userID 를 받아서 프론트에 전달
    return res.status(200).json({
      id: decoded.id,
      nameEncoded: decoded.nameEncoded, // * 처리된 이름
      points: decoded.points,
      isAdmin: decoded.isAdmin,
      message: '토큰 검증 완료',
    });
  });
};

// // 회원 정보 수정 페이지 /////////////////////////////////////////////////////////////////////////
// 로그인 상태의 회원 정보를 가져오는 컨트롤러
const getUserInfo = async (req, res) => {
  try {
    const findUserInfo = await User.findOne({ id: req.body.id });
    res.status(200).json(findUserInfo);
  } catch (err) {
    console.error(err);
    res.status(500).json(FINDINFO_UNEXPECTED_MSG);
  }
};

// 회원 정보 수정
const editUserInfo = async (req, res) => {
  try {
    // 회원 정보 바뀔 내용들
    const modifyInfo = {
      password: bcrypt.hashSync(req.body.newPw, 10), // 비밀번호 암호화하기
      name: req.body.newName,
      phone: req.body.newPhone,
    };

    // DB의 회원 정보 수정
    await User.updateOne({ id: req.body.id }, { $set: modifyInfo });

    // 로그인을 위한 새로운 토큰 발행
    // 토큰에 넣을 이름 암호화. 중간에 * 표시
    const encodedName = encodingName(req.body.newName);

    // jwt 모듈을 사용해 accessToken 발행
    const accessToken = jwt.sign(
      {
        id: req.body.id,
        name: req.body.newPw,
        nameEncoded: encodedName, // * 처리된 이름
        points: req.body.points,
        isAdmin: req.body.isAdmin,
      }, // 유저 정보를 암호화하여 토큰 발행
      JWT_ACCESS_SECRET, // 해당 JWT를 쉽게 풀 수 없도록, 암호키 삽입
      { expiresIn: '6h' }, // 해당 토큰 만료기간 설정, 6시간 동안 토큰을 인증할 수 있음
    );

    // 생성된 토큰을 프론트로 전달
    // 프론트에서는 로컬 스토리지에 저장 할 것이므로, 쿠키에 담지 않고 데이터로 전송
    res.status(200).json({
      token: accessToken,
      message: EDITINFO_SUCCESS_MSG,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json(EDITINFO_UNEXPECTED_MSG);
  }
};

// /////////////////////////////////////////////////////////////////////////////////////////////////

// // Redux 데이터를 가지고 오는 컨트롤러
// const getUserData = async (req, res) => {
//   try {
//     const users = await User.find({});
//     res.status(200).json(users); // json 형태로 보냄
//   } catch (err) {
//     console.error(err); // 백엔드 콘솔에 뜨는.
//     res.status(500).json('데이터 삽입 실패, 알 수 없는 문제 발생'); // 500 ; 백엔드 잘못
//   }
// };

module.exports = {
  checkDuplicateId,
  registerUser,
  loginUser,
  verifyToken,
  getUserInfo,
  editUserInfo,
  // getUserData,
};

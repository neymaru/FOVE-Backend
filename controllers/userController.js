const User = require('../models/user');

const registerUser = async (req, res) => {
  try {
    const duplicatedUser = await User.findOne({ id: req.body.id });
    if (duplicatedUser) return res.status(400).send('사용 불가능한 아이디입니다.');
  } catch (err) {
    console.error(err);
    res.status(500).send('얘기치 못한 에러');
  }
};

const loginUser = async (res, req) => {
  try {
    const findUser = await User.findOne({ id: req.body.id });
    if (!findUser) return res.status(400).send('해당 아이디가 존재하지 않습니다.');

    if (findUser.password !== req.body.password) return res.status(400).send('비밀번호가 다릅니다.');

    res.status(200).send('로그인 성공');
  } catch (err) {
    console.error(err);
    res.status(500).send('얘기치 못한 에러');
  }
};

// 회원 등록
// const createUser = (req, res) => {
//   const {
//     email,
//     password,
//     username,
//     address,
//     addressDetail,
//     phone,
//     isMessageAccept,
//     isThirdPartyConsent,
//     isDataProcessingDelegation,
//   } = req.body;

//   // 유저 생성 로직 추가
// };

module.exports = {
  registerUser,
  loginUser,
};

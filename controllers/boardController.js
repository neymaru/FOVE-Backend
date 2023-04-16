const Review = require('../models/board');

// 전체 리뷰 데이터 가져오기
const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find({});
    res.status(200).json(reviews);
  } catch (err) {
    console.error(err);
    res.status(500).json('리뷰 불러오기 실패(서버 에러)');
  }
};

// 리뷰 작성
const writeReview = async (req, res) => {
  try {
    const { title, writer, content } = req.body;
    const img = req.files.map((el) => el.originalname);

    const newReview = new Review({
      title,
      writer,
      content,
      img,
    });

    await newReview.save();
    res.status(200).json('리뷰 등록 성공!');
  } catch (err) {
    console.error(err);
    res.status(500).json('리뷰 등록 실패(서버 에러)');
  }
};

// 리뷰 수정
const modifyReview = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const { title, writer, content } = req.body;
    const img = req.files.map((el) => el.originalname);

    const updatedReview = await Review.findByIdAndUpdate(reviewId, { title, writer, content, img }, { new: true });

    if (!updatedReview) {
      return res.status(404).json('해당 리뷰를 찾을 수 없습니다.');
    }
    res.status(200).json('리뷰 수정 성공!');
  } catch (err) {
    console.error(err);
    res.status(500).json('리뷰 수정 실패(서버 에러)');
  }
};

// 리뷰 삭제
const deleteReview = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const deletedReview = await Review.findByIdAndRemove(reviewId);

    if (!deletedReview) {
      return res.status(404).json('삭제할 리뷰를 찾을 수 없습니다.');
    }
    res.status(200).json('리뷰 삭제 성공!');
  } catch (err) {
    console.error(err);
    res.status(500).json('리뷰 삭제 실패(서버 에러)');
  }
};

// 좋아요 수 반환
const getLikeCount = async (req, res) => {
  try {
    const { reviewId } = req.params;

    const review = await Review.findById(reviewId);

    if (!review) {
      res.status(404).json('리뷰가 존재하지 않습니다.');
      return;
    }

    const likeCount = review.like.length;
    res.status(200).json(likeCount); // 좋아요 수 반환
  } catch (err) {
    console.error(err);
    res.status(500).json('좋아요 수 반환 실패(서버 에러)');
  }
};

// 회원이 좋아요 버튼 누르면 게시글 like DB에 회원 아이디 저장
const addUserIdtoLike = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const { userId } = req.body; // 유저 로그인 정보 받는 방식에 따라 변경 예정

    const review = await Review.findById(reviewId);

    if (!review) {
      res.status(404).json('리뷰가 존재하지 않습니다.');
      return;
    }

    // 이미 좋아요 누른 회원이면 더이상 추가 안되게
    if (review.like.includes(userId)) {
      res.status(400).json('이미 좋아요를 눌렀습니다.');
      return;
    }

    review.like.push(userId); // like db에 유저아아디 추가

    await review.save();
    res.status(200).json('좋아요 누른 유저 아이디 저장 성공!');
  } catch (err) {
    console.error(err);
    res.status(500).json('저장 실패(서버 오류)');
  }
};

// 회원이 좋아요 버튼 해제하면 게시글 like DB에서 회원 아이디 제거
const removeUserIdFromLike = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const { userId } = req.body; // 유저 로그인 정보 받는 방식에 따라 변경 예정

    const review = await Review.findById(reviewId);

    if (!review) {
      res.status(404).json('리뷰가 존재하지 않습니다.');
      return;
    }

    if (!review.like.includes(userId)) {
      res.status(400).json('좋아요를 누르지 않았습니다.');
      return;
    }

    review.like.pull(userId); // like db에서 유저아이디 제거

    await review.save();
    res.status(200).json('좋아요 해제한 유저 아이디 제거 성공!');
  } catch (err) {
    console.error(err);
    res.status(500).json('해제 실패(서버 오류)');
  }
};

module.exports = {
  getAllReviews,
  writeReview,
  modifyReview,
  deleteReview,
  getLikeCount,
  addUserIdtoLike,
  removeUserIdFromLike,
};

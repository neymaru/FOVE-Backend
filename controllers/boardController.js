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

// 리뷰 검색 기능
const searchReview = async (req, res) => {
  try {
    const { searchTitle, searchTitleAndContent, searchWriter } = req.body;
    // searchTitle: '제목' 검색창에 입력한 값
    // searchTitleAndContent: '제목 또는 내용' 검색에 입력한 값
    // searchTitle: '작성자' 검색창에 입력한 값

    // 검색 조건이 하나도 전달되지 않았을 경우 (이건 프론트에서 검색어 입력 안하면 form데이터 전송 안되게 처리해도 됨)
    if (!searchTitle && !searchTitleAndContent && !searchWriter) {
      return res.status(400).json('검색할 조건이 하나 이상 전달되어야 합니다.');
    }

    // 검색 조건 담을 객체
    const searchCondition = {};

    // '제목' 검색 시
    if (searchTitle) searchCondition.title = { $regex: searchTitle, $options: 'i' };
    // **** 참고 ****
    // $regex -> 특정 패턴이 포함된 문자열 검색(정규식)
    // $option -> 검색 동장에 대한 설정
    //    i (ignore case): 대소문자를 무시하여 검색
    //    m (multiline): 다중 행 검색
    //    s (dotall): 개행 문자를 포함한 모든 문자를 대상으로 검색
    //    x (extended): 정규식 내의 공백을 무시

    // '제목 또는 내용' 검색 시
    if (searchTitleAndContent) {
      searchCondition.$or = [
        { title: { $regex: searchTitleAndContent, $options: 'i' } },
        { content: { $regex: searchTitleAndContent, $options: 'i' } },
      ];
      // $or -> 두 가지 이상의 조건 중 하나라도 일치하는 경우 반환
    }

    // '작성자' 검색 시
    if (searchWriter) {
      searchCondition.writer = { $regex: searchWriter, $options: 'i' };
    }

    // 검색 결과 DB에서 가져오기
    const searchedReview = await Review.find(searchCondition);

    if (searchedReview.length === 0) {
      return res.status(404).json('검색된 리뷰가 없습니다.');
    }

    res.status(200).json({ message: '검색된 리뷰 반환', searchedReview });
  } catch (err) {
    console.error(err);
    res.status(500).json('검색 실패(서버 오류)');
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
  searchReview,
};

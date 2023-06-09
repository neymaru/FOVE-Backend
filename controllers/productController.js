require('../mongooseConnect');
const Product = require('../models/product');

// 상품 등록
const createProduct = async (req, res) => {
  try {
    const { productCode, productName, price, category, size, detail } = JSON.parse(req.body.data);

    const img = req.files.map((el) => el.originalname);

    const newProduct = new Product({
      productCode,
      productName,
      price,
      size,
      category,
      detail,
      img,
    });

    await newProduct.save();
    res.status(200).json('상품 등록 성공!');
  } catch (err) {
    console.error(err);
    res.status(500).json('상품 등록 셀패(서버 에러)');
  }
};

// 전체 상품 불러오기
const getAllProducts = async (req, res) => {
  try {
    const product = await Product.find({});
    res.status(200).json(product);
  } catch (err) {
    console.error(err);
    res.status(500).send('상품 불러오기 실패(서버 에러)');
  }
};

// 신상품 불러오기
const getNewProducts = async (req, res) => {
  try {
    // 현재 날짜에서 7일 분량 빼기(24시간 * 60분 * 60초 * 1000밀리초)
    // const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    // 현재 날짜에서 24시간 분량 빼기
    const twelveHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const products = await Product.find({ createAt: { $gte: twelveHoursAgo } });
    res.status(200).json(products);
  } catch (err) {
    console.error(err);
    res.status(500).send('상품 불러오기 실패(서버 에러)');
  }
};

// 해당 카테고리 불러오기
const getProductsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const categories = ['beanie', 'cap', 'training', 'windbreaker'];

    // params로 들어온 category가 위 categories 배열에 없을 때
    if (!categories.includes(category)) {
      // params로 들어온 category가 위 categories 배열에 없을 때
      return res.status(400).send('유효하지 않은 카테고리 입니다.');
    }

    // DB에서 해당 category 의 상품들만 조회해서 products 배열에 담기
    const products = await Product.find({ category: category.toUpperCase() });
    res.status(200).json(products);
  } catch (err) {
    console.error(err);
    res.status(500).send('조회 실패(서버 에러)');
  }
};

// 특정 상품 조회하기
const getProductDetail = async (req, res) => {
  try {
    const { productId } = req.params;
    const product = await Product.find({ _id: productId });

    res.status(200).json(product);
  } catch (err) {
    console.error(err);
    res.status(500).send('조회 실패(서버 에러)');
  }
};

// 관리자페이지 상품리스트에서 상품 수정하기
const modifyProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const { productCode, productName, price, category, size, detail } = JSON.parse(req.body.data);
    // const img = req.files.map((el) => el.originalname);

    const product = {
      productCode,
      productName,
      price,
      category,
      size: {
        OS: size.OS || 0,
        S: size.S || 0,
        M: size.M || 0,
        L: size.L || 0,
      },
      // img,
      detail,
    };

    await Product.findByIdAndUpdate(productId, product, { new: true });
    res.status(200).json('상품 수정 성공!');
  } catch (err) {
    console.error(err);
    res.status(500).send('상품 수정 실패(서버 에러)');
  }
};

// 관리자페이지 상품리스트에서 상품 삭제하기
const deleteProduct = async (req, res) => {
  try {
    const { productId } = req.params;

    const deletedProduct = await Product.findByIdAndDelete(productId);

    if (!deletedProduct) {
      return res.status(404).json('해당 상품이 존재하지 않습니다.');
    }
    res.status(200).json('상품 삭제 완료');
  } catch (err) {
    console.error(err);
    res.status(500).send('조회 실패(서버 에러)');
  }
};

// 스토어 페이지에서 상품 검색 기능
const searchProduct = async (req, res) => {
  try {
    const { searchText } = req.body;

    if (!searchText || searchText.trim() === '') {
      return res.status(400).json('검색어를 입력해주세요.');
    }

    const searchCondition = {
      $or: [
        { productCode: { $regex: searchText, $options: 'i' } },
        { productName: { $regex: searchText, $options: 'i' } },
      ],
      // **** 참고 ****
      // $regex -> 특정 패턴이 포함된 문자열 검색(정규식)
      // $option -> 검색 동장에 대한 설정
      //    i (ignore case): 대소문자를 무시하여 검색
      //    m (multiline): 다중 행 검색
      //    s (dotall): 개행 문자를 포함한 모든 문자를 대상으로 검색
      //    x (extended): 정규식 내의 공백을 무시
      // $or -> 두 가지 이상의 조건 중 하나라도 일치하는 경우 반환
    };

    // 검색 결과 DB에서 가져오기
    const searchedProduct = await Product.find(searchCondition);

    if (searchedProduct.length === 0) {
      return res.status(404).json('검색된 상품이 없습니다.');
    }

    res.status(200).json({ message: '검색된 상품 반환', searchedProduct });
  } catch (err) {
    console.error(err);
    res.status(500).json('검색 실패(서버 오류)');
  }
};

// 전체 주문 리스트 불러오기
// const getOrderList = {};

module.exports = {
  createProduct,
  getAllProducts,
  getNewProducts,
  getProductsByCategory,
  getProductDetail,
  deleteProduct,
  modifyProduct,
  searchProduct,
};

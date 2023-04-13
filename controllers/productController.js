require('../mongooseConnect');
const Product = require('../models/product');

// 상품 등록
const createProduct = (req, res) => {
  try {
    const { productName, price, size, color, category, quantity, detail, createAt } = JSON.parse(req.body.data);
    // req.body의 data 필드를 JSON으로 구문 분석하고 결과 객체를 분해하여 변수명과 일치하는 key 값의 값들을 각 변수들에 저장
    // 프론트에서 data라는 이름으로 JSON 형태로 보내기 때문에 req.body.data로 받아서 JSON.parse() 함수를 이용해 객체형태로 parsing

    const img = req.files.map((el) => el.originalname);
    // req.files 배열의 요소들을 각 파일의 원본명으로 매핑하여 'img' 라는 이름의 새 배열에 저장

    // ------------------- 예비 코드 -------------------
    // const imgSub1 = req.files['imgSub1'][0].filename;
    // const imgSub2 = req.files['imgSub2'][0].filename;
    // const imgSub3 = req.files['imgSub3'][0].filename;
    // const imgSub4 = req.files['imgSub4'][0].filename;
    // const imgSub5 = req.files['imgSub5'][0].filename;

    const newProduct = new Product({
      productName,
      price,
      size,
      color,
      category,
      img,
      quantity,
      detail,
      createAt,
    });

    newProduct
      .save()
      .then(() => {
        res.status(200).json('상품 등록 성공!');
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json('상품 등록 실패');
      });
    // save() 메소드로 newProduct를 데이터베이스에 저장
    // 데이터베이스 저장 성공하면 상태코드 200과 json 성공 메시지를 응담
    // 실패하면 에러내용 콘솔에 찍고 상태코드 500과 json 실패 메시지를 응답
  } catch (err) {
    console.error(err);
    res.status(500).json('상품 등록 셀패');
  }
  // 요청 본문에서 추출한 데이터와 파일 배열을 담은 변수들로 새로운 Product 인스턴스를 만들고 newProduct에 저장
};

// 전체 상품 불러오기
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (err) {
    console.error(err);
    res.status(500).send('상품 불러오기 실패');
  }
};

// 신상품 불러오기
const getNewProducts = async (req, res) => {
  try {
    // 현재 날짜에서 7일 분량 빼기(24시간 * 60분 * 60초 * 1000밀리초)
    // const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const twelveHoursAgo = new Date(Date.now() - 12 * 60 * 60 * 1000); // 12시간 내
    const products = await Product.find({ createAt: { $gte: twelveHoursAgo } }); // gte: '크거나 같음' 연산자
    res.status(200).json(products);
  } catch (err) {
    console.error(err);
    res.status(500).send('상품 불러오기 실패');
  }
};

// 해당 카테고리 불러오기
const getProductsByCategory = async (req, res) => {
  try {
    const { category } = req.params; // params로 들어온 category 이름을 구조분해할당으로 매칭시켜 변수 저장
    const categories = ['beanie', 'cap', 'training', 'windbreaker'];
    if (!categories.includes(category)) {
      // params로 들어온 category가 위 categories 배열에 없을 때
      return res.status(400).send('유효하지 않은 카테고리 입니다.');
    }
    const products = await Product.find({ category }); // DB에서 해당 category 의 상품들만 조회해서 products 배열에 담기
    res.status(200).json(products); // 상태코드 200과 products 배열을 json 응답
  } catch (err) {
    console.error(err);
    res.status(500).send('조회 실패');
  }
};

// 특정 상품 조회하기
const getProductDetail = async (req, res) => {
  try {
    const { productId } = req.params; // params로 들어온 productId 값을 구조분해할당으로 매칭시켜 변수 저장
    const product = await Product.find({ _id: productId }); // 상품 DB에서 _id가 productId 인 것 조회해서 product에 담기
    res.status(200).json(product); // 상태코드 200과 product를 json 응답
  } catch (err) {
    console.error(err);
    res.status(500).send('조회 실패');
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
};

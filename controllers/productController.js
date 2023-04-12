require('../mongooseConnect');
const Product = require('../models/product');

// 상품 등록
const createProduct = (req, res) => {
  console.log(req.body);
  console.log(req.files);
  const { productName, price, size, color, category, quantity, detail, createAt } = JSON.parse(req.body.data);

  const img = req.files.map((el) => el.originalname);
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
    const products = await Product.find({ createAt: { $gte: twelveHoursAgo } });
    res.status(200).json(products);
  } catch (err) {
    console.error(err);
    res.status(500).send('상품 불러오기 실패');
  }
};

// 해당 카테고리 불러오기
const getProductsByCategory = async (req, res) => {
  try {
    const category = req.params.category;
    const categories = ['beanie', 'cap', 'training', 'windbreaker'];
    if (!categories.includes(category)) {
      return res.status(400).send('유효하지 않은 카테고리 입니다.');
    }
    const products = await Product.find({ category });
    res.status(200).json(products);
  } catch (err) {
    console.error(err);
    res.status(500).send('조회 실패');
  }
};

// 특정 상품 조회하기
const getProductDetail = async (req, res) => {
  try {
    const productId = req.params.productId;
    const product = await Product.find({ _id: productId });
    res.status(200).json(product);
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

require('../mongooseConnect');
const Product = require('../models/product');

// 상품 등록
const createProduct = (req, res) => {
  const { productName, price, size, color, category, quantity, detail, createAt } = req.body;
  const imgMain = req.files['imgMain'][0].filename;
  const imgSub1 = req.files['imgSub1'][0].filename;
  const imgSub2 = req.files['imgSub2'][0].filename;
  const imgSub3 = req.files['imgSub3'][0].filename;
  const imgSub4 = req.files['imgSub4'][0].filename;
  const imgSub5 = req.files['imgSub5'][0].filename;

  const newProduct = new Product({
    productName,
    price,
    size,
    color,
    category,
    imgMain,
    imgSub1,
    imgSub2,
    imgSub3,
    imgSub4,
    imgSub5,
    quantity,
    detail,
    createAt,
  });

  newProduct
    .save()
    .then(() => {
      res.status(200).send('상품 등록 성공!');
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('상품 등록 실패');
    });
};

// 전체 상품 불러오기
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (err) {
    console.error(err);
    res.status(500).send('상품 불러오기 실패');
  }
};

module.exports = {
  createProduct,
  getAllProducts,
};

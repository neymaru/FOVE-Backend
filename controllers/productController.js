/* eslint-disable max-len */
/* eslint-disable object-curly-newline */
/* eslint-disable dot-notation */
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

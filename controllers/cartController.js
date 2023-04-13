const Cart = require('../models/cart');
const User = require('../models/user');

// 상품 상세페이지에서 해당상품 장바구니에 추가
const addProductToCart = async (req, res) => {
  try {
    const { productName, img, price, size, color, quantity, unitSumPrice } = req.body;
    // req.boy의 상품 정보들을 구조분해 할당으로 매칭시켜 변수 저장

    const cart = await Cart.findOne({}); // [user DB의 cartId 이용하여 찾아야 함]

    const product = {
      productName,
      img,
      price,
      size,
      color,
      quantity,
      unitSumPrice,
    };

    if (!cart) {
      const newCart = new Cart({
        products: [product],
      });
      await newCart.save();
    } else {
      cart.products.push(product);
      await cart.save();
    }

    res.status(200).json('장바구니 담기 성공');
  } catch (err) {
    console.error(err);
    res.status(500).json('장바구니 담기 실패');
  }
};

// 장바구니 정보 조회(전체 상품 데이터, length)
const getCartInfo = async (req, res) => {
  try {
    const cart = await Cart.findOne();
    if (!cart) {
      res.status(200).json({ length: 0 }); // 장바구니가 비어있으면 lenght만 넘기기
    } else {
      res.status(200).json({ products: cart.products, length: cart.products.length }); // 장바구니에 상품이 있으면 상품 데이터와 length 넘기기
    }
  } catch (err) {
    console.error(err);
    res.status(500).json('조회 실패');
  }
};

// ------------------- 예비 코드 -------------------
// 장바구니에 상품 추가
// const addProductToCart = async (req, res) => {
//   try {
//     const { productName, img, price, size, color, quantity } = req.body;

//     // 장바구니 내 상품별 금액 합계
//     const products = req.body.products.map((product) => ({
//       ...product,
//       unitSumPrice: product.price * product.quantity,
//     }));

//     const cart = new Cart({ products });

//     const cartTotalPrice = products.reduce((total, product) => total + product.unitSumPrice, 0);
//     cart.cartTotalPrice = cartTotalPrice;

//     await cart.save();
//     res.status(200).send('장바구니 담기 성공');
//   } catch (err) {
//     console.error(err);
//     res.status(500).send('장바구니 담기 실패');
//   }
// };

module.exports = {
  addProductToCart,
  getCartInfo,
};

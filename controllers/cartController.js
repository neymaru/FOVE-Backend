const Cart = require('../models/cart');

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

// 상품 상세페이지에서 해당상품 장바구니에 추가
const addProductToCart = async (req, res) => {
  try {
    const { productName, img, price, size, color, quantity, unitSumPrice } = req.body;

    const cart = await Cart.findOne();
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

module.exports = {
  addProductToCart,
};

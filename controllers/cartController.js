const Cart = require('../models/cart');

// 장바구니에 상품 추가
const addProductToCart = async (req, res) => {
  try {
    // const { userId, productName, color, size, img, quantity, price } = req.body;
    console.log(req.body);
    // console.log(typeof price);
    // console.log(userId);
    // const unitSumPrice = Number(price) * Number(quantity); // 상품별 수량에 따른 금액 합계

    // const cart = new Cart({
    //   userId,
    //   products: [
    //     {
    //       productName,
    //       img,
    //       price,
    //       size,
    //       color,
    //       quantity,
    //       unitSumPrice,
    //     },
    //   ],
    // });
    // await cart.save();
  } catch (err) {
    console.error(err);
    res.status(500).send('장바구니 담기 실패');
  }
};

module.exports = {
  addProductToCart,
};

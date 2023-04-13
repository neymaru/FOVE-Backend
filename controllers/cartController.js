const Cart = require('../models/cart');
const User = require('../models/user');

// 장바구니 정보 조회(전체 상품 데이터, length)
const getCartInfo = async (req, res) => {
  try {
    const cart = await Cart.findOne();
    if (!cart) return res.status(200).json({ length: 0 }); // 장바구니가 비어있으면 lenght만 넘기기
    res.status(200).json({ products: cart.products, length: cart.products.length }); // 장바구니에 상품이 있으면 상품 데이터와 length 넘기기
  } catch (err) {
    console.error(err);
    res.status(500).json('장바구니 조회 실패');
  }
};

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

// 장바구니 특정 상품 하나 삭제
const removeCartItem = async (req, res) => {
  try {
    const { productId } = req.params;

    const cart = await Cart.findOne();

    if (!cart) {
      res.status(404).json('장바구니 없음');
      return;
    }

    const updatedCart = await Cart.findOneAndUpdate(
      { _id: cart._id },
      { $pull: { products: { _id: productId } } },
      { new: true }, // 업데이트된 내용 반환을 위해 new: true
    );

    res.status(200).json({ messege: '장바구이에서 해당 상품 삭제 성공', updatedCart });
  } catch (err) {
    console.error(err);
    res.status(500).json('알 수 없는 에러');
  }
};

// 장바구니 비우기
const cleanCart = async (req, res) => {
  try {
    const cart = await Cart.findOne();

    if (!cart) {
      res.status(404).json('장바구니 없음');
      return;
    }

    const updatedCart = await Cart.findOneAndUpdate({ _id: cart._id }, { $set: { products: [] } }, { new: true });

    res.status(200).json({ messege: '장바구이에서 비우기 성공', updatedCart });
  } catch (err) {
    console.error(err);
    res.status(500).json('장바구니 비우기 실패');
  }
};

// 장바구니 상품 카운팅 + 1
const cartProductQtyPlus = async (req, res) => {
  try {
    const { productId } = req.params;

    const cart = await Cart.findOne({});

    if (!cart) {
      return res.status(404).json('장바구니 없음');
    }

    const product = await cart.products.find((productEl) => productEl._id.toString() === productId); // productEl 의 _id 속성을 문자열로 변환해야 비교가 됨

    if (!product) {
      return res.status(404).json('일치하는 상품 없음');
    }

    product.quantity += 1;
    product.unitSumPrice = product.price * product.quantity;

    await cart.save();

    res.status(200).json(cart);
  } catch (err) {
    console.error(err);
    res.status(500).json('알 수 없는 에러');
  }
};

// 장바구니 상품 카운팅 - 1
const cartProductQtyMinus = async (req, res) => {
  try {
    const { productId } = req.params;

    const cart = await Cart.findOne({});

    if (!cart) {
      return res.status(404).json('장바구니 없음');
    }

    const product = await cart.products.find((productEl) => productEl._id.toString() === productId); // productEl 의 _id 속성을 문자열로 변환해야 비교가 됨

    if (!product) {
      return res.status(404).json('일치하는 상품 없음');
    }

    if (product.quantity === 0) return res.send('더이상 감소시킬 수 없음'); // quantity 가 0보다 작아지지 않도록 함
    product.quantity -= 1;
    product.unitSumPrice = product.price * product.quantity;

    await cart.save();

    res.status(200).json(cart);
  } catch (err) {
    console.error(err);
    res.status(500).json('알 수 없는 에러');
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
  removeCartItem,
  cleanCart,
  cartProductQtyPlus,
  cartProductQtyMinus,
};

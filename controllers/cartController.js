const Cart = require('../models/cart');
const User = require('../models/user');

// ---------------------------- 장바구니 정보 조회(전체 상품 데이터, length) ----------------------------
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

// ---------------------------- 상품 상세페이지에서 해당상품 장바구니에 추가 ----------------------------
const addProductToCart = async (req, res) => {
  try {
    // req.boy의 상품 정보들을 구조분해 할당으로 매칭시켜 변수 저장
    const { productName, img, price, size, color, quantity, unitSumPrice } = req.body;

    // req.body로 받은 상품 정보들을 product라는 객체 형태의 변수에 저장
    const product = {
      productName,
      img,
      price,
      size,
      color,
      quantity,
      unitSumPrice,
    };

    const cart = await Cart.findOne({}); // [user DB의 cartId 이용하여 찾아야 함]

    // cart 생성 안돼있거나 cart 생성하고 products 배열에 product 넣어서 DB 저장
    if (!cart) {
      const newCart = new Cart({
        products: [product],
      });
      await newCart.save();
      res.status(200).json('장바구니 담기 성공1');
      return; // 다음 코드 실행 안되게
    }

    // cart는 생성 돼있는데 products 배열이 없거나 products 배열에 담긴 product가 없을 때
    if (!cart.products || !cart.products.length) {
      cart.products = [product];
      await cart.save();
      res.status(200).json('장바구니 담기 성공2');
      return; // 다음 코드 실행 안되게
    }

    // 장바구니에 상품이 있으면 추가하려는 상품과 동일한 옴션의 상품이 있는지 확인 후 sameProduct 배열에 저장
    const sameProduct = cart.products.find(
      (productEl) => productName === productEl.productName && size === productEl.size && color === productEl.color,
    );
    // cart 의 products 배열 안에 있는 product의 productName, size, color 의 값과
    // req.body에서 받은 productName, img, size, color의 값이 모두 동일하면
    // 상품을 추가시키지 않고 해당 product의 quantity를 req.body로 받은 quantity 만큼 증가

    // 장바구니에 동일한 옵션의 상품이 없을 경우 products 배열에 product 추가
    if (!sameProduct) {
      cart.products.push(product); // products 배열에 product 추가
      await cart.save();
      res.status(200).json('장바구니 담기 성공3');
      return;
    }

    // 장바구니에 동일한 옵션의 상품이 있을 경우 상품을 추가하지 않고 기존에 들어있는 상품의 quantity에 req.body의 quantity를 더해 증감시키기
    sameProduct.quantity += quantity;
    sameProduct.unitSumPrice = sameProduct.price * sameProduct.quantity;

    await cart.save();
    res.status(200).json('기존 상품 수량 증가');
  } catch (err) {
    console.error(err);
    res.status(500).json('장바구니 담기 실패');
  }
};

// ---------------------------- 장바구니 특정 상품 하나 삭제 ----------------------------
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
    res.status(500).json('상품 삭제 실패');
  }
};

// ---------------------------- 장바구니 비우기 ----------------------------
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

// ---------------------------- 장바구니 상품 카운팅 + 1 ----------------------------
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

// ---------------------------- 장바구니 상품 카운팅 - 1 ----------------------------
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

module.exports = {
  addProductToCart,
  getCartInfo,
  removeCartItem,
  cleanCart,
  cartProductQtyPlus,
  cartProductQtyMinus,
};

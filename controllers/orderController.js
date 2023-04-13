const Order = require('../models/order');
// const User = require('../models/user');
// const product = require('../models/product');

const sendOrder = async (req, res) => {
  try {
    const { productName, img, price, size, color, quantity, unitSumPrice } = req.body;
    const productInfo = {
      productName,
      img,
      price,
      size,
      color,
      quantity,
      unitSumPrice,
    };
    res.send({ productInfo });
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
  // try {
  //   const { productName, img, price, size, color, quantity, unitSumPrice } = req.body;
  // } catch (err) {}
};

// 한개의 상품을 바로 주문할경우
const addOrder = async (req, res) => {
  try {
    // const userId = '643540aa32e0fd94fa801757';

    // // useId 찾는 코드 나중에 넣기!!
    // // 사용자 정보 조회
    // const user = await User.findById(userId);
    // if (!user) {
    //   return res.status(404).json({ message: 'User not found' });
    // }

    // console.log('hi');

    // const user = await User.findById(userId);
    // if (!user) {
    //   return res.status(404).json({ message: 'User not found' });
    // }

    // user.populate('name age').exec((err, u) => {
    //   if (err) {
    //     console.log(err);
    //     return res.status(500).json({ message: 'Error occurred' });
    //   }
    //   return res.json(u);
    // });

    // user.populate('name').execPopulate((err, u) => {
    //   if (err) return console.log('dd');
    //   return res.json(u);
    // });

    // const test = user.populate('name').exec((err, u) => {
    //   if (err) {
    //     console.log('dd');
    //     return res.status(500).json({ message: 'Error occurred' });
    //   }
    //   return res.json(u);
    // });

    // console.log(test);
    // 주문 생성
    // const order = new Order({
    //   user: user,
    //   products: products,
    //   totalPrice: 0, // 상품 가격 총합
    //   status: 'ordered', // 주문 상태 (ordered, shipping, delivered)
    // });

    const { productName, img, price, size, color, quantity, unitSumPrice, message, status, paymentMethod } = req.body;
    // const userId = '12345';
    // const userId = req.user._id;

    const sumPrice = 100;
    const order = await Order.findOne();
    const product = {
      productName,
      img,
      price,
      size,
      color,
      quantity,
      unitSumPrice,
      sumPrice,
    };

    if (!order) {
      const newOrder = new Order({
        // userId,
        // user,
        products: product,
        message,
        status,
        paymentMethod,
        sumPrice,
      });
      await newOrder.save();
    } else {
      const newOrder = new Order({
        // userId,
        // user,
        products: product,
        message,
        status,
        paymentMethod,
        sumPrice,
      });
      await newOrder.save();
    }
    // const populatedOrder = await Order.findById(userId).populate('user', 'name');
    // res.status(200).json(populatedOrder);
    res.status(200).json('주문하기 성공');
  } catch (err) {
    console.error(err);
    res.status(500).json('주문하기 실패');
  }
};

// 카트에서 여러 상품을 가지고 주문
module.exports = {
  addOrder,
  sendOrder,
};

// const addOrder = async(req, res) =>{
//   try{
//     const {orderNo, user, message, totalPrice, isPaid, orderDate, products } = req.body;

//     const order = new Order({
//       userId,
//       products : [{
//       orderNo, user, message, totlalPrice, isPaid, orderDate, products}
//       ]
//     });
//     await order.save();
//     res.send();
//   }
// }
// // 주문생성
// exports.createOrder = async (req, res, next) => {
//   const { orderNo, user, message, totalPrice, isPaid, orderDate, products } = req.body;
//   try {
//     // 클라이언트에게받은 요청으로부터 받은 값을 이용하여 order 모델의 인스턴스를 생성
//     // 생성된 주문 정보를 클라이언트에게 응답으로 전송
//     const order = await Order.create({ orderNo, user, message, totlalPrice, isPaid, orderDate, products });
//   } catch (error) {
//     next(error);
//   }
// };

// // 모든 주문 조회
// exports.getAllOrders = async (req, res, next) => {
//   try {
//     const orders = await Orders.find().populate('user products.product');
//     // orders 객체 = 조회한, 찾은 모든 주문 데이터를 JSON 형태로 클라이언트에게 반환하는 코드입니다.
//     res.status(200).json(orders);
//   } catch (error) {
//     next(error);
//   }
// };

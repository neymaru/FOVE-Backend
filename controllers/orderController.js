const Order = require('../models/order');
// const User = require('../models/user');
// const product = require('../models/product');

// const sendOrder = async (req, res) => {
//   try {
//     const { productName, img, price, size, color, quantity, unitSumPrice } = req.body;
//     const productInfo = {
//       productName,
//       img,
//       price,
//       size,
//       color,
//       quantity,
//       unitSumPrice,
//     };
//     res.send({ productInfo });
//   } catch (error) {
//     console.error(error);
//     res.sendStatus(500);
//   }
//   // try {
//   //   const { productName, img, price, size, color, quantity, unitSumPrice } = req.body;
//   // } catch (err) {}
// };

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

    const {
      // 들어갈 내용 : status,approvedAt,method
      // 상의할것 : 토탈 금액 알아서? 할인도 그전에 처리되는건지 ?
      payments,
      // productName,
      // img,
      // price,
      // size,
      // color,
      // quantity,
      products,
      unitSumPrice,
      message,
      isOrdered,
      isShipping,
      isDelivered,
      isReturn,
      paymentMethod,
      name,
      address,
      phone,
      email,
      recipientName,
      recipientZipcode,
      recipientAddress,
      recipientAddressDetail,
      telAreaCode,
      telMidNum,
      telLastNum,
      phoneCode,
      phoneMidNum,
      phoneLastNum,
    } = req.body;
    // const userId = '12345';
    // const userId = req.user._id;

    const order = await Order.findOne();
    // const product = [
    //   {
    //     productName,
    //     img,
    //     price,
    //     size,
    //     color,
    //     quantity,
    //     unitSumPrice,
    //   },
    // ];
    const user = { name };
    const recipient = {
      address,
      phone,
      email,
      recipientName,
      recipientZipcode,
      recipientAddress,
      recipientAddressDetail,
      telAreaCode,
      telMidNum,
      telLastNum,
      phoneCode,
      phoneMidNum,
      phoneLastNum,
    };

    const sumPrice = unitSumPrice;

    if (!order) {
      const newOrder = new Order({
        // userId,
        // user,
        payments,
        user,
        recipient,
        products,
        message,
        isOrdered,
        isShipping,
        isDelivered,
        isReturn,
        // paymentMethod,
        sumPrice,
      });
      await newOrder.save();
    } else {
      const newOrder = new Order({
        // userId,
        // user,
        payments,
        user,
        recipient,
        products,
        message,
        isOrdered,
        isShipping,
        isDelivered,
        isReturn,
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

const getAllOrder = async (req, res) => {
  try {
    const order = await Order.find({});
    res.status(200).json(order);
  } catch (err) {
    console.error(err);
    res.status(500).send('주문 부르기 실패(서버에러)');
  }
};
// 카트에서 여러 상품을 가지고 주문
module.exports = {
  addOrder,
  getAllOrder,
};

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

const Order = require('../models/order');

// 주문생성
exports.createOrder = async (req, res, next) => {
  const { orderNo, user, message, totalPrice, isPaid, orderDate, products } = req.body;
  try {
    // 클라이언트에게받은 요청으로부터 받은 값을 이용하여 order 모델의 인스턴스를 생성
    // 생성된 주문 정보를 클라이언트에게 응답으로 전송
    const order = await Order.create({ orderNo, user, message, totlalPrice, isPaid, orderDate, products });
  } catch (error) {
    next(error);
  }
};

// 모든 주문 조회
exports.getAllOrders = async (req, res, next) => {
  try {
    const orders = await Orders.find().populate('user products.product');
    // orders 객체 = 조회한, 찾은 모든 주문 데이터를 JSON 형태로 클라이언트에게 반환하는 코드입니다.
    res.status(200).json(orders);
  } catch (error) {
    next(error);
  }
};

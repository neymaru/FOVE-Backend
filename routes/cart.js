const router = require('express').Router();

const {
  addProductToCart,
  getCartInfo,
  removeCartItem,
  cleanCart,
  cartProductQtyPlus,
  cartProductQtyMinus,
} = require('../controllers/cartController');

<<<<<<< Updated upstream
// 장바구니 정보 불러오기 /cart/list/"유저id"
router.post('/list/:userId', getCartInfo); // 장바구니 정보 불러오기(장바구니 전체 데이터, 장바구니 products length)

// 장바구니에 상품 추가 /cart/add/"유저id"
router.post('/add/:userId', addProductToCart);

// 장바구니 상품 하나 삭제 /cart/remove/"유저id"/"상품고유코드"
router.post('/remove/:userId/:productId', removeCartItem);

// 장바구니 비우기 /cart/clean/"유저id"
router.post('/clean/:userId', cleanCart);

// 장바구니 상품 수량 증가 + 1 /cart/qtyplus/"유저id"/"상품고유코드"
router.post('/qtyplus/:userId/:productId', cartProductQtyPlus);

// 장바구니 상품 수량 감소 - 1 /cart/qtyminus/"유저id"/"상품고유코드"
router.post('/qtyminus/:userId/:productId', cartProductQtyMinus);
=======
// localhost:4000/
router.get('/', getCartInfo); // 장바구니 정보 불러오기(장바구니 데이터, 장바구니 products length)

// /store/productId/"상품고유코드"
router.post('/store/productId/:productId', addProductToCart); // 장바구니에 상품 추가
>>>>>>> Stashed changes

module.exports = router;

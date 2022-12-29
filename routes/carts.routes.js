const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');

const CartController = require('../controllers/carts.controller');
const cartController = new CartController();

router // /user
  .post('/:itemId/cart', cartController.addItemInCart) // 장바구니 상품 추가
  .get('/cart', cartController.getItemInCart) // 장바구니 상품 조회
  .delete('/:cartId/cart', cartController.deleteItemInCart); // 장바구니 상품 제거
// 장바구니 상품 구매하기 (추가 기능 예정)

module.exports = router;

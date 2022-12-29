const express = require('express');
const router = express.Router();

const WishListController = require('../controllers/wishList.controller');
const wishListController = new WishListController();

const auth = require('../middlewares/auth');

router // /user
  .post(
    '/:itemId/wishList',
    auth.isLoggedIn,
    wishListController.addItemInWishList
  ) // 위시리스트 상품 추가
  .get('/wishList', auth.isLoggedIn, wishListController.getItemInWishList) // 위시리스트 상품 조회
  .get(
    '/wishList/option',
    auth.isLoggedIn,
    wishListController.updateGetItemInWishList
  ) // 위시리스트 옵션변경 상품조회
  .delete(
    '/:wishListId/wishList',
    auth.isLoggedIn,
    wishListController.deleteItemInWishList
  ); // 위시리스트 상품 제거

module.exports = router;

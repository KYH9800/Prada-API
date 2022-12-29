const express = require('express');
const router = express.Router();

const WishListController = require('../controllers/wishList.controller');
const wishListController = new WishListController();

router // /user
  .post('/:itemId/wishList', wishListController.addItemInWishList) // 위시리스트 상품 추가
  .get('/wishList', wishListController.getItemInWishList) // 위시리스트 상품 조회
  .get('/wishList/option', wishListController.updateGetItemInWishList) // 위시리스트 옵션변경 상품조회
  .delete('/:wishListId/wishList', wishListController.deleteItemInWishList); // 위시리스트 상품 제거
  

module.exports = router;

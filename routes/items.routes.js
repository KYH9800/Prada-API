const express = require('express');
const router = express.Router();
const ItemController = require('../controllers/items.controller');
const itemController = new ItemController();
const upload = require('../middlewares/awsS3ItemMiddleware');
const auth = require('../middlewares/adminUser.auth');

router
  .post('/', upload.array('optionImage'), itemController.createItem) // 상품 추가, 끝
  .get('/:gender/:theme', itemController.findAllItem) // 테마/카테고리 상품 조회, 예성
  .get('/:itemId', itemController.getItemDetailInformation) // 상품 상세 조회, 끝
  .patch('/:itemId', auth, upload.array('mainImage'), itemController.patchItem) // 상품 수정
  .delete('/:itemId', auth, itemController.deleteItem); // 상품 삭제, 진솔

module.exports = router;

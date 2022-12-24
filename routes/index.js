const express = require('express');
const router = express.Router();

// 로그인, 회원가입 라우터
const authRouter = require('./auth.routes');
router.use('/user', authRouter);

// 장바구니, 위시리시트 라우터
const bucketRouter = require('./buckets.routes');
const wishListRouter = require('./wishList.routes');
router.use('/user', bucketRouter);
router.use('/user', wishListRouter);

// 상품 CRUD 라우터
const itemRouter = require('./items.routes');
router.use('/items', itemRouter);

module.exports = router;

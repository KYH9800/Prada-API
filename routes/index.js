const express = require('express');
const router = express.Router();

// 로그인, 회원가입 라우터
const authRouter = require('./auth.routes');
router.use('/user', authRouter);

// 장바구니, 위시리시트 라우터
const cartRouter = require('./carts.routes');
const wishListRouter = require('./wishList.routes');
router.use('/user', cartRouter);
router.use('/user', wishListRouter);

// 상품 CRUD 라우터
const itemRouter = require('./items.routes');
router.use('/items', itemRouter);

// 관리자 로그인, 회원가입 라우터
const adminUserRouter = require('./adminUser.auth.routes');
router.use('/admin', adminUserRouter);

module.exports = router;

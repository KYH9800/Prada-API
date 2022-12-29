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

// 관리자 로그인, 회원가입 라우터: 진솔 마데카솔
const adminUserRouter = require('./adminUser.auth.routes');
router.use('/admin', adminUserRouter);

// 관리자용 전체 상품 조회 라우터: 윤혁
const adminRouter = require('./admin.routes');
router.use('/admin/items', adminRouter);

module.exports = router;

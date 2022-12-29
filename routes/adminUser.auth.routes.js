const express = require('express');
const router = express.Router();

const AdminUserController = require('../controllers/adminUser.controller');
const adminUsercontroller = new AdminUserController();

router.post('/signup', adminUsercontroller.signupAdmin);

module.exports = router;

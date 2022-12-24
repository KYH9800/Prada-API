const { Router } = require('express');
const UsersController = require('../controllers/users.controller');
const usercontroller = new UsersController();
const router = Router();

router.post('/signup', usercontroller.userSignupController);
router.post;
router.post;
router.get;
router.patch;

module.exports = router;

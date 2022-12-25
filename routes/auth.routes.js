const { Router } = require('express');
const UsersController = require('../controllers/users.controller');
const usercontroller = new UsersController();
const router = Router();

router.post('/signup', usercontroller.userSignupController);
router.post('/login', usercontroller.userLoginController)
router.post('/logout', usercontroller.userLogoutController)
router.get('/', usercontroller.userGetInfoController)
router.patch('/', usercontroller.userModifyController)

module.exports = router;

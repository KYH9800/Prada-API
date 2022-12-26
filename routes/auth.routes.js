const { Router } = require('express');
const UsersController = require('../controllers/users.controller');
const usercontroller = new UsersController();
const router = Router();
const auth = require('../middlewares/auth')

router.post('/signup', usercontroller.userSignupController);
router.post('/login', usercontroller.userLoginController)
router.post('/logout', usercontroller.userLogoutController)
router.get('/', auth.isLoggedIn, usercontroller.userGetInfoController)
router.patch('/', auth.isLoggedIn, usercontroller.userModifyController)

module.exports = router;

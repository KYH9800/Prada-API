const { Router } = require('express');
const UsersController = require('../controllers/users.controller');
const usercontroller = new UsersController();
const router = Router();
const auth = require('../middlewares/auth');

router.post('/signup', auth.isNotLoggedIn, usercontroller.userSignupController);
router.post('/login', auth.isNotLoggedIn, usercontroller.userLoginController);
router.post('/logout', auth.isLoggedIn, usercontroller.userLogoutController);
router.get('/', auth.isLoggedIn, usercontroller.userGetInfoController);
router.patch('/', auth.isLoggedIn, usercontroller.userModifyController);

module.exports = router;

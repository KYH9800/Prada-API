const UsersService = require('../services/users.service');
const jwt = require('jsonwebtoken');
const userService = new UsersService();

const {
  registerSchema,
  loginSchema,
} = require('../validations/user.validation');
const { post } = require('../routes/auth.routes');

class UsersController {
  userSignupController = async (req, res) => {
    try {
      const {
        email,
        emailConfirm,
        password,
        passwordConfirm,
        firstName,
        lastName,
        country,
      } = await registerSchema.validateAsync(req.body);

      await userService.userSignupService({
        email,
        emailConfirm,
        password,
        passwordConfirm,
        firstName,
        lastName,
        country,
      });
      res.status(200).json({ message: '회원가입 성공' });
    } catch (err) {
      console.log(err);
      res
        .status(400)
        .json({ message: '요청한 데이터의 형식이 올바르지 않습니다.' });
    }
  };

  userLoginController = async (req, res) => {
    try {
      const { email, password } = await loginSchema.validateAsync(req.body);
      console.log('userLoginController: ', email, password);

      const { accessToken, firstname } = await userService.userLoginService({
        email,
        password,
      });
      res.status(200).json({ token: accessToken, firstname });
    } catch (err) {
      console.log(err);
      res
        .status(400)
        .json({ message: '요청한 데이터의 형식이 올바르지 않습니다.' });
    }
  };

  userLogoutController = async (req, res) => {
    try {
    } catch (err) {
      console.log(err);
      res
        .status(400)
        .json({ message: '요청한 데이터의 형식이 올바르지 않습니다.' });
    }
  };

  userGetInfoController = async (req, res) => {
    try {
      const { userId } = res.locals;

      const result = await userService.userGetInfoService({ userId });
      res.status(200).json({ ...result.dataValues });
    } catch (err) {
      console.log(err);
      res.status(400).json({
        message: '요청 실패: 관리자에게 문의하세요.',
        result: false,
      });
    }
  };

  userModifyController = async (req, res) => {
    try {
      const { userId } = res.locals;
      const { firstName, lastName, country, email, emailConfirm } = req.body;

      await userService.userModifyService({
        userId,
        firstName,
        lastName,
        country,
        email,
        emailConfirm,
      });
      res.status(200).json({ message: '회원정보 수정 완료.', result: true });
    } catch (err) {
      console.log(err);
      res.status(400).json({
        message: '요청 실패: 관리자에게 문의하세요.',
        result: false,
      });
    }
  };
}

module.exports = UsersController;

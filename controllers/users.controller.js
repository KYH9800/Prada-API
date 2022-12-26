const UsersService = require('../services/users.service');
const jwt = require('jsonwebtoken');
const userService = new UsersService();

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
      } = req.body;

      await userService.userSignupService({
        email,
        emailConfirm,
        password,
        passwordConfirm,
        firstName,
        lastName,
        country,
      });
      res.status(200).json({ messge: '회원가입 성공' });
    } catch (err) {
      console.log(err);
      res
        .status(400)
        .json({ errorMessge: '요청한 데이터의 형식이 올바르지 않습니다.' });
    }
  };

  userLoginController = async (req, res) => {
    try {
      const { email, password } = req.body;

      const { accessToken, firstname } = await userService.userLoginService({
        email,
        password,
      });
      res.status(200).json({ token: accessToken, firstname });
    } catch (err) {
      console.log(err);
      res
        .status(400)
        .json({ errorMessge: '요청한 데이터의 형식이 올바르지 않습니다.' });
    }
  };

  userLogoutController = async (req, res) => {
    try {
    } catch (err) {
      console.log(err);
      res
        .status(400)
        .json({ errorMessge: '요청한 데이터의 형식이 올바르지 않습니다.' });
    }
  };

  userGetInfoController = async (req, res) => {
    try {
      const { userId } = res.locals;

      const result = await userService.userGetInfoService({ userId });
      res.status(200).json({ ...result.dataValues });
    } catch (err) {
      console.log(err);
      res
        .status(400)
        .json({
          errorMessage: '요청 실패: 관리자에게 문의하세요.',
          result: false,
        });
    }
  };

  userModifyController = async (req, res) => {
    try {
      const { userId } = res.locals;
      const { email, password, firstName, lastName, country } = req.body;

      await userService.userModifyService({ userId, email, password, firstName, lastName, country});
      res.status(200).json({ message: '회원정보 수정 완료.', result: true });
    } catch (err) {
      console.log(err);
      res
        .status(400)
        .json({
          errorMessage: '요청 실패: 관리자에게 문의하세요.',
          result: false,
        });
    }
  };
}

module.exports = UsersController;

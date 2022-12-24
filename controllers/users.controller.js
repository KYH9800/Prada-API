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
    } catch (err) {
      console.log(err);
      res
        .status(400)
        .json({ errorMessge: '요청한 데이터의 형식이 올바르지 않습니다.' });
    }
  };
}

module.exports = UsersController;

const { AdminUser } = require('../models/AdminUser');
const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = process.env;

module.exports = async (req, res) => {
  try {
    const { authorization } = req.headers;
    const [tokenType, tokenValue] = authorization.split(' ');
    if (!authorization) {
      return res
        .status(401)
        .json({ error: '관리자 로그인 후 이용 가능한 기능입니다.' });
    }

    // 해당하는 jwt 가 유효한가에 대한 검증과 복호화
    const { adminUserId } = jwt.verify(tokenValue, JWT_SECRET_KEY);
    AdminUser.findByPk(adminUserId).then((adminUser) => {
      res.locals.adminUser = adminUser;
      next();
    });
  } catch (err) {
    return res
      .status(401)
      .json({ error: '관리자 로그인 후 이용 가능한 기능입니다.' });
  }
};

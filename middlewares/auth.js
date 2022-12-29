const jwt = require('jsonwebtoken');
const { ApiError } = require('../utils/apiError');
const { JWT_SECRET } = process.env;

const isLoggedIn = (req, res, next) => {
  try {
    const { authorization } = req.headers;
    console.log('authorization: ', authorization);
    if (!authorization) return next(new ApiError('LOGIN REQUIRED', 401));

    const [authType, authToken] = authorization.split(' ');
    if (authType !== 'Bearer') throw new ApiError('WRONG REQUEST', 400);

    try {
      res.locals = jwt.verify(authToken, JWT_SECRET);
      next();
    } catch {
      next(new ApiError('LOGIN REQUIRED', 401));
    }
  } catch (err) {
    next(err);
  }
};

// 로그인된 상태에서 회원가입 또는 로그인을 하려고 할때 막는 용도
const isNotLoggedIn = (req, res, next) => {
  try {
    const { authorization } = req.headers;
    console.log('authorization: ', authorization);
    if (!authorization) return next();

    const [authType, authToken] = authorization.split(' ');
    if (authType !== 'Bearer') throw new ApiError('WRONG REQUEST', 400);

    try {
      jwt.verify(authToken, JWT_SECRET);
      next(new ApiError('ALREADY LOGGED IN', 400));
    } catch {
      next();
    }
  } catch (err) {
    next(err);
  }
};

//TODO:

module.exports = { isLoggedIn, isNotLoggedIn };

// 인증되지 않은 사용자
class AuthorizationError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status || 401;
    this.name = 'AutorizationError';
  }
}
// 잘못된 요청
class BadRequestError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status || 400;
    this.name = 'BadRequestError';
  }
}

// 유효하지 않은 params
class InvalidParamsError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status || 405;
    this.name = 'InvalidParamsError';
    if (!message) this.message = '잘못된 params입니다.';
  }
}

//없는 게시글
class NotFoundError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status || 404;
    this.name = 'NotFoundError';
  }
}

// 데이터 형식 오류
class ValidationError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status || 412;
    this.name = 'ValidationError';
  }
}

// 리소스 중복 오류
class DuplicateError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status || 409;
    this.name = 'DuplicateError';
  }
}

module.exports = {
  AuthorizationError,
  BadRequestError,
  InvalidParamsError,
  NotFoundError,
  ValidationError,
  DuplicateError,
};

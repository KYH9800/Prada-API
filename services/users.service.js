const UsersRepositorys = require('../repositories/users.repositories');
const usersrepository = new UsersRepositorys();
const { ApiError } = require('../utils/apiError');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class UsersService {
  userSignupService = async ({
    email,
    emailConfirm,
    password,
    passwordConfirm,
    firstName,
    lastName,
    country,
  }) => {
    if (!email) {
      throw new ApiError('이메일이 입력되지 않았습니다.', 412);
    }

    if (!password) {
      throw new ApiError('비밀번호가 입력되지 않았습니다.', 412);
    }

    if (!firstName) {
      throw new ApiError('이름이 입력되지 않았습니다.', 412);
    }

    if (!lastName) {
      throw new ApiError('성별이 입력되지 않았습니다.', 412);
    }

    if (!country) {
      throw new ApiError('나라를 선택해주세요.', 412);
    }

    if (!emailConfirm || !passwordConfirm) {
      throw new ApiError('요청한 데이터의 형식이 올바르지 않습니다.', 412);
    }

    if (email != emailConfirm) {
      throw new ApiError('이메일이 일치하지 않습니다.', 412);
    }

    if (password != passwordConfirm) {
      throw new ApiError('비밀번호가 일치하지 않습니다.', 412);
    }
    const hashedpassword = await bcrypt.hash(
      password,
      parseInt(process.env.PASSWORD_SALT)
    );
    await usersrepository.userCreat({
      email,
      hashedpassword,
      firstName,
      lastName,
      country,
    });
    return true;
  };

  userLoginService = async ({ email, password }) => {
    //TODO: 이메일 형식이 맞는지 검증하는 API 필요

    if (!email || !password) {
      throw new ApiError('email 또는 password가 없습니다.', 400);
    }
    const user = await usersrepository.userFindForLogin({ email });
    
    const Comparedpassword = await bcrypt.compare(password, user.password);

    if (!user || !Comparedpassword) {
      throw new ApiError('email 또는 password가 일치하지 않습니다.', 400);
    }

    const accessToken = jwt.sign(
      { userId: user.userId },
      process.env.JWT_SECRET,
      {
        expiresIn: '24h',
      }
    );
    const firstname = user.firstName;
    return { accessToken, firstname };

    
  };

  userLogoutService = async (req, res) => {};

  userGetInfoService = async ({ userId }, next) => {
    if (!userId) {
      throw new ApiError('사용자가 없다.', 400);
    }
    return await usersrepository.userGetInfo({ userId });
  };

  userModifyService = async ({ userId, email, password, firstName, lastName, country}) => {

    if(userId || !email || !password || !firstName || !lastName || !country){
      throw new ApiError("입력 body 오류", 400);
    }

    const hashedpassword = await bcrypt.hash(
      password,
      parseInt(process.env.PASSWORD_SALT)
    );

    const user = await usersrepository.userFindForLogin({email});
    const Comparedpassword = await bcrypt.compare(hashedpassword, user.password);

    if(!user || !Comparedpassword){
      throw new ApiError("현재 비밀번호가 틀려서 에러가 났어요", 400)
    }
    //TODO: 변경할 비밀번호가 인자가 없음.

    await usersrepository.userModify({email});

  };
}

module.exports = UsersService;

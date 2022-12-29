const UsersRepositorys = require('../repositories/users.repositories');
const usersrepository = new UsersRepositorys();
const { ApiError } = require('../utils/apiError');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { post } = require('../routes/auth.routes');

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
    const result = await usersrepository.userCheck({ email });
    if (result) {
      throw new ApiError('이미 존재하는 유저', 400);
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
      throw new ApiError('email 또는 password값이 없음', 400);
    }
    const user = await usersrepository.userFindForLogin({ email });

    const Comparedpassword = await bcrypt.compare(password, user.password);

    if (!user || !Comparedpassword) {
      throw new ApiError('email 또는 password가 틀리다.', 400);
    }

    const accessToken = jwt.sign(
      { userId: user.userId },
      process.env.JWT_SECRET,
      {
        expiresIn: '24h',
      }
    );
    // console.log('accessToken: ', accessToken);
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

  userModifyService = async ({
    userId,
    firstName,
    lastName,
    country,
    email,
    emailConfirm,
  }) => {
    if (
      !userId ||
      !firstName ||
      !lastName ||
      !country ||
      !email ||
      !emailConfirm
    ) {
      throw new ApiError('입력 body 오류', 400);
    }

    if (email !== emailConfirm) {
      throw new ApiError('이메일이 다름', 400);
    }

    // const hashedpassword = await bcrypt.hash(
    //   password,
    //   parseInt(process.env.PASSWORD_SALT)
    // );

    // const user = await usersrepository.userFindForLogin({email});
    // const Comparedpassword = await bcrypt.compare(hashedpassword, user.password);

    // if(!user || !Comparedpassword){
    //   throw new ApiError("현재 비밀번호가 틀려서 에러가 났어요", 400)
    // }

    await usersrepository.userModify({
      userId,
      firstName,
      lastName,
      country,
      email,
    });
    return true;
  };
}

module.exports = UsersService;

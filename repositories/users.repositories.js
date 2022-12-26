const { User } = require('../models');

class UsersRepositorys {
  userCreat = async ({
    email,
    hashedpassword,
    firstName,
    lastName,
    country,
  }) => {
    await User.create({
      email,
      password: hashedpassword,
      firstName,
      lastName,
      country,
    });
  };

  userFindForLogin = async ({ email }) => {
    const uesr = await User.findOne({ where: { email } });
    return uesr;
  };

  //userLogout = async ({}) => {};
  userGetInfo = async ({ userId }) => {
    return await User.findOne({
      where: { userId },
      attributes: ['email', 'firstName', 'lastName', 'country'],
    });
  };
  userModify = async ({}) => {};
}

module.exports = UsersRepositorys;

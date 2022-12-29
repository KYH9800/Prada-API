const { AdminUser } = require('../models');

class AdminUserRepository {
  signupAdmin = async (email, nickName, hashedPassword) => {
    const createAdminUser = await AdminUser.create({
      email,
      password: hashedPassword,
      nickName,
    });
    return createAdminUser;
  };

  //   isExistAdminUser = async (nickname) => {
  //     const findAdminUser = await AdminUser.findOne({ where: { nickname } });
  //     return findAdminUser;
  //   };
}

module.exports = AdminUserRepository;

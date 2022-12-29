const AdminUserRepository = require('../repositories/adminUser.repository');
const bcrypt = require('bcryptjs');
const PASSWORD_SALT = parseInt(process.env.PASSWORD_SALT);
const {
  ValidationError,
  DuplicateError,
} = require('../exceptions/index.exception');

class AdminUserService {
  adminUserRepository = new AdminUserRepository();
  signupAdmin = async (email, password, nickname) => {
    const hashedPassword = await bcrypt.hash(password, parseInt(PASSWORD_SALT));

    const isExistAdminUser = await this.adminUserRepository.isExistAdminUser(
      nickname
    );
    if (isExistAdminUser)
      throw new DuplicateError('이미 사용중인 관리자 아이디입니다.');
    if (!email || !password || !nickname) {
      throw new ValidationError('필수 항목을 입력해주세요');
    }
    await this.adminUserRepository.signupAdmin(email, hashedPassword, nickname);
    return true;
  };
}
module.exports = AdminUserService;

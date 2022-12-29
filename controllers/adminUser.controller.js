const AdminUserService = require('../services/adminUser.service');

class AdminUserController {
  adminUserService = new AdminUserService();
  signupAdmin = async (req, res) => {
    try {
      const { email, password, nickname } = req.body;
      await adminUserService.signupAdmin(email, password, nickname);
      return res.status(201).json({ message: '관리자 회원가입 성공' });
    } catch (error) {
      res.status(400).json({ errorMessage: '관리자 회원가입 실패' });
    }
  };
}

module.exports = AdminUserController;

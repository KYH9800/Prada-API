
const UsersRepositorys = require('../repositories/users.repositories');
const usersrepository = new UsersRepositorys();


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
      res
        .status(412)
        .json({ errorMessge: '이메일이 입력되지 않았습니다.', result: false });
    }

    if (!password) {
      res.status(412).json({
        errorMessge: '비밀번호가 입력되지 않았습니다.',
        result: false,
      });
    }

    if (!firstName) {
      res
        .status(412)
        .json({ errorMessge: '이름이 입력되지 않았습니다.', result: false });
    }

    if (!lastName) {
      res
        .status(412)
        .json({ errorMessge: '성별이 입력되지 않았습니다.', result: false });
    }

    if (!country) {
      res
        .status(412)
        .json({ errorMessge: '나라를 선택해주세요.', result: false });
    }

    if (!emailConfirm || !passwordConfirm) {
      res.status(412).json({
        errorMessge: '요청한 데이터의 형식이 올바르지 않습니다.',
        result: false,
      });
    }

    if(email != emailConfirm){
        res.status(412).json({
            errorMessge: '이메일이 일치하지 않습니다.',
            result: false,
          });
    }

    if(password != passwordConfirm){
        res.status(412).json({
            errorMessge: '비밀번호가 일치하지 않습니다.',
            result: false,
          });
    }

    await usersrepository.userCreat({email, password, firstName, lastName, country})
    res.status(200).json({Messge: "회원가입 성공", result:true})

  };


  userLoginService = async (req, res) =>{

  }

  userLogoutService = async (req, res) =>{
    
  }

  userGetInfoService = async (req, res) =>{
    
  }

  userModifyService = async (req, res) =>{
    
  }

}

module.exports = UsersService;

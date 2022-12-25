
const { User } = require('../models');

class UsersRepositorys {

    userCreat = async ({email, password, firstName, lastName, country}) =>{
        await User.creat({email, password, firstName, lastName, country})
    }

    userLogin = async ({}) => {}
    userLogout = async ({}) => {}
    userGetInfo = async ({}) => {}
    userModify = async ({}) => {}

 


}

module.exports = UsersRepositorys;

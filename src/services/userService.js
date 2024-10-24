const User = require("../models/user");
const bcrypt = require('bcrypt');
const saltRounds = 10;
const createUserService = async (name, email, password) => {
    try {
        const hashPassword = await bcrypt.hash(password, saltRounds)
        let result = await User.create({
            name: name,
            email: email,
            password: hashPassword,
            role: "admin"
            
        })
        return result;

    } catch (error) {
        console.log(error);
        return null;
    }
}

const loginService = async (email1, password) => {
  try {
    const user = await User.findOne({ email: email1 })
    if (user) {
      const isMatchPassword = await bcrypt.compare(password, user.password)
      if (!isMatchPassword) {
        return {
          EC: 2,
          EM: "Email/Password khong hop le"
        }
      }
      else {
        return "Create an access token"
      }
    }
  } catch (error) {
    return null;
  }
};



module.exports = {
    createUserService, loginService
}
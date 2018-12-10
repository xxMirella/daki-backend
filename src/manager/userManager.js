const userDAO = require('../DAO/userDAO');
const boom = require('boom');
const utils = require('../common/utils');

class UserManager {

  static async validateUser(email, password) {
    const userDao = new userDAO();
    const user = await userDao.get({email: email});
    if (user.length <= 0) {
      return boom.notFound('Usuário não cadastrado!')
    } else {
      if (email.toLowerCase() !== user[0].email || password.toLowerCase() !== user[0].password) {
        return boom.unauthorized('Email ou senha incorreto!');
      } else {
        return utils.createToken(email);
      }
    }
  }
}

module.exports = UserManager;
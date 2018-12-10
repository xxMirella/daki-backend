const Joi = require('joi');
const userDao = require('../DAO/userDAO');
const utils = require('../common/utils');
const userManager = require('../manager/userManager');

class AuthRoute {

  constructor() {
    this.userDao = new userDao();
  }

  login() {
    return {
      method: 'POST',
      path: '/auth/login',
      handler: async (req) => {
        const { email, password } = req.payload;
        const user =  await this.userDao.get({email: email});
        return {
          user,
          "TokenLogin": await userManager.validateUser(email, password)
        };
      },
      config: {
        auth: false,
        tags: ['api'],
        description: 'Deve gerar um token para o usuario',
        validate: {
          payload: {
            email: Joi.string()
              .required(),
            password: Joi.string()
              .max(100)
              .required(),
          }
        }
      }
    }
  };

  signUP() {
    return {
      method: 'POST',
      path: '/auth/signUp',
      handler: async (req) => {
        return await this.userDao.postUser(req.payload);
      },
      config: {
        auth: false,
        tags: ['api'],
        description: 'Cadastra um novo usuário',
        validate: {
          payload: utils.validateUserPayload(),
        }
      }
    }
  };

  getMe() {
    return {
      method: 'GET',
      path: '/auth/{id}',
      handler: async (req, h) => {
        try {
          const { id } = req.params;
          return await this.userDao.get({_id: id});
        } catch (err) {
          console.log(err)
        }
      },
      config: {
        tags: ['api'],
        description: 'Retorna as informações do usuário',
        notes: 'O usuário precisa estar logado',
        validate: {
          headers: utils.validateHeaders(),
          params: {
            id: Joi.string()
              .max(200)
              .required(),
          },
        },
      },
    };
  };

}

module.exports = AuthRoute;
const Joi = require('joi');
const userDao = require('../DAO/userDAO');
const postDao = require('../DAO/postDAO');
const utils = require('../common/utils');
const boom = require('boom');


class UserPostsRoute {

  constructor() {
    this.userDao = new userDao();
    this.postsDAO = new postDao();
  }

  static validatePosts() {
    return {
      userId: Joi.string().required(),
      postId: Joi.string().required()
    }
  };

  async validateExistingPostAndUser(userId, postId) {
    try {
      const post = await this.postsDAO.get({_id: postId});
      const user = await this.userDao.get({_id: userId});
      return !(post.length <= 0 || user.length <= 0);
    } catch (e) {
      console.log(e);
    }

  };

  postUserFavPosts() {
    return {
      method: 'POST',
      path: '/user/fav/posts',
      handler: async (req) => {
        const { userId, postId } = req.payload;
        const isValid = await this.validateExistingPostAndUser(userId, postId);

        if ( isValid ){
          return await this.userDao.push({ _id: userId}, {favPostsID: postId});
        } else {
          return boom.notFound('Post ou usuário não encontrados!')
        }
      },
      config: {
        tags: ['api'],
        description: 'Deve adicionar um post aos favoritos do usuário',
        validate: {
          headers: utils.validateHeaders(),
          payload: UserPostsRoute.validatePosts(),
        }
      }
    }
  };

  getUserFavPosts() {
    return {
      method: 'GET',
      path: '/user/fav/posts/{userId}',
      handler: async (req) => {
        const { userId } = req.params;
        try {
          return await this.userDao.getFavPosts({_id: userId});
        } catch (e) {
          console.log(e);
        }

      },
      config: {
        tags: ['api'],
        description: 'Retorna os posts favoritos do usuário',
        notes: 'Necessário passar o id do usuário',
        validate: {
          headers: utils.validateHeaders(),
          params: {
            userId: Joi.string()
              .max(200)
              .required(),
          },
        },
      },
    };
  };

  deleteUserFavPosts() {
    return {
      method: 'DELETE',
      path: '/user/fav/posts/{userId}/{postId}',
      handler: async (request, h) => {
        try {
          const { userId, postId } = request.params;
          return await this.userDao.deleteFavPost(userId, postId);
        } catch (err) {
          console.log(err);
        }
      },
      config: {
        tags: ['api'],
        description: 'Remove um post dos favoritos pelo id',
        notes: 'O id deve ser válido',
        validate: {
          headers: utils.validateHeaders(),
          params: {
            userId: Joi.string()
              .required(),
            postId: Joi.string()
              .required(),
          },
        },
      },
    };
  };

  postUserLikePosts() {
    return {
      method: 'POST',
      path: '/user/like/posts',
      handler: async (req) => {
        const { userId, postId } = req.payload;
        const isValid = this.validateExistingPostAndUser();
        
        if ( isValid ){
          return await this.postsDAO.push(postId, {likeUserIds: userId});
        } else {
          return boom.notFound('Post ou usuário não encontrados!')
        }
      },
      config: {
        tags: ['api'],
        description: 'Deve adicionar o usuário aos likes do post',
        notes: 'UserId e postId devem ser válidos',
        validate: {
          headers: utils.validateHeaders(),
          payload: UserPostsRoute.validatePosts(),
        }
      }
    }
  };

  getUserLikedPosts() {
    return {
      method: 'GET',
      path: '/user/like/posts/{postId}',
      handler: async (req) => {
        const { postId } = req.params;
        try {
          return await this.postsDAO.getLikedPosts({_id: postId});
        } catch (e) {
          console.log(e);
        }

      },
      config: {
        tags: ['api'],
        description: 'Retorna os posts que o usuário deu like',
        notes: 'Necessário passar o id do post',
        validate: {
          headers: utils.validateHeaders(),
          params: {
            postId: Joi.string()
              .max(200)
              .required(),
          },
        },
      },
    };
  };

  deleteUserLikedPosts() {
    return {
      method: 'DELETE',
      path: '/user/like/posts/{userId}/{postId}',
      handler: async (request, h) => {
        try {
          const { userId, postId } = request.params;
          return await this.postsDAO.deleteLikedPost(userId, postId);
        } catch (err) {
          console.log(err);
        }
      },
      config: {
        tags: ['api'],
        description: 'Remove um usuário dos likes do post pelo id',
        notes: 'O id deve ser válido',
        validate: {
          headers: utils.validateHeaders(),
          params: {
            userId: Joi.string()
              .required(),
            postId: Joi.string()
              .required(),
          },
        },
      },
    };
  };

}

module.exports = UserPostsRoute;
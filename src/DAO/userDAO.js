const crudDAO = require('./crudDAO');
const User = require('../models/userModel');
const Posts = require('../DAO/postDAO');
const boom = require('boom');
const utils = require('../common/utils');


class UserDAO extends crudDAO {
  constructor() {
    super(User, '_id');
  }

  async postUser(userData) {
    const exists = await this.get({email: userData.email});
    if (exists.length) {
      return boom.conflict('Email já existe em nossa base!')
    } else {
      const { email } = userData;
      return {
        response: await this.post(userData).then(value => {
          const response = JSON.parse(JSON.stringify(value));
          delete response.password;
          return response;
        }),
        "TokenLogin": utils.createToken(email),
      }
    }
  }

  async getFavPosts(userId) {
    const postsDao = new Posts();
    const userPosts = await this.get({_id: userId});
    const favPosts = [];
    if (userPosts <= 0 || userPosts[0] === undefined) {
      return boom.notFound('Post favorito ou usuário não encontrados!');
    } else {
      for ( let postId of userPosts[0].favPostsID ) {
        const posts = await postsDao.get({_id: postId});
        favPosts.push(posts);
      }
      return favPosts;
    }

  }

  async deleteFavPost(userId, postId) {
    const userPosts = await this.get({favPostsID: postId});
    if ( userPosts.length >= 0 ) {
      return await this.pull({_id: userId}, {favPostsID: postId});
    }
  }

}

module.exports = UserDAO;
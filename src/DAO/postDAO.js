const crudDAO = require('./crudDAO');
const postModel = require('../models/postModel');
const userDao = require('./userDAO');
const boom = require('boom');


class PostDAO extends crudDAO {
  constructor() {
    super(postModel, '_id');
  }

  async getLikedPosts(postId) {
    const userDao = new userDao();
    const post = await this.get({_id: postId});
    const likedPosts = [];
    if (post <= 0 || post[0] === undefined) {
      return boom.notFound('Post favorito ou usuário não encontrados!');
    } else {
      for ( let userId of post[0].likeUserIds ) {
        const user = await userDao.get({_id: userId});
        likedPosts.push(user);
      }
      return likedPosts;
    }

  }

  async deleteLikedPost(userId, postId) {
    const userLikes = await this.get({likeUserIds: userId});
    if ( userLikes.length >= 0 ) {
      return await this.pull({_id: postId}, {likeUserIds: userId});
    }
  }
}

module.exports = PostDAO;
const crudDAO = require('./crudDAO');
const commentsModel = require('../models/commentsModel');

class CommentsDAO extends crudDAO {
  constructor() {
    super(commentsModel, '_id');
  }
}

module.exports = CommentsDAO;
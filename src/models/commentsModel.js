const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.ObjectId;

let CommentsSchema = new mongoose.Schema({
  userId:      { type: ObjectId, required: true },
  userName:    { type: String, required: true },
  text:        { type: String, required: true },
  publishedAt: { type: Date, default: new Date() }
});

module.exports = CommentsSchema;
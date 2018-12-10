const mongoose = require('mongoose');
const CommentsSchema = require('./commentsModel');
const AddressSchema = require('./addressModel');
const ObjectId = mongoose.Schema.ObjectId;
const ImagesSchema = require('./imagesModel');

const postTypes = [
  'Events',
  'Service',
  'Exchange',
  'Alert'
];

let PostSchema = new mongoose.Schema({
  userId:      { type: ObjectId, required: true },
  userName:    { type: String, required: true },
  type:        postTypes,
  image:       ImagesSchema,
  title:       { type: String, required: true },
  userLocal:   AddressSchema,
  address:     { type: String },
  date:        { type: String },
  hour:        { type: String },
  link:        { type: String, required: true },
  likeUserIds: { type: Array },
  comments:    CommentsSchema,
  description: { type: String, required: true },
  contact:     { type: String },
  createdAt:   { type: Date, default: Date() }
});

module.exports = mongoose.model('Post', PostSchema, 'posts');
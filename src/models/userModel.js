const mongoose = require('mongoose');
const AddressSchema = require('./addressModel');
const ImagesSchema = require('./imagesModel');

let UserModel = new mongoose.Schema({
  profilePhoto: ImagesSchema,
  address:      AddressSchema,
  name:         { type: String, required: true },
  phone:        { type: String },
  birthDay:     { type: Date, required: true },
  email:        { type: String, required: true, index: { unique: true } },
  password:     { type: String, required: true },
  favPostsID:   { type: Array }
});

module.exports = mongoose.model('User', UserModel, 'users');
const mongoose = require('mongoose');

let ImagesModel = new mongoose.Schema({
  value:    { type: String, required: true },
  fileType: { type: String, required: true },
  fileName: { type: String, required: true },
});

module.exports = ImagesModel;
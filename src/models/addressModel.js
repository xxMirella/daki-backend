const mongoose = require('mongoose');

let AddressModel = new mongoose.Schema({
  cep:          { type: String, required: true },
  street:       { type: String, required: true },
  district:     { type: String, required: true },
  city:         { type: String, required: true },
  country:      { type: String, required: true },
});

module.exports = AddressModel;
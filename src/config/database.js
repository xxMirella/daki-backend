const mongoose = require('mongoose');
const boom = require('boom');

class Database {

  constructor(host) {
    this.host = host;
  }

  connect() {
    try {
      mongoose.connect(this.host, { useNewUrlParser: true });
      return mongoose.connection;
    } catch (error) {
      return boom.internal();
    }
  }
}

module.exports = Database;
var mongoose = require('mongoose');

var CitySchema = new mongoose.Schema({
    name: String,
  });

  module.exports = mongoose.model('CityMaster', CitySchema);
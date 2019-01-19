var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    name: String,
    surname: String,
    email: String,
    gender: String,
    city: String,
    skills: String,
    profileurl:String
    
  });

  module.exports = mongoose.model('User', UserSchema);
var mongoose = require('mongoose');

var SkillSchema = new mongoose.Schema({
    name: String,
  });

  module.exports = mongoose.model('SkillMaster', SkillSchema);
'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var util = require('util');

var userInfo = new Schema({
  name : { type : String, required : true },
  studentId : { type : String, required : true },
  sex: { type: String, required: true },
  clsName: {type: String, required: true},
  tags : [String],
  content : { type: String }
});

userInfo.path('tags').set(function(val) {
  if (val === undefined) {
    return val;
  }

  if (util.isArray(val)) {
    return val;
  }

  return val.split(',');
});

var users = {
  Note : mongoose.model('notes', userInfo)
};

module.exports = users;
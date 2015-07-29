"use strict";

var mongoose = require('mongoose');

var tweetSchema = mongoose.Schema({
  created_at: String,
  text: String,
  name: String,
  screen_name: String,
  location: String
});

module.exports = mongoose.model("Tweet", tweetSchema);

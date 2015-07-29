"use strict"

var Twitter = require('twitter');
var Tweet = require("../models/tweetsM");

// Insert your keys/secrets here
var client = new Twitter ({
  consumer_key: "dNHgUGwErdIqdTzKYF1GV8dpZ",
  consumer_secret: "iWxXbTkjfDbVcu7PSFBl54tltz93AUaOzFL70KZ7GKlnY4XwLK",
  access_token_key: "3247467584-xiMeSeKgCPtHH8A8zy2tLx9ucf7BVBrbueaDYQ8",
  access_token_secret: "q846vWhn1bqQqFncSIMusQpJqtY4OXIprHWrn7qQdF0GD"
});

client.stream('statuses/filter', {track: "JavaScript Job"}, function(stream) {
  console.log('The stream has started :)');
  stream.on('data', function(tweet) {
    console.log("NEW TWEET", tweet.text)
    var newTweet = new Tweet()

    newTweet.created_at = tweet.created_at;
    newTweet.text = tweet.text;
    newTweet.name = tweet.user.name;
    newTweet.screen_name = tweet.user.screen_name;
    newTweet.location = tweet.user.location;

    newTweet.save(function(err, data){
      if(err)
        return res.status(500).json({msg: 'internal server error'});
    });
  });

  stream.on('error', function(error) {
    console.error(error);
  });

  stream.on('end', console.log.bind(console));
});

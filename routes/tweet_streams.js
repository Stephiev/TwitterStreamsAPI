"use strict"

var Twitter = require('twitter');
var Tweet   = require("../models/tweetsM");

// Insert your keys/secrets here
var client = new Twitter ({
  consumer_key:
  consumer_secret:
  access_token_key:
  access_token_secret:
});

client.stream('statuses/filter', {track: "JavaScript Job"}, function(stream) {
  console.log('The stream has started :)');
  stream.on('data', function(tweet) {
    console.log("NEW TWEET", tweet.text)
    var newTweet = new Tweet()

    newTweet.created_at  = tweet.created_at;
    newTweet.text        = tweet.text;
    newTweet.name        = tweet.user.name;
    newTweet.screen_name = tweet.user.screen_name;
    newTweet.location    = tweet.user.location;

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

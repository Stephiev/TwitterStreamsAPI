'use strict';

var TweetsM    = require('../models/tweetsM');
var bodyparser = require('body-parser');

module.exports = function(router){
  router.use(bodyparser.json());

  // Get all the tweets
  router.get('/tweets', function(req, res) {
    TweetsM.find({}, function(err, data){
      if(err){
        console.log(err);
        return res.status(500).json({msg: 'unable to get JavaScript Job tweets'});
      }
      res.json(data);
    });
  });
};

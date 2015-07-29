var express = require('express');
var app = express();
var mongoose = require('mongoose');

var tweetRoutes = express.Router();
require('./routes/tweet_routes')(tweetRoutes);
app.use('/api', tweetRoutes);

mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/StreamedTweets');

require('./routes/tweet_streams');

app.listen(process.env.PORT || 3000, function(){
console.log('Server running on port ' + (process.env.PORT || 3000));
});

var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/ronda');
var User = require('./models/User');
User.remove({}, function(err) { 
   console.log('users collection removed') 
	process.exit(1);
});
/*
User.findOneAndRemove({username: "nicky"},function(err, item){
	User.findOneAndRemove({username: "niccolo"},function(err, item){
	})
})
*/
var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/ronda');
var User = require('./models/User');
User.findOneAndRemove({username: "nicky"},function(err, item){
	User.findOneAndRemove({username: "niccolo"},function(err, item){
		process.exit(1);
	})
})
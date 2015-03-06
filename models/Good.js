var mongoose = require('mongoose');
var GoodSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  body: {
    type: String
  },
  owner : {
    type : mongoose.Schema.Types.ObjectId,
    ref : 'users'
  }
});

GoodSchema.statics.findByOwner = function(owner, callback) {
  this.find({owner: owner._id}, function(err, item) {
    callback(err, item)
  })
}


module.exports = mongoose.model('Good', GoodSchema);
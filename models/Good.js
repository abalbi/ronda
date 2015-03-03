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
module.exports = mongoose.model('Good', GoodSchema);
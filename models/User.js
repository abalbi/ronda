// Load required packages
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var crypto = require('crypto');

// Define our user schema
var UserSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  access_token: {
    type: String
  },
  mail_verification_token: {
    type: String
  },
  mail_verificated: {
    type: Boolean,
    default: false
  },
  password: {
    type: String,
    required: true
  }
});

// Execute before each user.save() call
UserSchema.pre('save', function(callback) {
  var user = this;
  if (!user.isModified('password')) return callback();
  // Password changed so we need to hash it
  bcrypt.genSalt(5, function(err, salt) {
    if (err) return callback(err);
    bcrypt.hash(user.password, salt, null, function(err, hash) {
      if (err) return callback(err);
      user.password = hash;
      callback();
    });
  });
});

UserSchema.methods.setAccessToken = function(callback) {
  var token = crypto.randomBytes(32).toString('base64');
  this.access_token = token
}

UserSchema.methods.setMailVerificationToken = function(callback) {
  var token = crypto.randomBytes(32).toString('base64');
  this.mail_verification_token = token
}

UserSchema.statics.findByToken = function(token, callback) {
  this.findOne({access_token: token}, function(err, user) { 
    callback(err, user)
  })
}
UserSchema.statics.findByMailVerficatonToken = function(token, callback) {
  console.log(token)
  this.findOne({mail_verification_token: token}, function(err, user) { 
    callback(err, user)
  })
}


UserSchema.statics.findByEmail = function(email, callback) {
  this.findOne({email: email}, function(err, user) { 
    callback(err, user)
  })
}


// Export the Mongoose model
module.exports = mongoose.model('User', UserSchema);
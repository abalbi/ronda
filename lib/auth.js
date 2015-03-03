var passport = require('passport')
var BearerStrategy = require('passport-http-bearer').Strategy;
var User = require('../models/User')


passport.use(new BearerStrategy({
  },
  function(token, done) {
    process.nextTick(function () {
      User.findByToken(token, function(err, user) {
        if (err) { return done(err); }
        if (!user) { return done(null, false); }
        return done(null, user);
      })
    });
  }
));
exports.isAuthenticated = passport.authenticate('bearer', { session: false });
exports.checkAccessTokenSession = function (req, res, next) {
  req.query.access_token = req.session.access_token;
  next()
};

exports.getCurrentUser = function (req, res, callback) {
  User.findByToken(req.query.access_token, function(err, user) {
    callback(err, user)
  })
};


exports.checkLogin = function(req,res, callback) {
  User.findByEmail(req.body.email, function(err, user) {
    if(user && user.passport === req.body.passport && user.mail_verificated) {
      callback(null, user)
    } else {
      if(!user) return callback({err: 'UNKNOWUSER', email: req.body.email}, null)
      if(user.passport !== req.body.passport) return callback({err: 'WRONGUSERPASS'}, null)
      if(!user.mail_verificated) return callback({err: 'NOTVERIFICATED'}, null)
    }
  })
}

exports.checkMailVerficatonToken = function(req,res, callback) {
  User.findByMailVerficatonToken(req.params.token, function(err, user) {
    user.mail_verificated  = true
    user.save(function(err) {
      callback(err, user)
    })
  })
}
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
exports.checkLogin = function(req,res, callback) {
  User.findByEmail(req.body.email, function(err, user) {
    if(user.passport === req.body.passport) {
      callback(null, user)
    } else {
      callback({err: 'WRONGUSERPASS'}, null)
    }
  })
}
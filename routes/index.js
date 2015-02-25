var express = require('express');
var router = express.Router();
var passport = require('passport')
var BearerStrategy = require('passport-http-bearer').Strategy;
var session = require('express-session')
var User = require('../models/User')


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

passport.use(new BearerStrategy({
  },
  function(token, done) {
    // asynchronous validation, for effect...
    process.nextTick(function () {
      
      // Find the user by token.  If there is no user with the given token, set
      // the user to `false` to indicate failure.  Otherwise, return the
      // authenticated `user`.  Note that in a production-ready application, one
      // would want to validate the token for authenticity.
      User.findByToken(token, function(err, user) {
        if (err) { return done(err); }
        if (!user) { return done(null, false); }
        return done(null, user);
      })
    });
  }
));

router.get('/me', passport.authenticate('bearer', { session: false }), function(req, res){
  res.json({_id: req.user._id, username: req.user.username, email: req.user.email });
});

router.post('/login', function(req, res) {
  User.findByEmail(req.body.email, function(err, user) {
    if(user.passport === req.body.passport) {
      user.setAccessToken(function(token){
		  res.json({ access_token: token});
      })
    }
  })    
})



router.get('/foo', function (req, res, next) {
  res.send('you viewed this page ' + req.session.views['/foo'] + ' times')
})


router.get('/bar', function (req, res, next) {
  res.send('you viewed this page ' + req.session.views['/bar'] + ' times')
})

module.exports = router;

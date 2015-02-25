var express = require('express');
var router = express.Router();
var auth = require('../lib/auth')




/* GET home page. */

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/me', auth.isAuthenticated, function(req, res){
  res.json({_id: req.user._id, username: req.user.username, email: req.user.email });
});

router.post('/login', function(req, res) {
  auth.checkLogin(req, res, function(err, user){
    user.setAccessToken(function(token){
      req.session.access_token = token
	  res.json({ access_token: token})
    })
  })
})

router.get('/foo', function (req, res, next) {
  res.send('you viewed this page ' + req.session.views['/foo'] + ' times')
})

router.get('/bar', function (req, res, next) {
  res.send('you viewed this page ' + req.session.views['/bar'] + ' times')
})

module.exports = router;

var express = require('express');
var router = express.Router()
var auth = require('../lib/auth')

router.get('/me', auth.isAuthenticated, function(req, res){
  res.json({_id: req.user._id, username: req.user.username, email: req.user.email });
});

router.post('/login', function(req, res) {
  auth.checkLogin(req, res, function(err, user){
    if(user) {
      token = user.setAccessToken()
      user.save(function(err, user){
        req.session.access_token = user.access_token
        res.json({ access_token: user.access_token})
      })
    } else {
      console.log(err)
      res.status(401).json(err)
    }
  })
})

router.get('/mail_verification/:token', function(req, res){
  console.log('checkMailVerficatonToken')
  auth.checkMailVerficatonToken(req, res, function(err, user){
    console.log(err)
    res.status(200).json(user)
  })
});





module.exports = router;
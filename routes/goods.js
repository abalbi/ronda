var express = require('express');
var router = express.Router();
var User = require('../models/User')
var Good = require('../models/Good')
var auth = require('../lib/auth');
router.post('/', auth.isAuthenticated, function(req, res, next) {
  auth.getCurrentUser(req, res, function(err, user){
    console.log(user)
    var good = new Good({
      title: req.body.title,
      body: req.body.body,
      owner: user._id
    })
    good.save(function(err){
      if (err){
        console.log(err)
        res.status(422).json(err)
      } else {
    	  res.status(200).json(good)	
    	}
    })
  })
});

module.exports = router;

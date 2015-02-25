var express = require('express');
var router = express.Router();
var User = require('../models/User');

/* GET users listing. */
router.get('/:id', function(req, res, next) {
  User.findById(req.params.id, function(err, item) {
  	if(!item) {
  	  res.status(404).json(item)
  	} else {
	  res.status(200).json(item)	
  	}
  });
});

router.get('/', function(req, res, next) {
  User.find({}, function(err, items) {
    res.status(200).json(items)	
  });
});

router.delete('/:id', function(req, res, next) {
  User.findById(req.params.id, function(err, item) {
  	item.remove(function(err) {
	  if (err){
	    res.status(404).json(err)
	  } else {
	    res.status(204).json({msg:'Deleted!'})
	  }
  	})
  });
});

router.put('/:id', function(req, res, next) {
  User.findById(req.params.id, function(err, item) {
	if(req.body.username) item.username = req.body.username
  	if(req.body.password) item.password = req.body.password
  	if(req.body.email) item.email = req.body.email
	item.save(function(err){
	  if (err){
	    res.status(422).json(err)
	  } else {
	    res.status(200).json(item)	
	  }
	})
  })
});

router.post('/', function(req, res, next) {
  var user = new User({
  	username: req.body.username,
    password: req.body.password,
    access_token: req.body.access_token,
  	email: req.body.email
  })
  user.save(function(err){
  	if (err){
  		res.status(422).json(err)
  	} else {
  	  res.status(200).json(user)	
  	}
  })
});

module.exports = router;

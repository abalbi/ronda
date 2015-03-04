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

router.get('/:id', auth.isAuthenticated, function(req, res, next) {
  Good.findById(req.params.id, function(err, item) {
    if(!item) {
      res.status(404).json(item)
    } else {
    res.status(200).json(item)  
    }
  });
});

router.get('/', auth.isAuthenticated, function(req, res, next) {
  Good.find({}, function(err, items) {
    res.status(200).json(items) 
  });
});

router.get('/owner/:owner', auth.isAuthenticated, function(req, res, next) {
  User.findByUniqueField(req.params.owner, function(err, owner) {
    Good.findByOwner(owner, function(err, items) {
      if (err){
        res.status(422).json(err)
      } else {
        res.status(200).json(items)  
      }
    })
  })
});


router.put('/:id', auth.isAuthenticated, function(req, res, next) {
  Good.findById(req.params.id, function(err, item) {
    if(req.body.title) item.title = req.body.title
    if(req.body.body) item.body = req.body.body
    item.save(function(err){
      if (err){
        res.status(422).json(err)
      } else {
        res.status(200).json(item)  
      }
    })
  })
});

router.delete('/:id', auth.isAuthenticated, function(req, res, next) {
  Good.findById(req.params.id, function(err, item) {
    item.remove(function(err) {
    if (err){
      res.status(404).json(err)
    } else {
      res.status(204).json({msg:'Deleted!'})
    }
    })
  });
});


module.exports = router;

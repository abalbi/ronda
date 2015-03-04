var express = require('express');
var router = express.Router()
var User = require('../models/User')
var mail = require('../lib/mail')
var auth = require('../lib/auth')
var crypto = require('crypto')

/* GET users listing. */
router.get('/:id', auth.isAuthenticated, function(req, res, next) {
  User.findById(req.params.id, function(err, item) {
    if(!item) {
      res.status(404).json(item)
    } else {
    res.status(200).json(item)  
    }
  });
});

router.get('/', auth.isAuthenticated, function(req, res, next) {
  User.find({}, function(err, items) {
    res.status(200).json(items) 
  });
});

router.delete('/:id', auth.isAuthenticated, function(req, res, next) {
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

router.put('/:id', auth.isAuthenticated, function(req, res, next) {
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

router.post('/', auth.isAuthenticated, function(req, res, next) {
  var user = new User({
    username: req.body.username,
    password: req.body.password,
    access_token: req.body.access_token,
    email: req.body.email,
    mail_verification_token: crypto.randomBytes(32).toString('hex')
  })
  user.save(function(err){
    if (err){
      console.log(err)
      res.status(422).json(err)
    } else {
      mail.send({to: [{email: 'alejandrobalbi@gmail.com', name: 'Alejandro Balbi'}]
        , from_email: 'alejandrobalbi@gmail.com'
        , subject: "Hey, what's up?"
        , text: "Hello, I sent this message using mandrill."
      }, function(error, response) {
        if (error) {
          console.log( JSON.stringify(error) );
        } else {
          console.log(response);
  	      res.status(200).json(user)	
        }
      });
  	}
  })
});

function sendVerficationMail(user) {

}
module.exports = router;

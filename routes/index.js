var express = require('express');
var router = express.Router();
var auth = require('../lib/auth')




/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});





router.get('/foo', function (req, res, next) {
  res.send('you viewed this page ' + req.session.views['/foo'] + ' times')
})

router.get('/bar', function (req, res, next) {
  res.send('you viewed this page ' + req.session.views['/bar'] + ' times')
})

module.exports = router;

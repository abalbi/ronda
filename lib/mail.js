var mandrill = require('node-mandrill')('mAfR_tIFJKebcjWFUlPomA');
var jade = require('jade');
var fs = require('fs');

exports.send = function(arg, callback) {
  fs.readFile(__dirname + '/../views/email/verification.jade', 'utf8', function (err, data) {
    if (err) throw err;
    var fn = jade.compile(data);
    arg.text = fn({
      maintainer: {
        name: 'Forbes Lindesay',
        twitter: '@ForbesLindesay',
        blog: 'forbeslindesay.co.uk'
      }
    });
    if(process.env.NODE_ENV != 'development') {
      mandrill('/messages/send', {
        message: arg
      }, function(error, response)
      {
          //uh oh, there was an error
          if (error) console.log( JSON.stringify(error) );

          //everything's good, lets see what mandrill said
          else callback();
      });
    } else {
      console.log(arg)
      callback()
    }
  });
}
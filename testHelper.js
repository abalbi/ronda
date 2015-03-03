var superagent = require('superagent')
var baseurl = 'http://192.168.10.10:3000'
var adminUser = null
exports.baseurl = baseurl
exports.getLoginAdminAgent = function(callback) {
  var agent = superagent.agent();
  agent.post( baseurl + '/login')
  .send({
    password: 'p4ssw0rd',
    email: 'admin@ronda.org'
  }).end(function(e, res){
    agent.saveCookies(res)
    adminUser = res.body
    return callback(agent)
  })
}


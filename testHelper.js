var superagent = require('superagent')
var baseurl = 'http://192.168.10.10:3000'
var apiurl = baseurl + '/api'
var adminUser = null
exports.baseurl = baseurl
exports.apiurl = apiurl
exports.getLoginAdminAgent = function(callback) {
  var agent = superagent.agent();
  agent.post( apiurl + '/login')
  .send({
    password: 'p4ssw0rd',
    email: 'admin@ronda.org'
  }).end(function(e, res) {
    agent.saveCookies(res)
    agent.get( apiurl + '/me')
    .send({})
    .end(function(e, res) {
      adminUser = res.body
      return callback(agent)
    })
  })
}

exports.getAdminUser = function() {
  return adminUser
}

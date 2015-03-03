var superagent = require('superagent')
var should = require('should')
var helper = require('../testHelper')
var id
var token
var agent
describe('users', function() {
  describe('auth',function(){
    it('should get access_token from login', function(done){
      helper.getLoginAdminAgent(function(adminagent) {
        agent = adminagent
        agent.post( helper.baseurl + '/users')
        .send({
          username: 'tokentester',
          password: 'p4ssw0rd',
          email: 'tokentester@mail.com'
        })
        .end(function(e,res){
          agent = superagent.agent();
          agent.get( helper.baseurl + '/mail_verification/' + res.body.mail_verification_token)
            .send( {} )
            .end(function(e, res){
              agent.post( helper.baseurl + '/login')
                .send( {
                  password: 'p4ssw0rd',
                  email: 'tokentester@mail.com'
                } )
                .end(function(e, res){
                  (e === null).should.be.ok
                  agent.saveCookies(res)
                  token = res.body.access_token
                  res.status.should.equal(200)
                  res.body.should.be.type('object')
                  res.body.access_token.length.should.equal(44)
                  done()
                })
            })
        })    
      })
    })
    it('should check the token to access me page', function(done){
      agent.get( helper.baseurl + '/me')
        .send({})
        .end(function(e, res){
          (e === null).should.be.ok
          res.status.should.equal(200)
          res.body.should.be.type('object')
          res.body._id.length.should.equal(24)
          res.body.username.should.equal('tokentester')
          res.body.email.should.equal('tokentester@mail.com')
          done()
        })
    })
  })
  describe('CRUP',function(){
    it('should POST 200', function(done){
      helper.getLoginAdminAgent(function(adminagent) {
        agent = adminagent
        agent.post( helper.baseurl + '/users')
          .send({
            username: 'nicky',
            password: 'p4ssw0rd',
            email: 'nicky@mail.com'
          })
          .end(function(e,res){
            res.status.should.equal(200)
            id = res.body._id
            id.length.should.equal(24)
            res.body.username.should.equal('nicky')
            res.body.email.should.equal('nicky@mail.com')
            done()
          })    
      })    
    })
    it('should get 422 on non-unique mail', function(done){
      agent.post( helper.baseurl + '/users')
        .send({
          username: 'nicky1',
          password: 'p4ssw0rd',
          email: 'nicky@mail.com'
        })
        .end(function(e,res){
          res.status.should.equal(422)
          done()
       })    
    })
    it('should get 422 on non-unique username', function(done){
      agent.post( helper.baseurl + '/users')
        .send({
          username: 'nicky',
          password: 'p4ssw0rd',
          email: 'nicky2@mail.com'
        })
        .end(function(e,res){
          res.status.should.equal(422)
          done()
       })    
    })
    it('get by id', function(done){
      agent.get( helper.baseurl + '/users/'+id)
        .end(function(e, res){
          (e === null).should.be.ok
          res.status.should.equal(200)
          res.body.should.be.type('object')
          res.body._id.length.should.equal(24)
          res.body._id.should.equal(id)
          res.body.username.should.equal('nicky')
          res.body.email.should.equal('nicky@mail.com')
          res.body.mail_verification_token.length.should.equal(64)
          res.body.mail_verificated.should.be.not.ok
          done()
        })
    })
    it('get all', function(done){
      agent.get( helper.baseurl + '/users')
        .end(function(e, res){
          (e === null).should.be.ok
          res.body.length.should.be.above(1);
          done()
        })
    })
    it('updates', function(done){
      agent.put( helper.baseurl + '/users/'+id)
        .send({ username: 'niccolo'})
        .end(function(e, res){
          (e === null).should.be.ok
          res.body.should.be.type('object')
          res.body.username.should.equal('niccolo')        
          done()
        })
    })
    it('checks an updated', function(done){
      agent.get( helper.baseurl + '/users/'+id)
        .end(function(e, res){
          (e === null).should.be.ok
          res.body.should.be.type('object')
          res.body._id.length.should.equal(24)
          res.body._id.should.equal(id)
          res.body.username.should.equal('niccolo')        
          done()
        })
    })
    it('removes', function(done){
      agent.del( helper.baseurl + '/users/'+id)
        .end(function(e, res){
          (e === null).should.be.ok
          res.status.should.equal(204)
          res.body.should.be.type('object')
          done()
        })
    })
    it('checks an updated', function(done){
      agent.get( helper.baseurl + '/users/'+id)
        .end(function(e, res){
          (e === null).should.be.ok
          res.status.should.equal(404)
          done()
        })
    })
  })
})

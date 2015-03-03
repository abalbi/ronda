var superagent = require('superagent')
var should = require('should')
var helper = require('../testHelper')
var id
var token
var agent
describe('good', function() {
  describe('CRUP',function(){
    it('should POST 200', function(done){
      helper.getLoginAdminAgent(function(adminagent) {
        agent = adminagent
        agent.post( helper.baseurl + '/goods')
          .send({ title: "Elefantitos"
            , body: "De tela. Lindos. Gorditos."
          })
          .end(function(e,res){
            res.status.should.equal(200)
            id = res.body._id
            id.length.should.equal(24)
            res.body.title.should.equal('Elefantitos')
            res.body.body.should.equal('De tela. Lindos. Gorditos.')
            res.body.owner.length.should.equal(24)
            done()
          })    
      })    
    })
    
/*
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
*/
  })
})

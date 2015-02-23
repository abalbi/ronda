var superagent = require('superagent')
var should = require('should')
var baseurl = 'http://192.168.10.10:3000';


describe('express rest api server', function(){
  var id
  describe('users', function() {
    it('should POST 200', function(done){
      superagent.post( baseurl + '/users')
        .send({
          username: 'nicky',
          password: 'p4ssw0rd',
          email: 'nicky@mail.com'
        })
        .end(function(e,res){
          console.log(res.body)
          res.status.should.equal(200)
          id = res.body._id
          id.length.should.equal(24)
          res.body.username.should.equal('nicky')
          res.body.email.should.equal('nicky@mail.com')
          done()
       })    
    })
    it('should get 422 on non-unique mail', function(done){
      superagent.post( baseurl + '/users')
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
      superagent.post( baseurl + '/users')
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
      superagent.get( baseurl + '/users/'+id)
        .end(function(e, res){
          (e === null).should.be.ok
          res.status.should.equal(200)
          res.body.should.be.type('object')
          res.body._id.length.should.equal(24)
          res.body._id.should.equal(id)
          res.body.username.should.equal('nicky')
          res.body.email.should.equal('nicky@mail.com')
          done()
        })
    })
    it('get all', function(done){
      superagent.get( baseurl + '/users')
        .end(function(e, res){
          (e === null).should.be.ok
          res.body.length.should.be.above(0);
          done()
        })
    })
    it('updates', function(done){
      superagent.put( baseurl + '/users/'+id)
        .send({ username: 'niccolo'})
        .end(function(e, res){
          (e === null).should.be.ok
          res.body.should.be.type('object')
          res.body.username.should.equal('niccolo')        
          done()
        })
    })
    it('checks an updated', function(done){
      superagent.get( baseurl + '/users/'+id)
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
      superagent.del( baseurl + '/users/'+id)
        .end(function(e, res){
          (e === null).should.be.ok
          res.status.should.equal(204)
          res.body.should.be.type('object')
          done()
        })
    })
    it('checks an updated', function(done){
      superagent.get( baseurl + '/users/'+id)
        .end(function(e, res){
          (e === null).should.be.ok
          res.status.should.equal(404)
          done()
        })
    })
  })
})
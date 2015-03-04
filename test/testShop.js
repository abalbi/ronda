var superagent = require('superagent')
var should = require('should')
var helper = require('../testHelper')
var id
var token
var agent
var user
describe('shop', function() {
  xdescribe('CRUP',function(){
    it('should POST 200', function(done){
      helper.getLoginAdminAgent(function(adminagent) {
        agent = adminagent
        user = helper.getAdminUser()
        agent.post( helper.baseurl + '/shops' )
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
    it('get by id', function(done){
      agent.get( helper.baseurl + '/shops/'+id)
        .end(function(e, res){
          (e === null).should.be.ok
          res.status.should.equal(200)
          res.body.should.be.type('object')
          res.body._id.length.should.equal(24)
          res.body._id.should.equal(id)
          res.body.title.should.equal('Elefantitos')
          res.body.body.should.equal('De tela. Lindos. Gorditos.')
          done()
        })
    })
    it('get all', function(done){
      agent.get( helper.baseurl + '/shops')
        .end(function(e, res){
          (e === null).should.be.ok
          res.body.length.should.be.above(1);
          done()
        })
    })
    it('should get all from owner username', function(done) {
      agent.get( helper.baseurl + '/shops/owner/' + user.username)
      .end(function(e, res){
        (e === null).should.be.ok
        res.body.length.should.be.above(0);
        done()
      })
    })
    it('should get all from owner id', function(done) {
      agent.get( helper.baseurl + '/shops/owner/' + user._id)
      .end(function(e, res){
        (e === null).should.be.ok
        res.body.length.should.be.above(0);
        done()
      })
    })

    it('updates', function(done){
      agent.put( helper.baseurl + '/shops/'+id)
        .send({ title: 'Elefantitos de tela'})
        .end(function(e, res){
          (e === null).should.be.ok
          res.body.should.be.type('object')
          res.body.title.should.equal('Elefantitos de tela')        
          done()
        })
    })
    it('checks an updated', function(done){
      agent.get( helper.baseurl + '/shops/'+id)
        .end(function(e, res){
          (e === null).should.be.ok
          res.body.should.be.type('object')
          res.body._id.length.should.equal(24)
          res.body._id.should.equal(id)
          res.body.title.should.equal('Elefantitos de tela')        
          done()
        })
    })
    it('removes', function(done){
      agent.del( helper.baseurl + '/shops/'+id)
        .end(function(e, res){
          (e === null).should.be.ok
          res.status.should.equal(204)
          res.body.should.be.type('object')
          done()
        })
    })
    it('checks deleted', function(done){
      agent.get( helper.baseurl + '/shops/'+id)
        .end(function(e, res){
          (e === null).should.be.ok
          res.status.should.equal(404)
          done()
        })
    })
/*
*/
  })
})


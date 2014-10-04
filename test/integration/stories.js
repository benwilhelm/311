process.env.NODE_ENV = 'test';
var app = require('../../server')
  , assert = require('assert')
  , async = require('async')
  , fixtures = require('pow-mongoose-fixtures')
  , mongoose = require('mongoose')
  , passportStub = require('passport-stub')
  , request = require('supertest')
  , should = require('should')
  , testHelpers = require('../_test-helpers')
  , User = mongoose.model('User')
  ;

passportStub.install(app);
describe("Integration Tests - Stories", function(){
    var suite = this;
    
    before(function(done){
        async.series([
            function(cb){ testHelpers.emptyCollections(cb); },
            function(cb){ testHelpers.loadFixtures(['users'], cb); },
            function(cb){
                User.findOne({email:'admin@test.com'}, function(err, user){
                    suite.admin = user;
                    cb();
                })
            }
        ],done);
    })
    
    describe("GET /stories", function(){
        it("should require valid user", function(done){
            request(app)
            .get('/stories')
            .expect(302)
            .end(function(err, resp){
                resp.headers.location.should.eql('/login');
                done();
            });
        });
        
        it("should serve requested page if logged in", function(done){
            passportStub.login(suite.admin);
            request(app)
            .get('/stories')
            .expect(200)
            .end(done);
        })
        
        it("should list all stories, newest first");
    });
    
    describe("POST /stories", function(){
        it("should not require valid user", function(done){
            passportStub.logout();
            var data = {summary: 'lorem ipsum'};
            request(app)
            .post('/stories')
            .send(data)
            .expect(302)
            .end(function(err, resp){
                resp.headers.location.should.match(/\/stories\/[\w\d]{24}/);
                done();
            })
        });
        
        it("should create new story with accompanying tickets");
        it("should fail if no summary provided");
    });
    
    describe("DELETE /stories", function(){
        it("should require valid user");
        it("should delete story and associated tickets");
    });
    
    describe("GET /stories/unapproved", function(){
        it("should require valid user");
        it("should list unapproved stories, newest first");
    });
    
    describe("POST /stories/unapprove", function(){
        it("should set approvedForPublic to false");
    });
    
    describe("GET /stories/approved", function(){
        it("should require valid user");
        it("should list approved stories, newest first");
    });
    
    describe("POST /stories/approve", function(){
        it("should set approvedForPublic to true");
    });
    
    describe("GET /stories/new", function(){
        it("should display story creation form")
    });
    
    describe("GET /stories/random", function(){
        it("should display random story with 'featured' set to true");
    });
    
    describe("GET /stories/example", function(){
        it("should display story with 'isExample' set to true");
    });
    
})
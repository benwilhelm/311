process.env.NODE_ENV = 'test';
require('../../models/Story');
var app = require('../../server')
  , assert = require('assert')
  , async = require('async')
  , fixtures = require('pow-mongoose-fixtures')
  , mongoose = require('mongoose')
  , should = require('should')
  , Story = mongoose.model('Story')
  , testHelpers = require('../_test-helpers')
  ;

describe("Unit Tests - Story", function(){
    
    before(function(done){
        async.series([
            function(cb){ testHelpers.emptyCollections(cb); },
            function(cb){ testHelpers.loadFixtures(['stories'], cb) }
        ], done);
    })
    
    it("Should save properly", function(done){
        var story = new Story({summary: "This is a story"});
        story.save(function(err, story){
            assert.equal(null, err);
            story._id.toString().should.match(/[\w\d]{24}/);
            done();
        });
    });
    
    it("Should require a summary", function(done){
        var story = new Story({});
        story.save(function(err, story){
            err.should.exist;
            err.errors.summary.message.should.eql("Please provide a summary of your issue");
            done();
        });
    });
    
    it("Should set approvedForPublic to true if featured is set to true", function(done){
        var story = new Story({
            summary: "Lorem Ipsum",
            approvedForPublic: false,
            featured: true
        });
        
        story.save(function(err, story){
            should.not.exist(err)
            story._id.toString().should.match(/[\w\d]{24}/);
            story.approvedForPublic.should.eql(true);
            done();
        })
    });
})
process.env.NODE_ENV = 'test';
var assert = require('assert')
  , fixtures = require('pow-mongoose-fixtures')
  , request = require('supertest')
  , should = require('should')
  ;

describe("Integration Tests - Stories", function(){
    
    describe("GET /stories", function(){
        it("should require valid user");
        it("should list all stories, newest first");
    });
    
    describe("POST /stories", function(){
        it("should not require valid user");
        it("should create new story with accompanying tickets");
        it("should fail without summary");
        it("should redirect to story upon completion");
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
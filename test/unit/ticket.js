process.env.NODE_ENV = 'test';
require('../../models/Ticket')
var app = require('../../server')
  , assert = require('assert')
  , fixtures = require('pow-mongoose-fixtures')
  , mongoose = require('mongoose')
  , should = require('should')
  , Ticket = mongoose.model('Ticket')
  ;

describe("Unit Tests - Ticket", function(){
    it("Should save properly", function(done){
        var ticket = new Ticket({description: 'Lorem Ipsum'});
        ticket.save(function(err, ticket){
            should.not.exist(err);
            ticket._id.toString().should.match(/[\w\d]{24}/);
            done();
        });
    });
    
    it("Should require a description", function(done){
        var ticket = new Ticket();
        ticket.save(function(err, ticket){
            should.not.exist(ticket);
            err.errors.description.message.should.eql("Please describe this ticket");
            done();
        });
    });
})
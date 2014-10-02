process.env.NODE_ENV = 'test';
var Story = require('../../models/Story')
  , assert = require('assert')
  , fixtures = require('pow-mongoose-fixtures')
  , should = require('should')
  ;

describe("Unit Tests - Story", function(){
    it("Should require a summary");
    it("Should set approvedForPublic to true if featured is set to true");
})
var async = require('async')
  , express = require('express')
  , mongoose = require('mongoose')
  , router = express.Router()
  ;

router.get('/', function(req, res){
  res.render("index.html", {pageTitle: "Three-one-runaround..."});
});

router.get('/resources', function(req, res){
  res.render("resources.html", {pageTitle: "311 Resident Resources"});
});

module.exports = router;
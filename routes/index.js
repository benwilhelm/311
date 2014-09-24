var async = require('async')
  , authrizr = require('authrizr')
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


router.get('/login', function(req, res){
  res.render('login.html', {pageTitle: "Sign in"});
});

router.post('/login', authrizr.authStrategies.local.authenticate, function(req, res){
  res.redirect('/stories/unapproved');
});


router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/login');
});

module.exports = router;
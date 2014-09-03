var express = require('express')
  , router = express.Router()
  ;

router.get('/stories/new', function(req, res){
  res.render('stories/new');
});

router.post('/stories', function(req, res){
  console.log(req);
  res.redirect('/stories/new');
});

module.exports = router;
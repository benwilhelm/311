var async = require('async')
  , express = require('express')
  , mongoose = require('mongoose')
  , router = express.Router()
  
  , Story = mongoose.model('Story')
  , Ticket = mongoose.model('Ticket')
  ;


/**
 * Middleware to fetch story for any route that includes a story_id param
 */
var getRequestedStory = function(req, res, next){
  if (req.params.story_id) {
    var id = req.params.story_id;
    Story.findById(id, function(err, story){
      story.populate('_tickets', function(err, story){
        if (err) return next(err);
        if (!story) return next(new Error("Could not load story " + id));
        req.story = story;
        next();
      });
    })
  } else {
    next();
  }
};



/**
 * GET /stories/new
 */
router.get('/stories/new', function(req, res){
  res.render('stories/new');
});

router.get('/stories/random', function(req, res){
  Story.find({approvedForRandom:true}, function(err, stories){
    var len = stories.length;
    var idx = Math.floor( Math.random() * len );
    var story = stories[idx];
    story.populate('_tickets', function(err, story){
      res.render('stories/show', {
        pageTitle: "Random User-Submitted Story",
        story: stories[idx]
      });
    });
  });
});

router.get('/stories/example', function(req, res){
  Story.findOne({isExample:true}).populate('_tickets').exec(function(err, story){
    res.render('stories/show', {
      pageTitle: "The Story That Prompted this Site",
      story: story
    });
  });
});

/**
 * GET /stories/:story_id
 */
router.get('/stories/:story_id', getRequestedStory, function(req, res){
  res.render('stories/show', {
    pageTitle: "User Story of Woe",
    story: req.story
  });
})


/**
 * POST /stories
 */
router.post('/stories', function(req, res){
  var summary = req.body.summary;
  
  var tickets = req.body.tickets || [];
  async.map(tickets, function(ticket, cb){
    var tkt = new Ticket(ticket);
    tkt.save(function(err, tkt){
      cb(err, tkt._id);
    });
  }, function(err, ticketIds){
    if (err) {
      console.error(err);
      res.send(500);
    } else {
      var story = new Story({
        "summary": summary,
        "_tickets": ticketIds
      });
      story.save(function(err, story){
        if (err) {
          console.error(err);
          res.send(500);
        } else {
          res.redirect('/stories/' + story._id);
        }
      })
    }
  });
  
});


module.exports = router;
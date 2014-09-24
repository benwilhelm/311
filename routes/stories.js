var async = require('async')
  , authrizr = require('authrizr')
  ,   ensureAuthenticated = authrizr.authStrategies.local.ensureAuthenticated
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
  if (req.params.story_id || req.body.story_id) {
    var id = req.params.story_id || req.body.story_id;
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
router.use(getRequestedStory);


/**
 * GET /stories
 * Only authenticated user (admin) can access
 */
router.route('/stories')
.get(ensureAuthenticated, function(req, res){
  res.send("GET stories...");
})
.delete(ensureAuthenticated, function(req, res){
  req.story.remove(function(err, rslt){
    if (err) {
      console.error(err);
      res.status(500).end();
    }
    
    res.redirect('/stories/unapproved');
  })
})
.post(function(req, res){
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


router.get('/stories/unapproved', ensureAuthenticated, function(req, res){
  Story.find({approvedForPublic: false}, function(err, stories){
    if (err) {
      console.log(err);
      res.send(500);
    }
    
    res.render('stories/list.html', {
      pageTitle: 'Unapproved Stories',
      stories: stories
    });
  })
});

router.get('/stories/approved', ensureAuthenticated, function(req, res){
  Story.find({approvedForPublic: true}, function(err, stories){
    if (err) {
      console.log(err);
      res.send(500);
    }
    
    res.render('stories/list.html', {
      pageTitle: 'Stories Approved for Public Viewing',
      stories: stories
    });
  })
});


router.post('/stories/approve', ensureAuthenticated, function(req, res){
  req.story.approvedForPublic = true;
  req.story.save(function(err, rslt){
    if (err) {
      console.error(err)
      res.status(500).end();
    }
    
    res.redirect('/stories/unapproved');
  })
})

router.post('/stories/unapprove', ensureAuthenticated, function(req, res){
  req.story.approvedForPublic = false;
  req.story.featured = false;
  req.story.save(function(err, rslt){
    if (err) {
      console.error(err)
      res.status(500).end();
    }
    
    res.redirect('/stories/unapproved');
  })
})



/**
 * GET /stories/new
 */
router.get('/stories/new', function(req, res){
  res.render('stories/new', {pageTitle: 'Tell us your tale'});
});



router.get('/stories/random', function(req, res){
  Story.find({featured:true}, function(err, stories){
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
      pageTitle: "True Story...",
      story: story
    });
  });
});

/**
 * GET /stories/:story_id
 */
router.get('/stories/:story_id', function(req, res){
  res.render('stories/show', {
    pageTitle: "True Story...",
    story: req.story
  });
})

module.exports = router;

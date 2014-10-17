var express = require('express')
  , app = express()
  , authrizr = require('authrizr')
  , passport = authrizr.authStrategies.passport
  , bodyParser = require('body-parser')
  , cookeParser = require('cookie-parser')
  , hbs = require('hbs')
  , hbsHelpers = require('./lib/hbs-helpers.js')
  , helperMiddleware = require('./middleware/helpers.js')
  , methodOverride = require('method-override')
  , mdblurb = require('mdblurb')
  , mongoose = require('mongoose')
  , morgan = require('morgan')
  , session = require('express-session')
  ;

require('./models/Story');
require('./models/Ticket');

hbsHelpers.register(hbs);

app.set('appRoot', __dirname);
app.set('env', process.env.NODE_ENV || 'development');
app.set('view engine', 'html') ;
app.engine('html', hbs.__express) ;

app.use(methodOverride("_method"));
app.use(express.static('./public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(session({
  secret: process.env.SESSION_SECRET || 'foobar',
  saveUninitialized: true,
  resave: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(helperMiddleware);

var mongo_url = "mongodb://localhost/311_" + app.get('env');

switch (app.get('env')) {
  case 'development':
    app.use(morgan('dev'));
    break;
  case 'test':
    process.env.PORT = 3001;
    break;
  case 'production':
    var mongo_url = process.env.MONGOLAB_URI;
    break;
}


mongoose.connect(mongo_url);
mdblurb.registerApp(app, {
  connectionString: mongo_url,
  auth: function(req, res, next) {
    req.canEditBlurb = req.isAuthenticated();
    next();
  }
})

app.use(require('./routes/index'));
app.use(require('./routes/stories'));



var port = process.env.PORT || 3000 ;
app.listen(port) ;

console.log('\nApplication listening on port ' + port);
module.exports = app;

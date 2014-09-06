var express = require('express')
  , app = express()
  , bodyParser = require('body-parser')
  , cookeParser = require('cookie-parser')
  , hbs = require('hbs')
  , hbsHelpers = require('./lib/hbs-helpers.js')
  , mongoose = require('mongoose')
  , morgan = require('morgan')
  ;

require('./models/Story');
require('./models/Ticket');

hbsHelpers.register(hbs);

app.set('appRoot', __dirname);
app.set('env', process.env.NODE_ENV || 'development');
app.set('view engine', 'html') ;
app.engine('html', hbs.__express) ;

app.use(express.static('./public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

switch (app.get('env')) {
  case 'development':
    app.use(morgan('dev'));
    break;
  case 'test':
    process.env.PORT = 3000;
    break;
  case 'production':
    var mongo_url = process.env.DATABASE_URL;
    break;
  
  default:
    var mongo_url = "mongodb://localhost/311_development";
    break;
}


mongoose.connect(mongo_url);

app.get("/", function(req, res){
  res.render("index.html");
});

app.use(require('./routes/stories'));



var port = process.env.PORT || 3000 ;
app.listen(port) ;

console.log('\nApplication listening on port ' + port);

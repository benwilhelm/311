var express = require('express')
  , app = express()
  , bodyParser = require('body-parser')
  , cookeParser = require('cookie-parser')
  , hbs = require('hbs')
  , stories = require('./routes/stories')
  ;


app.set('appRoot', __dirname);
app.set('view engine', 'html') ;
app.engine('html', hbs.__express) ;

app.use(express.static('./public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get("/", function(req, res){
  res.render("index.html");
});

app.use(require('./routes/stories'));

if (app.get('env') === 'test') {
  process.env.PORT = 3001 ;
}

var port = process.env.PORT || 3000 ;
app.listen(port) ;

console.log('\nApplication listening on port ' + port);

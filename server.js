var express = require('express')
  , app = express()
  , bodyParser = require('body-parser')
  , cookeParser 
  , hbs = require('hbs')
  , stories = require('./routes/stories')
  ;


app.set('appRoot', __dirname);
app.set('view engine', 'html') ;
app.engine('html', hbs.__express) ;

app.use(express.static('./public'));

app.get("/", function(req, res){
  res.render("index.html");
});

app.use(require('./routes/stories'));

if (app.get('env') === 'test') {
  process.env.PORT = 3001 ;
}

app.listen(process.env.PORT || 3000) ;

process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var MongoClient = require('mongodb').MongoClient
  , db_path = (process.env.NODE_ENV === 'production') ? process.env.MONGOLAB_URI : "mongodb://localhost/311_" + process.env.NODE_ENV
  ;

exports.up = function(next){
  MongoClient.connect(db_path, function(err, db){
    db.collection('tickets').update({}, {$set: { "date_opened": null}, $rename: {"date": "date_closed"}}, { multi: true}, function(err, rslt){
      next();
    })
  })
};

exports.down = function(next){
  MongoClient.connect(db_path, function(err, db){
    db.collection('tickets').update({}, { $rename: {"date_closed": "date"} }, { multi: true}, function(err, rslt){
      if (err) throw err;
      db.collection('tickets').update({}, { $unset: {"date_opened": true} }, function(err, rslt){
        if (err) throw err;
        next();
      })
    })
  });
};

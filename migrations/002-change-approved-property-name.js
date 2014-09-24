/**
 * Changing the property 'approvedForRandom' on the stories collection
 * to the more generic 'approvedForPublic'
 */

process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var MongoClient = require('mongodb').MongoClient
  , db_path = (process.env.NODE_ENV === 'production') ? process.env.MONGOLAB_URI : "mongodb://localhost/311_" + process.env.NODE_ENV
  ;

exports.up = function(next){
  MongoClient.connect(db_path, function(err, db){
    db.collection('stories').update({}, {$set: {'featured': false}}, {multi: true}, function(err, rslt){
      db.collection('stories').update({'approvedForRandom':true}, {$set: {'featured':true}}, {multi:true},  function(err, rslt){
        db.collection('stories').update({}, {$rename: {"approvedForRandom": "approvedForPublic"}}, { multi: true}, function(err, rslt){
          next();
        })
      })
    })
  })
};

exports.down = function(next){
  MongoClient.connect(db_path, function(err, db){
    db.collection('stories').update({}, {$unset: {'featured': true}, $rename: {"approvedForPublic": "approvedForRandom"}}, { multi: true}, function(err, rslt){
      next();
    })
  });
};

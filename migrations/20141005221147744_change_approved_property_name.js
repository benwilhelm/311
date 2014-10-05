process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var MongoClient = require('mongodb').MongoClient
  , db_path = (process.env.NODE_ENV === 'production') ? process.env.MONGOLAB_URI : "mongodb://localhost/311_" + process.env.NODE_ENV
  ;


module.exports = {
  requiresDowntime: false, // true or false

  up: function(next) {
    MongoClient.connect(db_path, function(err, db){
      db.collection('stories').update({approvedForPublic:{$exists:false}}, {$set: {'featured': false}}, {multi: true}, function(err, rslt){
        db.collection('stories').update({'approvedForRandom':true}, {$set: {'featured':true}}, {multi:true},  function(err, rslt){
          db.collection('stories').update({}, {$rename: {"approvedForRandom": "approvedForPublic"}}, { multi: true}, function(err, rslt){
            next();
          })
        })
      })
    });
  },

  down: function(next) {
    MongoClient.connect(db_path, function(err, db){
      db.collection('stories').update({}, {$unset: {'featured': true}, $rename: {"approvedForPublic": "approvedForRandom"}}, { multi: true}, function(err, rslt){
        next();
      })
    });
  },

  test: function(){
    if (process.end.NODE_ENV !== 'test') {
      console.error("Please run migrate:test with `NODE_ENV=test`")
      return;
    }
    describe('up', function(){
      before(function(){})
      after(function(){})
      it('works');
    });

    describe('down', function(){
      before(function(){})
      after(function(){})
      it('works');
    });
  }
}
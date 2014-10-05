process.env.NODE_ENV = process.env.NODE_ENV || 'development';
console.log(process.env.NODE_ENV);
var MongoClient = require('mongodb').MongoClient
  , db_path = (process.env.NODE_ENV === 'production') ? process.env.MONGOLAB_URI : "mongodb://localhost/311_" + process.env.NODE_ENV
  ;

console.log(db_path);

module.exports = {
  requiresDowntime: false, // true or false

  up: function(next) {
    MongoClient.connect(db_path, function(err, db){
      db.collection('tickets').update({"date":{$exists:true}}, {$set: { "date_opened": null}, $rename: {"date": "date_closed"}}, { multi: true}, function(err, rslt){
        next();
      })
    });
  },

  down: function(next) {
    MongoClient.connect(db_path, function(err, db){
      db.collection('tickets').update({}, { $rename: {"date_closed": "date"} }, { multi: true}, function(err, rslt){
        if (err) throw err;
        db.collection('tickets').update({}, { $unset: {"date_opened": true} }, function(err, rslt){
          if (err) throw err;
          next();
        })
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
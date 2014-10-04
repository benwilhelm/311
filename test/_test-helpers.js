var async = require('async')
  , fixtures = require('pow-mongoose-fixtures')
  , mongoose = require('mongoose')
  ;

module.exports = {
    
    emptyCollections: function(done) {
        console.log('empty collections');
        var collections = [
          'stories',
          'tickets',
          'users'
        ];

        collections.forEach(function(c){
          var collection = mongoose.connection.collections[c];
          if (collection) {
            collection.drop();
          }
        });
        
        done();
    },
    
    loadFixtures: function(models, done) {
        var callbacks = [];
        models.forEach(function(model){
            var path = '../fixtures/' + model + '.fixtures.js';
            var callback = function(cb){
                fixtures.load(path, mongoose.connection, cb);
            };
            callbacks.push(callback);
        });
        async.series(callbacks, done);
    }
}
var mongoose = require('mongoose')
  , Schema = mongoose.Schema
  ;
  
var StorySchema = new Schema({
  
  summary: {
    type: String,
    req: "Please provide a summary of your issue"
  },
  
  _tickets: [{
    type: Schema.Types.ObjectId,
    ref: 'Ticket'
  }],
  
  approvedForPublic: {
    type: Boolean,
    default: false
  },
  
  featured: {
    type: Boolean,
    default: false
  },

  isExample: {
    type: Boolean,
    default: false
  }
});


StorySchema.pre('save', function(next){
  var self = this;
  if (self.featured) {
    self.approvedForPublic = true;
  }
  next();
})
  
mongoose.model('Story', StorySchema);
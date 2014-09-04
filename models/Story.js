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
  }]
});
  
mongoose.model('Story', StorySchema);
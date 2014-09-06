var mongoose = require('mongoose')
  , Schema = mongoose.Schema
  ;
  
var TicketSchema = new Schema({
  number: {
    type: String
  },
  
  date_opened: {
    type: Date
  },
  
  date_closed: {
    type: Date
  },
  
  description: {
    type: String
  }
});

mongoose.model('Ticket', TicketSchema);
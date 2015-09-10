var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var TeamSchema = new Schema({
	name: {
        type: String,
        required: true,
        unique: true
  },
  member_count: {
    type: Number,
    required: true
  },
  members: [{
   EmpId: {
     type: String,
     required: true
   },
   firstName: {
     type: String,
     required: true
   },
   lastName: {
     type: String,
     required: true
   } 
  }]
});

module.exports = mongoose.model('Team', TeamSchema);
var mongoose = require('mongoose');
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;
    
var Report = new Schema({
  name: {type: String, required: true, trim: true},
  description: {type: String, required: false, trim: true},
  client: {type: String, required: false, trim: true},
  content: {type: String, required: true, trim: true, unique: true},
  created_by: {type: ObjectId, required: true},
  created: { type: Date, required: true, default: Date.now },
  modified: { type: Date, required: false },
  organizations: [{ type: ObjectId, ref: 'organizations'}],
  report_template: { type: ObjectId, required: false }
});

module.exports = mongoose.model('Report', Report);
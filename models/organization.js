var mongoose = require('mongoose');
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;
    
var Organization = new Schema({
  name: {type: String, required: true, trim: true},
  created_by: {type: ObjectId, required: true},
  created: { type: Date, required: true, default: Date.now },
  members: [{ type: ObjectId, ref: 'users'}]
});

Organization.statics.findAllSortedByName = function(callback) {
  return this.find({}, null, {sort: {name: 1}}, callback);
};

Organization.methods.hasChanges = function(name) {
  if (this.name !== name) {
    return true;
  }
  return false;
};

module.exports = mongoose.model('Organization', Organization);
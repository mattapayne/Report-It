var mongoose = require('mongoose');
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;
    
function contentValidator(content) {
  if (content === null || typeof(content) !== 'string' || content.length === 0 || content === 'matt') {
    return false;
  }
  return true;
}

var contentValidation = [contentValidator, 'Content must be supplied.'];
    
var Snippet = new Schema({
  name: {type: String, required: true, trim: true},
  created_by: {type: ObjectId, required: true},
  created: { type: Date, required: true, default: Date.now },
  content: {type: String, required: true, trim: true, validate: contentValidation }
});

Snippet.statics.findAllSortedByName = function(callback) {
  return this.find({}, null, {sort: {name: 1}}, callback);
};

Snippet.methods.hasChanges = function(name, content) {
  if (this.name !== name || this.content !== content) {
    return true;
  }
  return false;
};

module.exports = mongoose.model('Snippet', Snippet);
var mongoose = require('mongoose');
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId,
    passwordHelper = require('../utility/password.js');

var DefaultSettings = [
  { key: 'image_height', value: 360, description: 'The height that your uploaded images will be scaled to', validation_rule: 'MustBeInteger' },
  { key: 'image_width', value: 640, description: 'The width that your uploaded images will be scaled to', validation_rule: 'MustBeInteger'}
];

var UserSetting = new Schema({
  key: { type: String, required: true, trim: true },
  value: { type: Schema.Types.Mixed },
  description: { type: String, required: false, trim: true },
  validation_rule: { type: String, required: false, trim: true }
});

var User = new Schema({
  firstName: { type: String, required: true, trim: true },
  lastName: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true, unique: true },
  hashed_password: { type: String, required: true, trim: true },
  settings: [UserSetting]
});

User.pre('save', function(next) {
  var user = this;
  if (user.isNew) {
    //default settings
    for (var i=0; i<DefaultSettings.length; i++) {
      user.settings.push(DefaultSettings[i]);
    } 
  }
  next();
});

User.methods.validatePassword = function(suppliedPassword) {
  return passwordHelper.validateHash(this.hashed_password, suppliedPassword);
};

User.virtual('full_name').get(function() { return this.firstName + ' ' + this.lastName; });
User.virtual('password').set(function(password) {
    this.set('hashed_password', passwordHelper.createHash(password));
});

module.exports = mongoose.model('User', User);
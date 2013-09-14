var mongoose = require('mongoose');
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId,
    passwordHelper = require('../utility/password.js');

var SettingsKeys = ['image_height', 'image_width'];

var UserSetting = new Schema({
  key: { type: String, required: true, trim: true },
  value: { type: Schema.Types.Mixed }
});

var User = new Schema({
  firstName: { type: String, required: true, trim: true },
  lastName: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true, unique: true },
  hashed_password: { type: String, required: true, trim: true },
  settings: [UserSetting]
});

User.pre('save', function(next) {
  var self = this;
  for (var i=0; i<SettingsKeys.length; i++) {
    var settings = {
      key: SettingsKeys[i],
      value: ''
    };
    self.settings.push(settings);
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
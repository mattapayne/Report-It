var mongoose = require('mongoose');
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId,
    password = require('../utility/password');

 
var User = new Schema({
  firstName: {type: String, required: true, trim: true},
  lastName: {type: String, required: true, trim: true},
  email: {type: String, required: true, trim: true, unique: true},
  hashed_password: {type: String, required: true, trim: true}
});

User.methods.validatePassword = function(suppliedPassword) {
  return password.validateHash(this.hashed_password, suppliedPassword);
};

User.methods.fullName = function() {
  return this.firstName + " " + this.lastName;
}

module.exports = mongoose.model('User', User);
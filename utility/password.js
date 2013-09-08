crypto = require('crypto');
    
var SALT_LENGTH = 9;

exports.createHash = function(password) {
  var salt = generateSalt(SALT_LENGTH);
  var hash = md5(password + salt);
  return salt + hash;
}

exports.validateHash = function(hash, password) {
  var salt = hash.substr(0, SALT_LENGTH);
  var validHash = salt + md5(password + salt)
  return hash === validHash;
}

function md5(string) {
  return crypto.createHash('md5').update(string).digest('hex');
}

function generateSalt(len) {
  var set = '0123456789abcdefghijklmnopqurstuvwxyzABCDEFGHIJKLMNOPQURSTUVWXYZ',
    setLen = set.length,
    salt = '';
  for (var i = 0; i < len; i++) {
    var p = Math.floor(Math.random() * setLen);
    salt += set[p];
  }
  return salt;
}
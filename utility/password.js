crypto = require('crypto');
    
var SALT_LENGTH = 9;

exports.createHash = function(password) {
  var salt = _generateSalt(SALT_LENGTH);
  var hash = _md5(password + salt);
  return salt + hash;
}

exports.validateHash = function(hash, password) {
  var salt = hash.substr(0, SALT_LENGTH);
  var validHash = salt + _md5(password + salt)
  return hash === validHash;
}

function _md5(string) {
  return crypto.createHash('md5').update(string).digest('hex');
}

function _generateSalt(len) {
  var set = '0123456789abcdefghijklmnopqurstuvwxyzABCDEFGHIJKLMNOPQURSTUVWXYZ',
    setLen = set.length,
    salt = '';
  for (var i = 0; i < len; i++) {
    var p = Math.floor(Math.random() * setLen);
    salt += set[p];
  }
  return salt;
}
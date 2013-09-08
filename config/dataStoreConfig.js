var mongoose = require('mongoose');

var DataStoreConfig = function() {
    
}

DataStoreConfig.prototype.init = function() {
  mongoose.connect('mongodb://127.0.0.1/inspectorly_dev');
}

exports.DataStoreConfig = new DataStoreConfig();

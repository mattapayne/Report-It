var mongoose = require('mongoose');

exports.init = function() {
  var config = InspectIt.app.get('config');
  mongoose.connect(config.mongodb);
}

var mongoose = require('mongoose');

exports.init = function() {
  var config = ReportIt.app.get('config');
  mongoose.connect(config.mongodb);
}

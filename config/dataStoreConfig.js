var mongoose = require('mongoose');

exports.init = function() {
  console.log("*****************************");
  var config = InspectIt.app.get('config');
  console.log(InspectIt.app.get('config'));
  mongoose.connect(config.mongodb);
}

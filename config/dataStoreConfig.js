var mongoose = require('mongoose');

module.exports.init = function()
{
  mongoose.connect('mongodb://127.0.0.1/inspectorly_dev');
}

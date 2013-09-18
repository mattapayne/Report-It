var _ = require('underscore'),
    User = ReportIt.models('User'),
    errorParser = require('../utility/mongoose_error_parser.js'),
    iz = require('iz');

  
exports.index = function(req, res) {
  res.json(req.user.settings)
}

exports.update = function(req, res) {
  var setting = req.user.settings.id(req.params.id);
  var newValue = req.body.value;
  var validation_rule = setting.validation_rule;

  if (validation_rule) {
    switch (validation_rule) {
      case 'MustBeInteger':
        if (!iz.int(newValue)) {
          res.send(406, errorParser.createError('Validation failed', 'value', 'required.'));
          return;
        }
    }
  }
  
  setting.value = newValue;
    req.user.save(function(err) {
      if (err) {
        res.send(406);
      }
      else {
        res.send(200);
      }
    });
}
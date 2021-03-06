exports.parse = function(err) {
    var errors = [];
    for (var error in err.errors) {
        var propertyName = err.errors[error].path;
        var type = err.errors[error].type;
        errors.push({name: propertyName, type: type});
    }
    return {
        message: err.message,
        errors: errors
    };
};

exports.createError = function(message, propertyName, propertyMessage) {
  var errors = [
        { name: propertyName, type: propertyMessage }    
    ];
  
  return {
    message: message,
    errors: errors
  };
};
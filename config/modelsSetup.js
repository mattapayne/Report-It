function ModelRegistrar() {
    
}

ModelRegistrar.prototype.init = function() {
  InspectoryLy.models = require('../models');
}

exports.ModelRegistrar = new ModelRegistrar();
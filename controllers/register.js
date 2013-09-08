var passwordUtil = require('../utility/password');
    
function processRegistration(req, res) {
    
  var User = InspectoryLy.models("User");
  var password = req.body.password;
  
  var data = {
    firstName: req.body.firstname,
    lastName: req.body.lastname,
    email: req.body.email,
    hashed_password: passwordUtil.createHash(password)
  };
  
  var user = new User(data);
  
  user.save(function(err, data) {
    if(err) {
      res.send(err);
    }
    else {
      res.redirect('auth/login');
    }
  });
}

function register(req, res) {
  res.render('register/new', {active_tab: 'register'})
}

exports.register = register;
exports.processRegistration = processRegistration;
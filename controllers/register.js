var passwordUtil = require('../utility/password');
    
exports.processRegistration = function processRegistration(req, res) {
    
  var User = ReportIt.models("User");
  var password = req.body.password;
  
  var hash = {
    firstName: req.body.firstname,
    lastName: req.body.lastname,
    email: req.body.email,
    hashed_password: passwordUtil.createHash(password)
  };
  
  var user = new User(hash);
  
  user.save(function(err, data) {
    if(err) {
      res.send(err);
    }
    else {
      res.redirect('/');
    }
  });
}

exports.register = function register(req, res) {
  res.render('register/new', {active_tab: 'register', title: 'Report-It :: Register'})
}
var User = ReportIt.models('User');
  
exports.processRegistration = function processRegistration(req, res) {
  var password = req.body.password;
  
  var hash = {
    firstName: req.body.firstname,
    lastName: req.body.lastname,
    email: req.body.email
  };
  
  var user = new User(hash);
  user.set('password', password);
  
  user.save(function(err, data) {
    if(err) { //TODO - change this to re-render register page with errors
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
var passport = require('passport');

function Auth() {
    
}

Auth.prototype.login = function(req, res) {
  res.render('auth/login');
}

Auth.prototype.processLogin = function(req, res, next) {
  passport.authenticate('local', { successRedirect: '/dashboard',
                                 failureRedirect: '/login',
                                 failureFlash: true })(req, res, next);
}

Auth.prototype.logout = function(req, res) {
  req.logout();
  res.redirect('/');
}

exports.Auth = new Auth();
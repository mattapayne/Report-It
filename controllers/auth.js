var passport = require('passport');

exports.login = function(req, res, next) {
  passport.authenticate('local', { successRedirect: '/dashboard',
                                 failureRedirect: '/',
                                 failureFlash: true })(req, res, next);
}

exports.logout = function(req, res) {
  req.logout();
  res.redirect('/');
}
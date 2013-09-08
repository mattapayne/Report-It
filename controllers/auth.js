var passport = require('passport');

function login(req, res, next) {
  passport.authenticate('local', { successRedirect: '/dashboard',
                                 failureRedirect: '/login',
                                 failureFlash: true })(req, res, next);
}

function logout(req, res) {
  req.logout();
  res.redirect('/');
}

exports.login = login;
exports.logout = logout;
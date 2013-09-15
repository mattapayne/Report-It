module.exports = function(req, res, next) {
  if ('HEAD' == req.method || 'OPTIONS' == req.method) {
    next();
    return;
  }
  // break session hash / force express to spit out a new cookie once per second at most
  req.session._garbage = Date();
  req.session.touch();

  next();
}
var passport = require('passport'),
LocalStrategy = require('passport-local').Strategy;

function PassportConfig() {
    
}

PassportConfig.prototype.init = function() {
    
  var User = InspectoryLy.models("User");
  
  passport.use(new LocalStrategy(
    function(username, password, done) {
      User.findOne({email: username}, function(err, user) {
        if(err) {
          return done(err);
        }
        if (!user) {
          return done(null, false, { message: 'Incorrect username.'});
        }
        if (!user.validatePassword(password)) {
          return done(null, false, { message: 'Incorrect password.'});
        }
        return done(null, user);
      });
    }
  ));

  passport.serializeUser(function(user, done) {
    done(null, user.email);
  });
  
  passport.deserializeUser(function(id, done) {
    User.findOne({email: id}, function(err, user) {
      done(err, user);
    });
  });
}

exports.PassportConfig = new PassportConfig();

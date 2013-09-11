var path = require('path'),
    flash = require('connect-flash'),
    express = require('express'),
    passport = require('passport'),
    config = require('./config.json'),
    passportConfig = require('./passportConfig.js'),
    modelRegistrar = require('./modelsSetup.js'),
    dataStoreConfig = require('./dataStoreConfig.js');

function boot() {

  InspectIt.app = express();
  
  InspectIt.app.set('config', config[InspectIt.app.get('env')]);
  InspectIt.app.set('port', process.env.PORT || 3000);
  InspectIt.app.set('views', InspectIt.rootDirectory + '/views');
  InspectIt.app.set('view engine', 'jade');
  
  InspectIt.app.use(express.favicon());
  InspectIt.app.use(express.logger('dev'));
  InspectIt.app.use(express.bodyParser());
  InspectIt.app.use(express.methodOverride());
  InspectIt.app.use(express.cookieParser('monkeybutler'));
  InspectIt.app.use(express.session({cookie: {
                                        maxAge: Date.now() + (30 * 60 * 1000),
                                        expires: new Date(Date.now() + (30 * 60 * 1000)) 
                                      }}));
  InspectIt.app.use(flash());
  InspectIt.app.use(passport.initialize());
  InspectIt.app.use(passport.session());
  
  //set current user so views, etc. have access
  InspectIt.app.use(function(req, res, next) {
     res.locals.current_user = req.user;
     res.locals.logged_in = req.user != null;
     var now = Date.now();
     var expires = req.session.cookie.expires;
     var session_length = Math.abs(expires - now);
      res.locals.session_length = session_length;
     next();
  });
  
  InspectIt.app.use(require('stylus').middleware(InspectIt.rootDirectory + '/public'));
  InspectIt.app.use(express.static(path.join(InspectIt.rootDirectory, 'public')));
  InspectIt.app.use(InspectIt.app.router);
  
  // development only
  if ('development' == InspectIt.app.get('env')) {
    InspectIt.app.use(express.errorHandler());
  }
  
  dataStoreConfig.init();
  modelRegistrar.init();
  passportConfig.init();
  
  //router must be the last to be loaded, since it relies on the 'app' being setup
  var router = require(InspectIt.rootDirectory + '/controllers/router').Router;
  
  router.init();
}

exports.boot = boot;
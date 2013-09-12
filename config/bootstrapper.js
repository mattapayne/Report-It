var path = require('path'),
    flash = require('connect-flash'),
    express = require('express'),
    passport = require('passport'),
    config = require('./config.json'),
    passportConfig = require('./passportConfig.js'),
    modelRegistrar = require('./modelsSetup.js'),
    dataStoreConfig = require('./dataStoreConfig.js'),
    simpleStorageConfig = require('./simpleStorageConfig.js');

function boot() {

  ReportIt.app = express();
  
  ReportIt.app.set('config', config[ReportIt.app.get('env')]);
  ReportIt.app.set('port', process.env.PORT || 3000);
  ReportIt.app.set('views', ReportIt.rootDirectory + '/views');
  ReportIt.app.set('view engine', 'jade');
  
  ReportIt.app.use(express.favicon());
  ReportIt.app.use(express.logger('dev'));
  ReportIt.app.use(express.bodyParser());
  ReportIt.app.use(express.methodOverride());
  ReportIt.app.use(express.cookieParser('monkeybutler'));
  ReportIt.app.use(express.session({cookie: {
                                        maxAge: Date.now() + (30 * 60 * 1000),
                                        expires: new Date(Date.now() + (30 * 60 * 1000)) 
                                      }}));
  ReportIt.app.use(flash());
  ReportIt.app.use(passport.initialize());
  ReportIt.app.use(passport.session());
  
  //set current user so views, etc. have access
  ReportIt.app.use(function(req, res, next) {
    res.locals.current_user = req.user;
    res.locals.logged_in = req.user != null;
    var now = Date.now();
    var expires = req.session.cookie.expires;
    var session_length = Math.abs(expires - now);
    res.locals.session_length = session_length;
    next();
  });
  
  ReportIt.app.use(require('stylus').middleware(ReportIt.rootDirectory + '/public'));
  ReportIt.app.use(express.static(path.join(ReportIt.rootDirectory, 'public')));
  ReportIt.app.use(ReportIt.app.router);
  
  // development only
  if ('development' == ReportIt.app.get('env')) {
    ReportIt.app.use(express.errorHandler());
  }
  
  dataStoreConfig.init();
  modelRegistrar.init();
  passportConfig.init();
  simpleStorageConfig.init();
  
  //router must be the last to be loaded, since it relies on the 'app' being setup
  var router = require(ReportIt.rootDirectory + '/controllers/router').Router;
  
  router.init();
}

exports.boot = boot;
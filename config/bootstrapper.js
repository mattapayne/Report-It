var path = require('path'),
    flash = require('connect-flash'),
    express = require('express'),
    passport = require('passport'),
    config = require('./config.json'),
    sessionFixer = require('../middleware/fixsession.js'),
    passportConfig = require('./passportConfig.js'),
    modelRegistrar = require('./modelsSetup.js'),
    dataStoreConfig = require('./dataStoreConfig.js'),
    simpleStorageConfig = require('./simpleStorageConfig.js'),
    MongoStore = require('connect-mongo')(express);

var SESSION_LENGTH = (60 * 60 * 1000) // 1 minute

function boot() {

  ReportIt.app = express();
  
  var currentConfig = config[ReportIt.app.get('env')];
    
  ReportIt.app.set('config', currentConfig);
  ReportIt.app.set('port', process.env.PORT || 3000);
  ReportIt.app.set('views', ReportIt.rootDirectory + '/views');
  ReportIt.app.set('view engine', 'jade');
  
  ReportIt.app.use(express.favicon());
  ReportIt.app.use(express.logger('dev'));
  ReportIt.app.use(express.bodyParser());
  ReportIt.app.use(express.methodOverride());
  ReportIt.app.use(express.cookieParser('monkeybutler'));
  ReportIt.app.use(express.session({cookie: {
                                      maxAge: Date.now() + SESSION_LENGTH,
                                      expires: new Date(Date.now() + SESSION_LENGTH) },
                                      store: new MongoStore({ db: currentConfig.mongodb_session_store })}));
  ReportIt.app.use(flash());
  ReportIt.app.use(passport.initialize());
  ReportIt.app.use(passport.session());
  ReportIt.app.use(sessionFixer);
  
  //set current user so views, etc. have access TODO -- Move this into a custom middleware module.
  ReportIt.app.use(function(req, res, next) {
    res.locals.current_user = req.user;
    res.locals.logged_in = req.user != null;
    res.locals.session_length = SESSION_LENGTH;
    next();
  });
  
  ReportIt.app.use(require('stylus').middleware(ReportIt.rootDirectory + '/public'));
  ReportIt.app.use(express.static(path.join(ReportIt.rootDirectory, 'public')));
  
  ReportIt.app.use(ReportIt.app.router);
  
  // development only
  if ('development' == ReportIt.app.get('env')) {
    ReportIt.app.use(express.errorHandler());
  }
  else {
    simpleStorageConfig.init();
  }
  
  dataStoreConfig.init();
  modelRegistrar.init();
  passportConfig.init();
  
  //router must be the last to be loaded, since it relies on the 'app' being setup
  var router = require(ReportIt.rootDirectory + '/controllers/router').Router;
  
  router.init();
}

exports.boot = boot;
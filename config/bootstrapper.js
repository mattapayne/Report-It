var path = require('path'),
    flash = require('connect-flash'),
    express = require('express'),
    passport = require('passport'),
    passportConfig = require('./passportConfig'),
    modelRegistrar = require('./modelsSetup'),
    dataStoreConfig = require('./dataStoreConfig');

function boot() {

  InspectoryLy.app = express();
  
  InspectoryLy.app.set('port', process.env.PORT || 3000);
  InspectoryLy.app.set('views', InspectoryLy.rootDirectory + '/views');
  InspectoryLy.app.set('view engine', 'jade');
  
  InspectoryLy.app.use(express.favicon());
  InspectoryLy.app.use(express.logger('dev'));
  InspectoryLy.app.use(express.bodyParser());
  InspectoryLy.app.use(express.methodOverride());
  InspectoryLy.app.use(express.cookieParser('monkeybutler'));
  InspectoryLy.app.use(express.session());
  InspectoryLy.app.use(flash());
  InspectoryLy.app.use(passport.initialize());
  InspectoryLy.app.use(passport.session());
  
  //set current user so views, etc. have access
  InspectoryLy.app.use(function(req, res, next) {
     res.locals.current_user = req.user;
     res.locals.logged_in = req.user != null;
     next();
  });
  
  InspectoryLy.app.use(require('stylus').middleware(InspectoryLy.rootDirectory + '/public'));
  InspectoryLy.app.use(express.static(path.join(InspectoryLy.rootDirectory, 'public')));
  InspectoryLy.app.use(InspectoryLy.app.router);
  
  // development only
  if ('development' == InspectoryLy.app.get('env')) {
    InspectoryLy.app.use(express.errorHandler());
  }
  
  dataStoreConfig.init();
  modelRegistrar.init();
  passportConfig.init();
  
  //router must be the last to be loaded, since it relies on the 'app' being setup
  var router = require(InspectoryLy.rootDirectory + '/controllers/router').Router;
  
  router.init();
}

exports.boot = boot;
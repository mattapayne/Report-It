var main = require('./main'),
  auth = require('./auth'),
  reg = require('./register'),
  dash = require('./dashboard'),
  ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn,
  ensureLoggedOut = require('connect-ensure-login').ensureLoggedOut;

function Router() {
    
}

Router.prototype.init = function() {
  var app = InspectoryLy.app;
  
  app.get('/', main.landing);
  app.get('/about', main.about);
  app.get('/contact', main.contact);
  app.get('/logout', auth.logout);
  app.post('/login', mustNotBeLoggedIn, auth.login);
  app.get('/register', mustNotBeLoggedIn, reg.register);
  app.post('/register/process', mustNotBeLoggedIn, reg.processRegistration);
  app.get('/dashboard', mustBeLoggedIn, dash.index);
}

function mustBeLoggedIn(req, res, next) {
  ensureLoggedIn('/login')(req, res, next);
}

function mustNotBeLoggedIn(req, res, next) {
  ensureLoggedOut('/dashboard')(req, res, next);
}


exports.Router = new Router();
var main = require('./main'),
  auth = require('./auth'),
  reg = require('./register'),
  dash = require('./dashboard'),
  reports = require('./reports'),
  report_templates = require('./report_templates'),
  organizations = require('./organizations'),
  snippets = require('./snippets'),
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
  
  app.all('/reports/*', mustBeLoggedIn);
  app.get('/reports', reports.index);
  
  app.all('/report_templates/*', mustBeLoggedIn);
  app.get('/report_templates', report_templates.index);
  app.get('/report_templates/add', report_templates.add);
  app.post('/report_templates/create', report_templates.create);
  
  app.all('/organizations/*', mustBeLoggedIn);
  app.get('/organizations', organizations.index);
  app.get('/organizations/as_select', organizations.asSelect);
  
  app.all('/snippets/*', mustBeLoggedIn);
  app.get('/snippets', snippets.index);
  app.get('/snippets/with_content', snippets.withContent);
}

function mustBeLoggedIn(req, res, next) {
  ensureLoggedIn('/')(req, res, next);
}

function mustNotBeLoggedIn(req, res, next) {
  ensureLoggedOut('/dashboard')(req, res, next);
}


exports.Router = new Router();
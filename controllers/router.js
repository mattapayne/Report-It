var main = require('./main.js'),
  auth = require('./auth.js'),
  reg = require('./register.js'),
  dash = require('./dashboard.js'),
  reports = require('./reports.js'),
  report_templates = require('./report_templates.js'),
  organizations = require('./organizations.js'),
  snippets = require('./snippets.js'),
  ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn,
  ensureLoggedOut = require('connect-ensure-login').ensureLoggedOut;

function Router() {
    
}

Router.prototype.init = function() {
  var app = InspectIt.app;
  
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
  app.post('/organizations/create', organizations.create);
  app.delete('/organizations/destroy/:id', organizations.destroy);
  app.put('/organizations/update/:id', organizations.update);
  
  app.all('/snippets/*', mustBeLoggedIn);
  app.get('/snippets', snippets.index);
  app.get('/snippets/with_content', snippets.withContent);
  app.delete('/snippets/destroy/:id', snippets.destroy);
  app.post('/snippets/create', snippets.create);
  app.put('/snippets/update/:id', snippets.update);
  
  app.get('/session_keepalive', function(req, res) {
    console.log("KEEP ALIVE");
    res.send(200);
  });
}

function mustBeLoggedIn(req, res, next) {
  ensureLoggedIn('/')(req, res, next);
}

function mustNotBeLoggedIn(req, res, next) {
  ensureLoggedOut('/dashboard')(req, res, next);
}

exports.Router = new Router();
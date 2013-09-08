var http = require('http');

//application global obj
InspectoryLy = { rootDirectory : __dirname };

var bootstrapper = require('./config/bootstrapper').Bootstrapper;
bootstrapper.boot();

http.createServer(InspectoryLy.app).listen(InspectoryLy.app.get('port'), function(){
  console.log('Express server listening on port ' + InspectoryLy.app.get('port'));
});

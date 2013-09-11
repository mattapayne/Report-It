var http = require('http');

//application global obj
InspectIt = { rootDirectory : __dirname };

var bootstrapper = require('./config/bootstrapper.js');
bootstrapper.boot();

http.createServer(InspectIt.app).listen(InspectIt.app.get('port'), function(){
  console.log('Express server listening on port ' + InspectIt.app.get('port'));
});

var http = require('http');

//application global obj
ReportIt = { rootDirectory : __dirname };

var bootstrapper = require('./config/bootstrapper.js');
bootstrapper.boot();

http.createServer(ReportIt.app).listen(ReportIt.app.get('port'), function(){
  console.log('Express server listening on port ' + ReportIt.app.get('port'));
});

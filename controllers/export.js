var errorParser = require('../utility/mongoose_error_parser.js'),
    Report = ReportIt.models('Report'),
    ReportTemplate = ReportIt.models('ReportTemplate'),
    mime = require('mime'),
    wkhtmltopdf = require('wkhtmltopdf'),
    fs = require('fs');

function sendFile(req, res, format, item) {
  var content = item.content;
  var ext = format === 'word' ? ".doc" : ".pdf";
  if (ext == '.doc') {
    var name = item.name + ext;
    var mimeType = mime.lookup(name);
    res.setHeader('Content-Disposition', 'attachment; filename=' + name);
    res.setHeader('Content-Type', mimeType);
    res.send(content);  
  }
  else {
    wkhtmltopdf(item.content).pipe(res);
  }
}

exports.word = function(req, res) {
    var type = req.params.type;
    var format = req.params.format;
    if (type === 'template') {
      ReportTemplate.findById(req.params.id, function(err, report) {
          if(err) {
            res.send(404, errorParser.parse(err));
          }
          else {
            sendFile(req, res, format, report);
          }
      });
    }
    else {
         Report.findById(req.params.id, function(err, report) {
          if(err) {
            res.send(404, errorParser.parse(err));
          }
          else {
            sendFile(req, res, format, report);
          }
      }); 
    }
}
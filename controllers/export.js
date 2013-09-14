var errorParser = require('../utility/mongoose_error_parser.js');
var Report = ReportIt.models('Report');
var ReportTemplate = ReportIt.models('ReportTemplate');
var mime = require('mime');
var fs = require('fs');

function sendFile(req, res, format, item) {
  var content = item.content;
  var ext = format === 'word' ? ".doc" : ".pdf";
  var name = item.name + ext;
  var mimeType = mime.lookup(name);
  res.setHeader('Content-Disposition', 'attachment; filename=' + name);
  res.setHeader('Content-Type', mimeType);
  res.send(content);
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
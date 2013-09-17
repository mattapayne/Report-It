var errorParser = require('../utility/mongoose_error_parser.js');
var Report = ReportIt.models('Report');

exports.index = function(req, res) {
  var callback = function(err, docs) {
    if(err) {
      res.send(404, errorParser.parse(err));
    }
    else {
      res.json(docs);
    }
  };
  
  var query = Report.find({ created_by: req.user._id});
  query.select('_id name client');
  query.exec(callback);
}

exports.get = function(req, res) {
  Report.findById(req.params.id, function(err, report) {
    if(err) {
      res.send(404, errorParser.parse(err));
    }
    else {
      res.json(report);
    }
  });
}

exports.edit = function(req, res) {
  Report.findById(req.params.id, function(err, report) {
    if(err) {
      res.send(404, errorParser.parse(err));
    }
    else {
      res.render('reports/report', {
        report: report,
        title: 'Report-It :: Edit Report',
        breadcrumbText: "Edit Report: '" + report.name + "'"
      });
    }
  });
}

exports.destroy = function(req, res) {
  Report.remove({_id: req.params.id}, function(err) {
    if(err) {
      res.send(404, errorParser.parse(err));
    }
    else {
      res.send(200);
    }
  });
}

exports.add = function(req, res) {
  res.render('reports/report', {
    report: {
        name: '', description: '', content: '', _id: ''
        },
    title: 'Report-It :: Add Report',
    breadcrumbText: 'Add Report'
  });
}

exports.update = function(req, res) {
  Report.findById(req.params.id, function(err, report) {
    if (err) {
      res.send(404, errorParser.parse(err));
    }
    else {
      report.name = req.body.name;
      report.description = req.body.description;
      report.content = req.body.content
      report.modified = Date.now();
      report.organizations = req.body.organizations;
      report.client = req.body.client;
      report_template: req.body.report_template
      
      //TODO - extract image urls from the content of the report so we can track them.
      //Also, if there are images that no longer are needed, remove them from persistent storage.
      
      report.save(function(err) {
        if (err) {
          res.send(406, errorParser.parse(err));
        }
        else {
          res.json({
            redirectUrl: '/dashboard'
          });
        }
      });
    }
  });
}

exports.create = function(req, res) {
  var hash = {
    name: req.body.name,
    description: req.body.description,
    content: req.body.content,
    created_by: req.user._id,
    organizations: req.body.organizations,
    client: req.body.client,
    report_template: req.body.report_template
  }
  
  //TODO - extract image urls from the content of the report so we can track them.
  var report = new Report(hash);
    
  report.save(function(err, data) {
    if(err) {
      res.send(400, errorParser.parse(err));
    }
    else {
      res.json({
            redirectUrl: '/dashboard'
      });
    }
  });
}
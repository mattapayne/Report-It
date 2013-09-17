var errorParser = require('../utility/mongoose_error_parser.js');
var ReportTemplate = ReportIt.models('ReportTemplate');

exports.index = function(req, res) {
  var callback = function(err, docs) {
    if(err) {
      res.send(404, errorParser.parse(err));
    }
    else {
      res.json(docs);
    }
  };
  
  var query = ReportTemplate.find({ created_by: req.user._id});
  query.select('_id name client');
  query.exec(callback);
}

exports.get = function(req, res) {
  ReportTemplate.findById(req.params.id, function(err, templ) {
    if(err) {
      res.send(404, errorParser.parse(err));
    }
    else {
      res.json(templ);
    }
  });
}

exports.edit = function(req, res) {
  ReportTemplate.findById(req.params.id, function(err, templ) {
    if(err) {
      res.send(404, errorParser.parse(err));
    }
    else {
      res.render('report_templates/report_template', {
        report_template: templ,
        title: 'Report-It :: Edit Report Template',
        breadcrumbText: "Edit Report Template: '" + templ.name + "'"
      });
    }
  });
}

exports.destroy = function(req, res) {
  ReportTemplate.remove({_id: req.params.id}, function(err) {
    if(err) {
      res.send(404, errorParser.parse(err));
    }
    else {
      res.send(200);
    }
  });
}

exports.add = function(req, res) {
  res.render('report_templates/report_template', {
    report_template: {
        name: '', description: '', content: '', _id: ''
        },
    title: 'Report-It :: Add Report Template',
    breadcrumbText: 'Add Report Template'
  });
}

exports.update = function(req, res) {
  ReportTemplate.findById(req.params.id, function(err, template) {
    if (err) {
      res.send(404, errorParser.parse(err));
    }
    else {
      template.name = req.body.name;
      template.description = req.body.description;
      template.content = req.body.content
      template.modified = Date.now();
      template.organizations = req.body.organizations;
      template.client = req.body.client;
      //TODO - extract image urls from the content of the report so we can track them.
      //Also, if there are images that no longer are needed, remove them from persistent storage.
      
      template.save(function(err) {
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
    client: req.body.client
  }
  
  //TODO - extract image urls from the content of the report so we can track them.
  var reportTemplate = new ReportTemplate(hash);
    
  reportTemplate.save(function(err, data) {
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
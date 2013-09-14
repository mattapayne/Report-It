var errorParser = require('../utility/mongoose_error_parser.js');
var ReportTemplate = ReportIt.models('ReportTemplate');

exports.index = function(req, res) {
  ReportTemplate.find({ created_by: req.user._id }, function(err, docs) {
    if(err) {
      res.send(404, errorParser.parse(err));
    }
    else {
      res.json(docs);
    }
  });
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
var errorParser = require('../utility/mongoose_error_parser.js');
var ReportTemplate = ReportIt.models('ReportTemplate');

exports.index = function(req, res) {
  ReportTemplate.find({ created_by: req.user._id }, function(err, docs) {
    if(err) {
      res.send(404);
    }
    else {
      res.json(docs);
    }
  });
}

exports.edit = function(req, res) {
  ReportTemplate.findById(req.params.id, function(err, templ) {
    if(err) {
      res.send(404);
    }
    else {
      res.render('report_templates/edit', {
        report_template: templ,
        title: 'Report-It :: Edit Report Template'
      });
    }
  });
}

exports.destroy = function(req, res) {
  ReportTemplate.remove({_id: req.params.id}, function(err) {
    if(err) {
      res.send(400, errorParser.parse(err));
    }
    else {
      res.send(200);
    }
  });
}

exports.add = function(req, res) {
  res.render('report_templates/add', {
    report_template: {
        name: '', description: '', content: ''
        },
    title: 'Report-It :: Add Report Template'
  });
}

exports.update = function(req, res) {
  var hash = {
    name: req.body.template_name,
    description: req.body.template_description,
    content: req.body.report_template_content
  }
    
  ReportTemplate.findById(req.params.id, function(err, template) {
    if (err) {
      res.send(404);
    }
    else {
      template.name = req.body.template_name;
      template.description = req.body.template_description;
      template.content = req.body.report_template_content
      template.modified = Date.now(); 
  
      if (req.body.organization_id) {
        template.organizations.push(req.body.organization_id);
      }
  
      template.save(function(err) {
        if (err) {
          res.render('report_templates/edit', {
            report_template: reportTemplate,
            validation_errors: errorParser.parse(err),
            title: 'Report-It :: Edit Report Template'
          });
        }
        else {
          res.redirect('/dashboard');
        }
      });
    }
  });
}

exports.create = function(req, res) {
  var hash = {
    name: req.body.template_name,
    description: req.body.template_description,
    content: req.body.report_template_content,
    created_by: req.user._id
  }
    
  var reportTemplate = new ReportTemplate(hash);
    
  if (req.organization_id) {
    template.organizations.push(req.organization_id);
  }
    
  reportTemplate.save(function(err, data) {
    if(err) {
      res.render('report_templates/add', {
        report_template: reportTemplate,
        validation_errors: errorParser.parse(err),
        title: 'Report-It :: Add Report Template'
      });
    }
    else {
      res.redirect('/dashboard');
    }
  });
}
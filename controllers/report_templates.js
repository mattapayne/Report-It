var errorParser = require('../utility/mongoose_error_parser');
var ReportTemplate = InspectoryLy.models("ReportTemplate");

exports.index = function(req, res) {
    ReportTemplate.find({created_by: req.user._id}, function(err, docs) {
        if(!err) {
            res.render('report_templates/_index', { report_templates: docs });
        }
        else {
            res.send(err);
        }
    });
}

exports.add = function(req, res) {
    res.render('report_templates/add', { report_template: { name: "", description: "", content: ""} });
}

exports.create = function(req, res) {
    var hash = {
        name: req.body.template_name,
        description: req.body.template_description,
        content: req.body.report_template_content,
        created_by: req.user._id
    }
    var reportTemplate = new ReportTemplate(hash);
    
    reportTemplate.save(function(err, data) {
        if(err) {
            console.log(errorParser.parse(err));
            res.render('report_templates/add', { report_template: reportTemplate, validation_errors: errorParser.parse(err) });
        }
        else {
            res.redirect('/dashboard');
        }
  });
}
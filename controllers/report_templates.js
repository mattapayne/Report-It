var ReportTemplate = InspectoryLy.models("ReportTemplate");

exports.index = function(req, res) {
    ReportTemplate.find({}, function(err, docs) {
        if(!err) {
            res.render('report_templates/_index', { report_templates: docs });
        }
        else {
            res.send(err);
        }
    });
}

exports.add = function(req, res) {
    res.render('report_templates/add');
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
            res.send(err);
        }
        else {
        res.redirect('/dashboard');
        }
  });
}
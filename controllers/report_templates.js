exports.index = function(req, res) {
    var report_templates = [
        { name: "Template #1", id: 1 },
        { name: "Template #2", id: 2 }
    ];
    res.render('report_templates/_index', { report_templates: report_templates });
}

exports.add = function(req, res) {
    res.render('report_templates/add');
}

exports.create = function(req, res) {
    //save the newly created template and redirect to the dashboard
    res.redirect('/dashboard')
}
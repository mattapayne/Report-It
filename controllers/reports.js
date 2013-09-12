exports.index = function(req, res) {
    var reports = [
        { name: 'Report #1', id: 1 },
        { name: 'Report #2', id: 2 }
    ];
    res.render('reports/_index', { reports: reports, title: 'Report-It :: Reports' });
}

exports.add = function(req, res) {
    res.render('reports/add', {title: 'Report-It :: Add Report'});
}

exports.create = function(req, res) {
    
}
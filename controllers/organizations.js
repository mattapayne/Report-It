var organizations = [{
        name: "Org #1", id: 1
    },
    {
        name: "Org #2", id: 2
    }
];
    
exports.index = function(req, res) {
    res.render('organizations/_index', { organizations: organizations });
}

exports.asSelect = function(req, res) {
    res.render('organizations/_select', { organizations: organizations });
}
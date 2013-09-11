var errorParser = require('../utility/mongoose_error_parser');

var Organization = InspectIt.models("Organization");

function findAll(req, res, callback) {
    Organization.findAllSortedByName(res.user._id, function(err, orgs) {
        if(err) {
            res.send(400, errorParser.parse(err));
        }
        else {
            callback(orgs);
        }
    });
}

exports.destroy = function(req, res) {
    Organization.remove({_id: req.params.id}, function(err) {
       if(err) {
            res.send(400, errorParser.parse(err));
       }
       else {
            res.send(200);
       }
    });
}

exports.update = function(req, res) {
    Organization.findById(req.params.id, function(err, org) {
        if(err) {
            res.send(err);
        }
        else {
            var name = req.body.name;
            
            if (org.hasChanges(name)) {
                org.name = name;
                org.save(function(err) {
                    if (err) {
                        res.send(406, errorParser.parse(err));
                    }
                    else {
                        res.send(200);
                    }
                });
            }
            else {
                res.send(200);
            }
        }
    });
}

exports.index = function(req, res) {
    findAll(res, req, function(orgs) {
        res.json(orgs); 
    });
}

exports.asSelect = function(req, res) {
    findAll(res, req, function(orgs) {
        res.render('organizations/_select', { organizations: orgs});
    });
}

exports.create = function(req, res) {
    var hash = {
        name: req.body.name,
        created_by: req.user._id,
        members : [req.user._id]
    }
    var organization = new Organization(hash);
    organization.save(function(err) {
        if(err) {
            res.send(406, errorParser.parse(err));
        }
        else {
           res.json(organization);
        }
  });
}
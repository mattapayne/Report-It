var errorParser = require('../utility/mongoose_error_parser');

var Snippet = InspectIt.models("Snippet");

function findAll(req, res, callback) {
    Snippet.findAllSortedByName(res.user._id, function(err, orgs) {
        if(err) {
            res.send(400, errorParser.parse(err));
        }
        else {
            callback(orgs);
        }
    });
}

exports.index = function(req, res) {
    findAll(res, req, function(snippets) {
        res.json(snippets);  
    })
}

exports.withContent = function(req, res) {
    findAll(res, req, function(snippets) {
        res.render('snippets/_complete', { snippets: snippets });
    })
}

exports.destroy = function(req, res) {
    Snippet.remove({_id: req.params.id}, function(err) {
       if(err) {
            res.send(400, errorParser.parse(err));
       }
       else {
            res.send(200);
       }
    });
}

exports.update = function(req, res) {
    Snippet.findById(req.params.id, function(err, snippet) {
        if(err) {
            res.send(err);
        }
        else {
            var name = req.body.name;
            var content = req.body.content;
            
            if (snippet.hasChanges(name, content)) {
                
                snippet.name = name;
                snippet.content = content;
                
                snippet.save(function(err) {
                    if (err) {
                        res.send(406, errorParser.parse(err));
                    }
                    else {
                        res.send(200);
                    }
                });
            }
            else {
                res.send(200); //Not Modified
            }
        }
    });
}

exports.create = function(req, res) {
    var data = {
      name: req.body.name,
      content: req.body.content,
      created_by: req.user._id
    };
    
    var snippet = new Snippet(data);
    
    snippet.save(function(err) {
        if(err) {
            res.send(406, errorParser.parse(err));
        }
        else {
            res.json(snippet);
        }
    });
}
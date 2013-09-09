exports.index = function(req, res) {
    var snippets = [
        { name: "Snippet #1", id: 1 },
        { name: "Snippet #2", id: 2 }
    ];
    res.render('snippets/_index', { snippets: snippets });
}

exports.withContent = function(req, res) {
        var snippets = [
        { name: "Snippet #1", id: 1, content: "This could be anything!!" },
        { name: "Snippet #2", id: 2, content: "This is something else that you can drag into the editor!!" }
    ];
    res.render('snippets/_complete', { snippets: snippets });
}
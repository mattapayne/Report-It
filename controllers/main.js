function landing(req, res) {
  res.render('main/index', { title: 'Express' });
}

exports.landing = landing;
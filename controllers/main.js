exports.landing = function landing(req, res) {
  res.render('main/index', { title: 'Report-It :: Home', active_tab: 'home' });
}

exports.about = function about(req, res) {
  res.render('main/about', { title: 'Report-It :: Home', active_tab: 'about' });
}

exports.contact = function contact(req, res) {
  res.render('main/contact', { title: 'Report-It :: Home', active_tab: 'contact' });
}
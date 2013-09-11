function landing(req, res) {
  res.render('main/index', { title: 'Inspect-It :: Home', active_tab: 'home' });
}

function about(req, res) {
  res.render('main/about', { title: 'Inspect-It :: Home', active_tab: 'about' });
}

function contact(req, res) {
  res.render('main/contact', { title: 'Inspect-It :: Home', active_tab: 'contact' });
}

exports.landing = landing;
exports.contact = contact;
exports.about = about;
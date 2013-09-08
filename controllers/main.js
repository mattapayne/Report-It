function landing(req, res) {
  res.render('main/index', { title: 'Inspector.ly :: Home', active_tab: 'home' });
}

function about(req, res) {
  res.render('main/about', { title: 'Inspector.ly :: Home', active_tab: 'about' });
}

function contact(req, res) {
  res.render('main/contact', { title: 'Inspector.ly :: Home', active_tab: 'contact' });
}

exports.landing = landing;
exports.contact = contact;
exports.about = about;
exports.index = function(req, res) {
  res.render('dashboard/index', { title: 'Inspector.ly :: Dashboard', active_tab: 'dashboard' });
}
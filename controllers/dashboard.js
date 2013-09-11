exports.index = function(req, res) {
  res.render('dashboard/index', { title: 'Inspect-It :: Dashboard', active_tab: 'dashboard' });
}
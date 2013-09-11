exports.index = function(req, res) {
  res.render('dashboard/index', { title: 'Report-It :: Dashboard', active_tab: 'dashboard' });
}
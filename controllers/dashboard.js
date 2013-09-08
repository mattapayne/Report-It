function index(req, res) {
  res.render('dashboard/index', { title: 'Dashboard' });
}

exports.index = index;
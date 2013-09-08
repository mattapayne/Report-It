function Dashboard() {
    
}

Dashboard.prototype.index = function(req, res) {
  res.render('dashboard/index', { title: 'Dashboard' });
}

exports.Dashboard = new Dashboard();
function Main() {

}

Main.prototype.landing = function(req, res) {
  res.render('main/index', { title: 'Express' });
}

exports.Main = new Main();
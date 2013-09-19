exports.extract = function(html) {
  REGEX = /([0-9a-f-]{36})/ig
  var matches = html.match(REGEX);
  return matches ? matches : [];
}
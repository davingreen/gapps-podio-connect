function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}
function buildUrl_(url, params) {
  var paramString = Object.keys(params).map(function(key) {
    return encodeURIComponent(key) + '=' + encodeURIComponent(params[key]);
  }).join('&');
  return url + (url.indexOf('?') >= 0 ? '&' : '?') + paramString;
}
function validate_(params) {
  Object.keys(params).forEach(function(name) {
    var value = params[name];
    if (isEmpty_(value)) {
      throw Utilities.formatString('%s is required.', name);
    }
  });
}
function isEmpty_(value) {
  return value === null || value === undefined ||
      ((_.isObject(value) || _.isString(value)) && _.isEmpty(value));
}
function getTimeInSeconds_(date) {
  return Math.floor(date.getTime() / 1000);
}
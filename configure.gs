var lodash = LodashGS.load();
function test() {
  var testPodio = configure('', '')
  Logger.log(testPodio.getItem(634953283))
  //Logger.log(testPodio.getAuthorizationUrl())

}
function reset() {
  getService().reset()
}
function getRedirectUri(scriptId) {
  return Utilities.formatString('https://script.google.com/macros/d/%s/usercallback', scriptId);
}
function getService() {
  return new Service_('podio')
  .setAuthorizationBaseUrl('https://podio.com/oauth/authorize')
  .setTokenUrl('https://podio.com/oauth/token')
  .setAPIUrl('https://api.podio.com')
  .setCallbackFunction('authCallback')
  .setPropertyStore(PropertiesService.getUserProperties());
}
function configure(clientId, clientSecret) {
  return getService().setClientId(clientId).setClientSecret(clientSecret);
}
function authCallback(request) {
  return defaultCallback(request)
}
function defaultCallback(request) {
  var template = HtmlService.createTemplateFromFile('Callback');
  template.user = Session.getEffectiveUser().getEmail();
  template.isAuthorized = false;
  template.error = null;
  var title;
  try {
    var service = getService();
    var authorized = service.handleCallback(request);
    template.isAuthorized = authorized;
    title = authorized ? 'Success!' : 'Access Denied';
  } catch (e) {
    template.error = e;
    title = 'Access Error';
  }
  template.title = title;
  return template.evaluate()
      .setTitle(title)
      .setSandboxMode(HtmlService.SandboxMode.IFRAME);
}
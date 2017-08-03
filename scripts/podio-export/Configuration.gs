// REMEMBER TO REPUBLISH AFTER CHANGES

var ClientsApp = 17983573
var SubscriptionsApp = 18293148
var RoutesApp = 17983745
var DeliveriesApp = 18655646

var Podio = PodioGS.configure('mowa-google-sheets', 'TOLgzHAON8D2NXTceXKYk6E1KUYxc3QGNTFm7enNf8h3DszUwCntBY5p3LsneeU3')
var _ = LodashGS.load()
var moment = Moment.load()

function testPost() {
  var e = {parameter : {item_revision_id:19, item_id:650432051, hook_id:6779494, type:'item.update'}}
  doPost(e)
}
function doPost(e) {
  var params = e.parameter
  if (!params.type || !params.hook_id) {
    return HtmlService.createHtmlOutput('Not valid.')
  }
  newActionDataRow([
    (!!params.item_id) ? params.item_id : '',
    params.type,
    (!!params.item_revision_id) ? params.item_revision_id : '',
    params.hook_id,
    new Date()
  ])
  switch (params.type) {
    case 'hook.verify' : {
      Podio.verifyHook(params.hook_id, params.code)
      break
    }
    case 'item.create' : {
      addItem(params.item_id)
      break
    }
    case 'item.update' : {
      updateItem(params.item_id)
    }
    default:
      break
  }
  
  return HtmlService.createHtmlOutput('Got it.')
}
function loadOptions() {
  if (!Podio.hasAccess()) {
    Podio.showLogin();
  } else {
    var template = HtmlService.createTemplateFromFile('SidebarOptions');
  
    template.date = getReportOptions();
    
    var page = template.evaluate()
    .setTitle('Podio Data Options')
    .setSandboxMode(HtmlService.SandboxMode.IFRAME);
    
    SpreadsheetApp.getUi().showSidebar(page);
  }
}

function authCallback(request) {
  return PodioGS.defaultCallback(request)
}
function newRow(sheetName, values) {
  dataSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName)
  if (values.length > 0)
    dataSheet.appendRow(values);
}
function findRow(sheetName, value) {
  var ids = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName).getRange("A:A").getValues()
  for(var i = 0; i < ids.length; i++) {
    if(ids[i] == value) {
      return i + 1
    }
  }
  return false
}
function updateRow(sheetName, row, values) {
  SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName).getRange(row, 1, 1, values.length).clearContent().setValues([values])
}
function sort(sheetName, col) {
    SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName).getDataRange().offset(1,0).sort(col)
}
function onOpen(e) {
  SpreadsheetApp.getUi()
  .createAddonMenu()
  .addItem('Set Podio Options', 'loadOptions')
  .addToUi();
}
function addDataRows(values, sheetName) {
  dataSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName)
  if (values.length > 0)
    dataSheet.getRange(3, 1, values.length, values[0].length).setValues(values);
  //setUpdateTimeValue(new Date())
}
function newActionDataRow(values) {
  SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Actions').appendRow(values)
}
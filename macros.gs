/*function oio() {
  var spreadsheet = SpreadsheetApp.getActive();
  spreadsheet.getRange('A1').activate();
  var allProtections = spreadsheet.getActiveSheet().getProtections(SpreadsheetApp.ProtectionType.SHEET);
  var protection = allProtections[0];
  protection.addTargetAudience('00upglbi3612vis');
};*/

/*function testing() {
  const obj = {
    message: "testing",
    field1: "abc",
    field2: {
      a: "field a",
      b: "field b",
    }
  }

  const response = sendPost(obj)
  const output = JSON.parse(response.getContentText())
  console.log(output)
  Logger.log(output)
}

function doPost(e) {
  const payload = JSON.parse(e.postData.contents)
  Logger.log(payload)
  console.log(payload)
  Logger.log(payload.message)
  Logger.log(payload.field1)
  Logger.log(payload.field2.a)
  Logger.log(payload.field2.b)

  return ContentService.createTextOutput(JSON.stringify({
    result: "Success",
    payload: payload,
  }))
}

function sendPost(payload) {
  console.log("sending POST", payload)
  return UrlFetchApp.fetch(
    ScriptApp.getService().getUrl(),
    {
      method: "post",
      headers: {
        "Authorization": "Bearer " + ScriptApp.getOAuthToken(),
        "contentType" : "application/json",
      },
      payload: JSON.stringify(payload),
    }
  )
}*/


/*function trocasTabelaz() {
  var spreadsheet = SpreadsheetApp.getActive();
  spreadsheet.getRange('M29').activate();
  spreadsheet.getRange('M30:N37').moveTo(spreadsheet.getActiveRange());
  spreadsheet.getRange('M22').activate();
  spreadsheet.getRange('M23:N36').moveTo(spreadsheet.getActiveRange());
  spreadsheet.getRange('M21:N32').activate();
  var currentCell = spreadsheet.getCurrentCell();
  spreadsheet.getSelection().getNextDataRange(SpreadsheetApp.Direction.DOWN).activate();
  currentCell.activateAsCurrentCell();
  spreadsheet.getRange('M20').activate();
  spreadsheet.getRange('M21:N35').moveTo(spreadsheet.getActiveRange());
  spreadsheet.getRange('M33:N39').activate();
  spreadsheet.getActiveRangeList().setBorder(null, null, null, null, true, true, '#000000', SpreadsheetApp.BorderStyle.SOLID)
  .setBorder(null, null, null, true, null, null, '#000000', SpreadsheetApp.BorderStyle.SOLID_MEDIUM)
  .setBorder(null, true, null, null, null, null, '#000000', SpreadsheetApp.BorderStyle.SOLID_MEDIUM);
};*/


function deleteUp() {
  var spreadsheet = SpreadsheetApp.getActive();
  spreadsheet.getRange('M7:N7').activate();
  spreadsheet.getRange('M7:N7').deleteCells(SpreadsheetApp.Dimension.ROWS);
};

function borders() {
  var spreadsheet = SpreadsheetApp.getActive();
  spreadsheet.getRange('M5:N57').activate();
  spreadsheet.setCurrentCell(spreadsheet.getRange('N57'));
  spreadsheet.getActiveRangeList().setBorder(true, true, true, true, null, null, '#000000', SpreadsheetApp.BorderStyle.SOLID_MEDIUM)
    .setBorder(null, null, null, null, true, true, '#000000', SpreadsheetApp.BorderStyle.SOLID);
};

function filtro() {
  var spreadsheet = SpreadsheetApp.getActive();
  spreadsheet.getRange('C2').activate();
  spreadsheet.getActiveSheet().getFilter().sort(3, true);
  spreadsheet.getRange('A2').activate();
  spreadsheet.getActiveSheet().getFilter().sort(1, true);
};

function moveline() {
  var spreadsheet = SpreadsheetApp.getActive();
  spreadsheet.getRange('2:2').activate();
  spreadsheet.getActiveSheet().moveRows(spreadsheet.getRange('2:2'), 33);
};

function changeColor() {
  spreadMotor.getRange(8, 1).activate().setValue('o script está a correr. aguarde.....').setFontWeight('bold').setHorizontalAlignment('center').setBackground('#666666').setFontColor('#ffffff')
  var spreadsheet = SpreadsheetApp.getActive();
  spreadsheet.getRange('H1:L1').activate();
  spreadsheet.getCurrentCell().setValue('o script está a correr. aguarde.....');
  spreadsheet.getActiveRangeList().setFontWeight('bold').setHorizontalAlignment('center').setBackground('#666666').setFontColor('#ffffff');
};

function changeNormal() {
  var spreadsheet = SpreadsheetApp.getActive();
  spreadsheet.getRange('H1:L1').activate();
  spreadsheet.getActiveRangeList().setBackground('#ffffff')
  .clear({contentsOnly: true, skipFilteredRows: true})
  .setFontWeight(null)
  .setFontColor('#000000');
};
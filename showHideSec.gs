function showSec() { //Mostra e esconde folhas
  var spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID)

  spreadsheet.getSheetByName('Instruções_Sec').showSheet();
  spreadsheet.getSheetByName(FOLHA_MOTOR).showSheet(); //esconde a folha 'MOD NIP'
  spreadsheet.getSheetByName(FOLHA_PRINTER).showSheet();
  spreadsheet.getSheetByName(FOLHA_DATAS).showSheet();
  spreadsheet.getSheetByName(FOLHA_INFO).showSheet();
  var spreadGeral = spreadsheet.getSheetByName(FOLHA_GERAL);
  spreadGeral.showColumns(14, 6);
};

function hideSec() {
  var spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID)

  spreadsheet.getSheetByName(FOLHA_MOTOR).hideSheet();
  spreadsheet.getSheetByName(FOLHA_PRINTER).hideSheet();
  spreadsheet.getSheetByName(FOLHA_DATAS).hideSheet();
  spreadsheet.getSheetByName('Instruções_Sec').hideSheet();
  spreadsheet.getSheetByName(FOLHA_INFO).hideSheet();
  var spreadGeral = spreadsheet.getSheetByName(FOLHA_GERAL);
  spreadGeral.hideColumns(14, 6);
};

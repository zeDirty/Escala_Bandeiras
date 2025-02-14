function coloca_false(linha) { //Coloca checkbox em false no Tester Coluna Verificações
  console.log('coloca falsoo linha='+linha)
  var spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
  var spreadTester = spreadsheet.getSheetByName(FOLHA_ALUNOS);
  spreadTester.getRange(linha, 17).setValue(false); //coloca os valores em "false" nas colunas em que se colocou "true"
}

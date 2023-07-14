function coloca_false(linha, coluna) { //Coloca checkbox em false no Tester Coluna Verificações
  var linha = linha
  var coluna = coluna
  console.log('coloca falsoo')
  var spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
  var spreadTester = spreadsheet.getSheetByName(FOLHA_ALUNOS);
  spreadTester.getRange(linha, coluna).setValue(false); //coloca os valores em "false" nas colunas em que se colocou "true"
}

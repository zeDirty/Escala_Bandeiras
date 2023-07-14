function printFinal() { //print da escala(s) a imprimir

  var spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
  var spreadGeral = spreadsheet.getSheetByName(FOLHA_GERAL);
  var spreadPrinter = spreadsheet.getSheetByName(FOLHA_PRINTER);
  var eet = spreadsheet.getSpreadsheetTimeZone();
  const numCelula = spreadGeral.getRange('R15').getValue(); //numero que está na celula P15
  console.log(numCelula)
  let escalas = spreadGeral.getRange(1, 1, 19 * (numCelula), 13).getValues(); //vai buscar as escalas consuante valor em P15

  spreadPrinter.deleteColumns(1, 11); //elimina colunas e assim o print anterior
  spreadPrinter.insertColumns(1, 13); //insere novas colunas
  spreadPrinter.getRange(1, 1, 19 * (numCelula), 13).setValues(escalas); //faz o print das escalas no "printer"
  spreadPrinter.deleteColumn(6); //elimina coluna com numeros de tlm (E)
  spreadPrinter.deleteColumn(12); //elimina coluna com numeros de tlm (J)
  spreadPrinter.setColumnWidth(1, 70); //NIP
  spreadPrinter.setColumnWidth(2, 60); //POSTO
  spreadPrinter.setColumnWidth(3, 70); //ESP
  spreadPrinter.setColumnWidth(4, 50); //CAL
  spreadPrinter.setColumnWidth(5, 133); //NOME
  spreadPrinter.setColumnWidth(6, 50); //PT/PD
  spreadPrinter.setColumnWidth(7, 70); //NIP
  spreadPrinter.setColumnWidth(8, 60); //POSTO
  spreadPrinter.setColumnWidth(9, 70); //ESP
  spreadPrinter.setColumnWidth(10, 50); //CAL
  spreadPrinter.setColumnWidth(11, 133); //NOME

  for (let i = 1; i <= numCelula; i++) { //Formatação das escalas
    const dater = Utilities.formatDate(spreadGeral.getRange(19 * i - 17, 1).getValue(), eet, 'dd/MMMyyyy').toUpperCase().replace('/', '');
    spreadPrinter.deleteRow(21 * i - 19); //elimina uma linha de 21 em 21, começa na 2
    spreadPrinter.insertRowsAfter(21 * i - 20, 2); //insere duas linhas antes de 21 em 21, começa na 1
    spreadPrinter.insertRowBefore(21 * i - 20); //insere uma linha após de 21 em 21, começa na 1
    //console.log(dater);
    spreadPrinter.getRange(21 * i - 17, 1).setValue(dater); //coloca a data no printer
    spreadPrinter.getRange(21 * i - 17, 1, 1, 11).activate().mergeAcross().setFontWeight('bold'); //merge das celulas da data
    spreadPrinter.getRange(21 * i - 15, 1, 1, 5).activate().mergeAcross().setFontLine('underline').setFontWeight('bold'); //merge das celulas "efetivo"
    spreadPrinter.getRange(21 * i - 15, 7, 1, 5).activate().mergeAcross().setFontLine('underline').setFontWeight('bold'); //merge das celulas "troca"
    spreadPrinter.getRange(21 * i - 19, 1, 1, 11).activate().mergeAcross(); //merge das celulas 'ESCALA DE SERVIÇO...'
    spreadPrinter.getRange(21 * i - 19, 1).setValue('ESCALA DE SERVIÇO DE GUARDA DE HONRA À BANDEIRA NACIONAL').setHorizontalAlignment('center').setFontLine('underline').setFontWeight('bold'); //formatação da celula
    spreadPrinter.getRange(1, 1, 21 * i, 11).activate().setHorizontalAlignment('center'); //Alinhamento Horizontal
  }
  spreadPrinter.getRange('A:K').setBorder(true, true, true, true, true, true, COLOR_WHITE, SpreadsheetApp.BorderStyle.SOLID); //Borders
  for (let a = 1; a <= numCelula; a++) {
    spreadPrinter.getRange(21 * a - 15, 1, 16, 11).setBorder(true, true, true, true, true, true, COLOR_BLACK, SpreadsheetApp.BorderStyle.SOLID); //borders de tocas as escalas
  }
  spreadPrinter.deleteRow(1); //elimina 1ª linha da folha datas
  var folha = SpreadsheetApp.getActive();
  folha.setActiveSheet(folha.getSheetByName(FOLHA_PRINTER), true);
};
function check_Editor(editor, linha, coluna) {//Verifica quem está a editar as checkboxs no tester
  var spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
  var spreadInfos = spreadsheet.getSheetByName(FOLHA_INFO);
  var spreadTester = spreadsheet.getSheetByName(FOLHA_ALUNOS);
  var rangeTesterO3P20 = spreadTester.getRange("O3:P20").getValues();
  var rangeInfosBH = spreadInfos.getRange("B:H").getValues();
  let email_editor = editor
  let row = linha - 3
  let column = coluna
  let nipOTester = rangeTesterO3P20[row][0]; //Nip do efetivo onde ocorreu a atualizaçao de celula
  let nipPTester = rangeTesterO3P20[row][1]; //Nip da troca onde ocorreu a atualizaçao de celula

  console.log(rangeInfosBH.length)
  for (let a = 0; a < rangeInfosBH.length; a++) {
    let emailColH_infos = rangeInfosBH[a][6];
    if (emailColH_infos == email_editor) { //comparação do email do editor e dos emails das informações
      let nipInfos = rangeInfosBH[a][0];
      console.log("row: " + row + " col: " + column)
      if (column == 17 && nipOTester == nipInfos) { //nip do editor com o nip no O
        return;
      } else if (column == 18 && nipPTester == nipInfos) { //nip do editor com o nip no P
        return;
      } else {
        spreadTester.getRange((row + 3), column).setValue(false); //coloca os valores em "false" nas colunas em que se colocou "true"
        var ui = SpreadsheetApp.getUi();
        ui.alert('Não pode efetuar esta ação', 'Se for o aluno efetivo apenas o efetivo pode verificar a troca, o mesmo se aplica ao aluno troca.', ui.ButtonSet.OK);
        throw new Error('Stopping execution'); // Throw an error to stop both functions
      }
    }
  }
}

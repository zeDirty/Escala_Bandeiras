function aceitarTrocas(linha) { //Vai à folha informações buscar infos para enviar email ao aluno em O (Tester) e à secretaria.
  var liner = linha;
  var spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
  var spreadTester = spreadsheet.getSheetByName(FOLHA_ALUNOS);
  var spreadMotor = spreadsheet.getSheetByName(FOLHA_MOTOR);
  var spreadInfos = spreadsheet.getSheetByName(FOLHA_INFO);
  var rangeTesterO3P20 = spreadTester.getRange("O3:P20").getValues();
  var rangeInfosBH = spreadInfos.getRange("B:H").getValues();
  let nipOTester = rangeTesterO3P20[liner - 3][0]; //Nip do efetivo onde ocorreu a atualizaçao de celula
  let nipPTester = rangeTesterO3P20[liner - 3][1]; //Nip da troca onde ocorreu a atualizaçao de celula
  console.log('aceitarTrocas linha: ' + liner)
  console.log(nipOTester, nipPTester)

  for (let b = 0; b < rangeInfosBH.length; b++) { //Infos do nip em O Tester
    let nipInfosB = rangeInfosBH[b][0]; //NIPs na folha motor
    if (nipOTester == nipInfosB) { //Se nip efetivo == NIP no motor (VLOOKUP)
      var postoNipO = rangeInfosBH[b][1]; //posto
      var espNipO = rangeInfosBH[b][2]; //especialidade
      var nomeNipO = rangeInfosBH[b][4]; //nome
      var emailNipO = rangeInfosBH[b][6]; //email
       
    }
  }
  for (let c = 2; c < rangeInfosBH.length; c++) { //Infos do nip em P Tester
    let nipInfosB = rangeInfosBH[c][0]; //nips da folha motor
    if (nipPTester == nipInfosB) { //Se nip troca == NIP no motor (VLOOKUP)
      var emailNipP = rangeInfosBH[c][6]; //email
      var postoNipP = rangeInfosBH[c][1];
      var espNipP = rangeInfosBH[c][2];
      var nomeNipP = rangeInfosBH[c][4]; //nome
    }
  }
  console.log('aceitarTrocas:', emailNipO, nomeNipO, emailNipP)
  //MailApp.sendEmail(emailNipO,"Pedido de troca, Escala de Bandeira",'A sua troca para o serviço de bandeira foi aceite pelo/a '+postoNipP+'/'+espNipP+' '+nomeNipP+'.\n\nAguarde autorização da secretaria para confirmar a troca.\n\n'+LINK_PARTILHAR, {name: 'José Tostes'});
  Utilities.sleep(100);
  //MailApp.sendEmail(EMAILSECRETARIA,"Pedido de troca, Escala de Bandeira",'Foi registada uma troca entre '+postoNipO+'/'+espNipO+' '+nipOTester+' '+nomeNipO+' e o '+postoNipP+'/'+espNipP+' '+nipPTester+' '+nomeNipP+' que já foi aceite por ambas as partes. Para autorizar a troca, clicar na checkbox da secretaria na linha ('+liner+') da troca solicitada.\n\n'+LINK_PARTILHAR);
  spreadsheet.setActiveSheet(spreadsheet.getSheetByName(FOLHA_ALUNOS), true);
  return
};
function aceitarTrocas(linha) { //Vai à folha informações buscar infos para enviar email ao aluno em O (Tester) e à secretaria.
  //var liner = 8;
  console.log('aceite aluno destroca: ' + linha)
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
      var postoNipO = rangeInfosBH[b][2]; //posto
      var espNipO = rangeInfosBH[b][3]; //especialidade
      var nomeNipO = rangeInfosBH[b][4]; //nome
      var emailNipO = rangeInfosBH[b][6]; //email

    }
  }
  for (let c = 2; c < rangeInfosBH.length; c++) { //Infos do nip em P Tester
    let nipInfosB = rangeInfosBH[c][0]; //nips da folha motor
    if (nipPTester == nipInfosB) { //Se nip troca == NIP no motor (VLOOKUP)
      var emailNipP = rangeInfosBH[c][6]; //email
      var postoNipP = rangeInfosBH[c][2];
      var espNipP = rangeInfosBH[c][3];
      var nomeNipP = rangeInfosBH[c][4]; //nome
    }
  }

  console.log('aceitarTrocas:', emailNipO, nomeNipO, emailNipP)


  var emailBodyAluno = 'A sua troca para o serviço de bandeira foi aceite pelo/a ' +
  postoNipP + '/' + espNipP + ' ' + nomeNipP + '.<br>' +
  'Aguarde autorização da secretaria para confirmar a troca.<br><br>' + LINK_PARTILHAR;

  //console.log('Email Body (Aluno):', emailBodyAluno);

  MailApp.sendEmail(emailNipO, "Pedido de troca, Escala de Bandeira", emailBodyAluno, { htmlBody: emailBodyAluno, name: 'José Tostes' });
  

  Utilities.sleep(100);
  

  var emailBodySecretaria = 'Foi registada uma troca entre ' +
  postoNipO + '/' + espNipO + ' ' + nipOTester + ' ' + nomeNipO +
  ' e o ' + postoNipP + '/' + espNipP + ' ' + nipPTester + ' ' + nomeNipP +
  ' que já foi aceite por ambas as partes. Para autorizar a troca, clicar na checkbox da secretaria na linha (' + liner + ') da troca solicitada.<br><br>' + LINK_PARTILHAR;

  //console.log('Email Body (Secretaria):', emailBodySecretaria);

  MailApp.sendEmail(EMAILSECRETARIA, "Pedido de troca, Escala de Bandeira", emailBodySecretaria, { htmlBody: emailBodySecretaria });


  var protections = spreadsheet.getProtections(SpreadsheetApp.ProtectionType.RANGE) //remove a celula protegida na coluna O e P do tester
  for (var i = 0; i < protections.length; i++) {
    var protection = protections[i];
    if (protection.getRangeName() == "Test" + liner + liner) {
      protection.remove();
    }
  }

  var range = spreadTester.getRange(liner, 15, 1, 4); //range onde estao os nips na folha tester. Com o objetivo de nao se editar os nips
  var protection = range.protect().setDescription('Protecao_' + (liner));
  spreadsheet.setNamedRange('Test' + (liner) + (liner), range); // Create a named range.
  protection.setRangeName('Test' + (liner) + (liner));
  protection.removeTargetAudience(GRUPO_ACADEMIA);

  spreadsheet.setActiveSheet(spreadsheet.getSheetByName(FOLHA_ALUNOS), true);
  return
};
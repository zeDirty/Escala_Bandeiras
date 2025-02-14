function emailSender(payload) { //Após verificações (verificarTester) envia email para NIP em P Tester. Proteje celulas O e P na tabela de trocas

  var spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
  var spreadInfos = spreadsheet.getSheetByName(FOLHA_INFO);
  var spreadTester = spreadsheet.getSheetByName(FOLHA_ALUNOS);
  var rangeInfosBH = spreadInfos.getRange("B:H").getValues();
  var linha = payload.messageContent.liner
  var nipPTester = payload.messageContent.nipPTester
  var nipOTester = payload.messageContent.nipOTester
  //var nomeNipO = payload.messageContent.nomeNipO
  //var postoNipO = payload.messageContent.postoNipO
  //var espNipO = payload.messageContent.espNipO

  console.log('function emailSender')
  console.log('payçoad content ' + payload.messageContent)
  console.log('pay: ' + payload)
  console.log('nipNTESTER ' + nipPTester)
  console.log('linhaaaaaaaaaaaa ' + linha)
  console.log('nome NIP M ' + nomeNipO)

  for (let i = 2; i < rangeInfosBH.length; i++) { //(VLOOKUP)
    let nipMotor = rangeInfosBH[i][0]; //NIP da folha motor
    //console.log(nipMotor)
    if (nipPTester == nipMotor) { //Se NIP da folha motor == NIP em P do tester 
      var emailNipP = rangeInfosBH[i][6]; //email do nip P
      var nomeNipP = rangeInfosBH[i][4]; //Nome do NIP P
      //console.log(emailNipP, nomeNipP)
    }
  }

  for (let i = 2; i < rangeInfosBH.length; i++) { //(VLOOKUP)
    let nipMotor = rangeInfosBH[i][0]; //NIP da folha motor
    //console.log(nipMotor)
    if (nipOTester == nipMotor) { //Se NIP da folha motor == NIP em O do tester 
      //var emailNipO = rangeInfosBH[i][6]; //email do nip O
      var nomeNipO = rangeInfosBH[i][4]; //Nome do NIP O
      var postoNipO = rangeInfosBH[i][2]; //Posto do NIP O
      var espNipO = rangeInfosBH[i][3]; //Especialidade do NIP O
      //console.log(emailNipP, nomeNipP)
    }
  }

  console.log('emaialNipN: ' + emailNipP);
  MailApp.sendEmail(emailNipP, 'Pedido de troca, Escala de Bandeira', 'Foi registada uma troca com o seu NIP ('+nipPTester+') com '+postoNipO+'/'+espNipO+' '+nomeNipO+'.\n\nSe desejar aceitar esta troca, entre no link e aceite na folha "Tester", clicando na checkbox, na linha ('+linha+') do seu NIP para que a troca seja posteriormente autorizada pela secretaria.\n\n'+LINK_PARTILHAR, {name: 'José Tostes'});

  var range = spreadTester.getRange(linha, 15, 1, 3); //range onde estao os nips na folha tester. Com o objetivo de nao se editar os nips
  var protection = range.protect().setDescription('Protecao_' + (linha));
  spreadsheet.setNamedRange('Test' + (linha) + (linha), range); // Create a named range.
  protection.setRangeName('Test' + (linha) + (linha));
  protection.removeTargetAudience(GRUPO_ACADEMIA);
  console.log('final emailSender3')
  return;
}
function aceitarSecretaria(linha) {   //copiar nips na lista do tester e colar no geral, eliminar nips no tester. verificar, aceitar e secretaria 'false'.
  console.log('1234 aceita Secretaria: ' + linha)
  var liner = linha;
  var spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
  var spreadGeral = spreadsheet.getSheetByName(FOLHA_GERAL);
  var spreadTester = spreadsheet.getSheetByName(FOLHA_ALUNOS);
  var spreadInfos = spreadsheet.getSheetByName(FOLHA_INFO);
  var rangeGeralO5P57 = spreadGeral.getRange("O5:P57").getValues();
  var rangeTesterO3P20 = spreadTester.getRange("O3:P20").getValues();
  var rangeInfosBH = spreadInfos.getRange("B:H").getValues();
  let nipMTester = rangeTesterO3P20[liner - 3][0]; //Nip do efetivo onde ocorreu a atualizaçao de celula
  let nipNTester = rangeTesterO3P20[liner - 3][1]; //Nip da troca onde ocorreu a atualizaçao de celula

  for (let b = 2; b < rangeInfosBH.length; b++) { //Infos do aluno
    let nipMotorBB = rangeInfosBH[b][0]; //NIPs na folha motor
    if (nipMTester == nipMotorBB) { //Se nip efetivo == NIP no motor (VLOOKUP)
      var emailNipO = rangeInfosBH[b][6]; //email
      var nomeNipO = rangeInfosBH[b][4]; //nome
    }
  }
  for (let c = 2; c < rangeInfosBH.length; c++) { //Infos do aluno
    let nipMotorBB = rangeInfosBH[c][0]; //nips da folha motor
    if (nipNTester == nipMotorBB) { //Se nip troca == NIP no motor (VLOOKUP)
      var emailNipP = rangeInfosBH[c][6]; //email
      var nomeNipO = rangeInfosBH[c][4]; //nome
    }
  }
  console.log([emailNipO + emailNipP])
  MailApp.sendEmail(emailNipO, "Pedido de troca, Escala de Bandeira", 'A sua troca foi aceite pela secretaria.\n\n' + LINK_PARTILHAR, { name: 'José Tostes' });
  Utilities.sleep(100);
  MailApp.sendEmail(emailNipP, "Pedido de troca, Escala de Bandeira", 'A sua troca foi aceite pela secretaria.\n\n' + LINK_PARTILHAR, { name: 'José Tostes' });

  for (let d = 0; d < rangeGeralO5P57.length; d++) { //Alterações nas Folhas
    let nipOGeral = rangeGeralO5P57[d][0];
    let nipPGeral = rangeGeralO5P57[d][1];
    if (nipOGeral == '' && nipPGeral == '') { //verifica quais são os espaços vazios na folha geral na tabela das trocas que estão vazios
      spreadGeral.getRange(d + 5, 15).setValue(nipMTester); //coloca os nips na folha geral
      spreadGeral.getRange(d + 5, 16).setValue(nipNTester); //coloca os nips na folha geral
      spreadTester.getRange(liner, 17).setValue(false); //coloca os valores em "false" nas colunas em que se colocou "true"
      spreadTester.getRange(liner, 18).setValue(false); //coloca os valores em "false" nas colunas em que se colocou "true"
      spreadTester.getRange(liner, 19).setValue(false); //coloca os valores em "false" nas colunas em que se colocou "true"
      spreadTester.getRange(liner, 15).clearContent(); //limpa os nips na folha tester na tabela das trocas
      spreadTester.getRange(liner, 16).clearContent(); //limpa os nips na folha tester na tabela das trocas

      var protections = spreadsheet.getProtections(SpreadsheetApp.ProtectionType.RANGE) //remove a celula protegida na coluna O e P do tester
      for (var i = 0; i < protections.length; i++) {
        var protection = protections[i];
        if (protection.getRangeName() == "Test" + liner + liner) {
          protection.remove();
        }
      }

      aCode();

      return;
    }
  }

};
function verificarTester(linha) { //Verifica se alunos estão de dispensa, troca e destroca na mesma escala, destroca primeiro que a troca, se alunos já estão a trocar
  var spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
  var spreadGeral = spreadsheet.getSheetByName(FOLHA_GERAL);
  var spreadMotor = spreadsheet.getSheetByName(FOLHA_MOTOR);
  var spreadTester = spreadsheet.getSheetByName(FOLHA_ALUNOS);
  //var spreadInfos = spreadsheet.getSheetByName(FOLHA_INFO);
  var rangeGeralAA = spreadGeral.getRange("A:A").getValues();
  var rangeGeralOO = spreadGeral.getRange("O:O").getValues();
  var rangeGeralPP = spreadGeral.getRange("P:P").getValues();
  //var rangeInfosBH = spreadInfos.getRange("B:H").getValues();
  //var rangeInfosBB = spreadInfos.getRange("B:B").getValues();
  var rangeTesterOO = spreadTester.getRange("O:O").getValues();
  var rangeTesterPP = spreadTester.getRange("P:P").getValues();
  var rangeMotorBE = spreadMotor.getRange("B:E").getValues();
  var rangeMotorBB = spreadMotor.getRange("B:B").getValues();
  var liner = linha;
  let nipOTester = rangeTesterOO[liner - 1][0]; //NIP em O do tester
  let nipPTester = rangeTesterPP[liner - 1][0]; //NIP em P do tester
  //console.log(nipOTester + nipPTester)
  const dataHoje = new Date()

  for (let f = 1; f < rangeMotorBB.length; f++) { //Verifica se os alunos estão de dispensa
    let dataFimDisp = rangeMotorBE[f][3];
    if (dataFimDisp !== '' && dataFimDisp - dataHoje >= 0) {
      let nipInfos = rangeMotorBE[f][0]
      //console.log(nipInfos)
      if (nipInfos == nipOTester) {
        console.log('Efetivo')
        spreadTester.getRange(liner, 17).setValue(false); //coloca os valores em "false" nas colunas em que se colocou "true"
        json = JSON.stringify({
          message: ALUNO_EFETIVO_DISPENSA
        });
        return json
      } else if (nipInfos == nipPTester) {
        console.log('Troca')
        spreadTester.getRange(liner, 17).setValue(false); //coloca os valores em "false" nas colunas em que se colocou "true"
        json = JSON.stringify({
          message: ALUNO_TROCA_DISPENSA
        })
        return json
      }
    }
  }

  for (let a = 0; a < rangeGeralAA.length; a++) { //verifica se os alunos estão a fazer troca e destroca na mesma escala
    if (a % 19 >= 4 && rangeGeralAA[a] != '') {
      let nipAGeral = rangeGeralAA[a][0]; //NIP em A do geral
      console.log(nipOTester,nipAGeral)
      if (nipOTester == nipAGeral) { //Se NIP em O do tester == NIP em A do geral
        const d = Math.floor(a / 19) + 1;
        let escalaNipM = spreadGeral.getRange(19 * d - 14, 1, 15, 1).getValues(); //escala onde está o nip em O
        for (let b = 0; b < escalaNipM.length; b++) {
          let colunaNips = escalaNipM[b][0]; //NIPs da escala onde está NIP em O do Tester
          if (colunaNips == nipPTester) { //Se NIP na escala for == NIP em P do tester
            console.log('troca destroca')
            spreadTester.getRange(liner, 17).setValue(false); //coloca os valores em "false" nas colunas em que se colocou "true"
            json = JSON.stringify({
              message: ALUNOS_TROCA_DESTROCA
            })
            return json
          }
        }
      }
    }
  }
  for (let g = 0; g < rangeGeralAA.length; g++) { //Verifica se a destroca acontece primeiro que a troca
    if (g % 19 >= 4 && rangeGeralAA[g] != '') {
      let nipGeralA_PT = rangeGeralAA[g][0];
      if (nipOTester == nipGeralA_PT) { //se forem iguais coloca o valor que está em O em A 
        const linhaNipGeralA_PT = g;
        console.log(linhaNipGeralA_PT);
        for (let h = 0; h < rangeGeralAA.length; h++) {
          if (h % 19 >= 4 && rangeGeralAA[h] != '') {
            let nipGeralA_PD = rangeGeralAA[h][0];
            if (nipPTester == nipGeralA_PD) { //se forem iguais coloca o valor que está em P em H(no geral)
              const linhaNipGeralA_PD = h;
              console.log(linhaNipGeralA_PD);
              if (linhaNipGeralA_PT > linhaNipGeralA_PD) {
                console.log('Destroca_Troca');
                spreadTester.getRange(liner, 17).setValue(false); //coloca os valores em "false" nas colunas em que se colocou "true"
                json = JSON.stringify({
                  message: PD_PT
                });
                return json
              }
            }
          }
        }
      }
    }
  }
  //Verifica se os alunos já estão a trocar
  for (let x = 2; x < rangeGeralOO.length; x++) { //Verifica se NIPs para troca no tester estão nos NIPs para troca na folha geral (O no tester VS O e P no Geral)
    if (rangeGeralOO[x] == '') continue; //salta as celulas vazias
    let nipOGeral = rangeGeralOO[x][0]; //NIP em O do Geral
    let nipPGeral = rangeGeralPP[x][0]; //NIP em P do Geral
    if (nipOTester == nipOGeral || nipOTester == nipPGeral) { //Se NIP em O do tester == NIP em O do Geral OU NIP em O do tester == NIP em P do Geral
      console.log('aluno efetivo a trocar')
      /*spreadTester.getRange(liner, 15).clearContent(); //caso seja verdade irá eliminar os NIPs
      spreadTester.getRange(liner, 16).clearContent();
      spreadTester.getRange(liner, 17).setValue(false); //coloca os valores em "false" nas colunas em que se colocou "true"
      json = JSON.stringify({
        message: ALUNO_EFETIVO_A_TROCAR
      })
      return json*/
      //Se tanto o NIP em O do Tester e o NIP em P do Tester estiver na tabela geral, o programa vai continuar para envio de email
      json = JSON.stringify({
        message: ALUNO_EFETIVO_A_TROCAR,
        messageContent: {
          nipOTester,
          nipPTester,
          liner
        }
      })
      return json
    } else if (nipPTester == nipOGeral || nipPTester == nipPGeral) { //Se NIP em P do tester == NIP em O do Geral OU NIP em P do tester == NIP em P do Geral
      console.log('aluno troca a trocar')
      /*spreadTester.getRange(liner, 15).clearContent(); //caso seja verdade irá eliminar os NIPs
      spreadTester.getRange(liner, 16).clearContent();
      spreadTester.getRange(liner, 17).setValue(false); //coloca os valores em "false" nas colunas em que se colocou "true"
      json = JSON.stringify({
        message: ALUNO_TROCA_A_TROCAR
      return json
      })*/
      //Se tanto o NIP em O do Tester e o NIP em P do Tester estiver na tabela geral, o programa vai continuar para envio de email
      json = JSON.stringify({
        message: ALUNO_TROCA_A_TROCAR,
        messageContent: {
          nipOTester,
          nipPTester,
          liner
        }
      })
      return json
    }
  }
  //Envio de email caso não haja erros
  json = JSON.stringify({
    message: CONTINUACAO_EMAIL,
    messageContent: {
      nipOTester,
      nipPTester,
      liner
    }
  })
  return json
};
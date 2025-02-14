/*Primeiro for guarda o nip da folha tester da celula A3 e vai compara lo com os nips na coluna H da folha Geral. Se o encontrar irá colocar a escala onde aparece o mesmo na posição (8,1,18,13) da folha tester. Coloca a data da escala na celula (6, 3). Coloca a cor de fundo
Segundo for guarda o nip da folha tester da celula A3 e vai compara lo com os nips na coluna A da folha Geral. Coloca data na celula (6,2). Caso a celula A11 estiver vazia então vai fazer o print da escala na posição (8,1,18,11) e colocar a cor de fundo. Caso a celula A11 não estiver vazia irá fazer o print da escala na posição (27, 1, 18, 11) e colocar as cores de fundo*/

function printTable() { //imprime as escalas de quando o aluno irá fazer serviço Tester
  acquireLock();
  try {
    var spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID)
    var spreadTester = spreadsheet.getSheetByName(FOLHA_ALUNOS)
    var spreadGeral = spreadsheet.getSheetByName(FOLHA_GERAL)
    var rangeGeralHH = spreadGeral.getRange("H:H").getValues();
    var rangeGeralAA = spreadGeral.getRange("A:A").getValues();
    const nipTester = spreadTester.getRange('A3').getValue();
    spreadTester.getRange("A8:M45").clearContent(); //elimina conteúdo da celula A8:K45
    spreadTester.getRange("B6:C6").clearContent(); //elimina conteúdo da celula B6:C6
    spreadTester.getRange(11, 8, 15, 1).setBackground(COLOR_WHITE);
    spreadTester.getRange(30, 8, 15, 1).setBackground(COLOR_WHITE);

    for (let c = 0; c < rangeGeralHH.length; c++) {//Comparação A3 Tester com coluna H geral. Coloca escala no primeiro espaço
      if (c % 19 >= 4 && rangeGeralAA[c] != '') {
        let nipGeralH = rangeGeralHH[c][0]; //NIPs na coluna H da folha Geral
        if (nipGeralH == nipTester) { //se a celula A3 for igual ao NIP na coluna H
          const d = Math.floor(c / 19) + 1;
          let escalaNip = spreadGeral.getRange(19 * d - 17, 1, 18, 13).getValues(); //escala onde se entra o nip
          spreadTester.getRange(8, 1, 18, 13).setValues(escalaNip); //set values da escala
          let dataEscala = spreadGeral.getRange((19 * d - 17), 1).getValue(); //data correspondente à escala onde se encontra o NIP
          spreadTester.getRange(6, 3).setValue(dataEscala); //set value da data
          for (let i = 0; i <= 14; i++) { //percorre escala para alterar cor background
            let colorBack = spreadGeral.getRange(19 * d - 14 + i, 8).getBackground();
            //console.log('Nip: '+escalaNip[i][0])
            if (colorBack == COLOR_WHITE) continue;
            //console.log('1º for '+celorOne+' d '+d+' i '+i)
            spreadTester.getRange(11 + i, 8).setBackground(colorBack); //set color da escala
          }
        }
      }
      let celTrocaData = spreadTester.getRange(6, 3);
      if (celTrocaData.isBlank()) { //caso celula vazia considera que aluno está de dispensa
        celTrocaData.setValue('Sem Trocas');
      }
    }

    for (let b = 0; b < rangeGeralAA.length; b++) { //Comparação A3 Tester com coluna A geral. Caso A11 vazio coloca no primeiro, caso contrario no segundo.
      if (b % 19 >= 4 && rangeGeralAA[b] != '') {
        let nipGeralA = rangeGeralAA[b][0]; //NIPs na coluna A da folha Geral
        if (nipGeralA == nipTester) { //se a celula A3 for igual ao NIP na coluna A
          const a = Math.floor(b / 19) + 1;
          let dataEscala = spreadGeral.getRange((19 * a - 17), 1).getValue(); //data correspondente à escala onde se encontra o NIP
          spreadTester.getRange(6, 2).setValue(dataEscala); //set value da data
          if (spreadTester.getRange(11, 1).isBlank()) { //se a celula A11 estiver vazia
            let escalaEfetivo = spreadGeral.getRange(19 * a - 17, 1, 18, 13).getValues(); //vai buscar escala onde NIP em A3 está na coluna A de Geral
            spreadTester.getRange(8, 1, 18, 13).setValues(escalaEfetivo); //print dessa escala
            for (let f = 0; f <= 14; f++) { //backGroundColor
              let colorBackTwo = spreadGeral.getRange(19 * a - 14 + f, 8).getBackground();
              //let rangeNo = spreadGeral.getRange(19 * a - 14 + f, 8).getValues();
              //console.log('Nip: '+ rangeNo[0][0])
              if (colorBackTwo == COLOR_WHITE) continue;
              //console.log('segundo for 1d '+celorTwo+' a '+a+' f '+f)
              spreadTester.getRange(11 + f, 8).setBackground(colorBackTwo); //set color da escala
            }
          } else {
            let escalaTroca = spreadGeral.getRange(19 * a - 17, 1, 18, 13).getValues(); //vai buscar escala onde NIP em A3 está na coluna A de Geral
            spreadTester.getRange(27, 1, 18, 13).setValues(escalaTroca); //print dessa escala
            for (let g = 0; g <= 14; g++) {
              let colorBackTree = spreadGeral.getRange(19 * a - 14 + g, 8).getBackground();
              if (colorBackTree == COLOR_WHITE) continue;
              //console.log('terceiro for 1d '+colorBackTree+' a '+a+' g '+g)
              spreadTester.getRange(30 + g, 8).setBackground(colorBackTree); //set color da escala
            }
          }
        }
      }
      let ce = spreadTester.getRange(6, 2);
      if (ce.isBlank()) {
        //caso celula vazia considera que aluno está de dispensa
        ce.setValue('Dispensa');
      }
    }
    let celTrocaData = spreadTester.getRange(8, 1);
    if (celTrocaData.isBlank()) { //caso celula vazia considera que aluno está de dispensa
      spreadTester.getRange(6, 3).setValue('Sem data');
      spreadTester.getRange(6, 2).setValue('Sem data');
    }
    let celTrocaDisp = spreadTester.getRange(11, 1);
    if (celTrocaDisp.isBlank()) { //caso celula vazia considera que aluno está de dispensa
      spreadTester.getRange(6, 3).setValue('Dispensa');
      spreadTester.getRange(6, 2).setValue('Dispensa');
    }
  } catch (error) {
    // Handle any errors that occur during script execution
    console.error(error);
  } finally {
    // Release the lock after the script finishes running
    releaseLock();
  }
};
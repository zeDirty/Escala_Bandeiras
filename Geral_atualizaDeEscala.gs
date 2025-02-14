function tiraTrocas() { //altera cor do fundo das celulas em O e P consuante PT e PD em G na folha Geral. Altera data de ultimo serviço na Folha Motor

  var spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
  var spreadGeral = spreadsheet.getSheetByName(FOLHA_GERAL);
  var spreadMotor = spreadsheet.getSheetByName(FOLHA_MOTOR);
  var spreadDatas = spreadsheet.getSheetByName(FOLHA_DATAS);
  var rangeGeralA5H19 = spreadGeral.getRange("A5:H19").getValues();
  var rangeGeralOO = spreadGeral.getRange("O:O").getValues();
  var rangeGeralPP = spreadGeral.getRange("P:P").getValues();
  var dataEscala = spreadGeral.getRange("A2").getValue();
  var rangeMotorBB = spreadMotor.getRange("B:B").getValues();

  for (let a = 0; a <= 14; a++) { //altera cor da tabela de trocas quando aluno faz serviço
    let ptPD = rangeGeralA5H19[a][6]; // PT ou PD de G
    let nipH = rangeGeralA5H19[a][7]; //NIP em H
    let nipA = rangeGeralA5H19[a][0]; //NIP em A
    if (ptPD == 'PT') { //se PT/PD em F = PT
      for (let b = 4; b < rangeGeralPP.length; b++) { //altera cor da tabela de trocas quando aluno faz serviço
        if (rangeGeralPP[b] != '') {
          let nipP = rangeGeralPP[b][0]; //NIP em P
          if (nipH == nipP) { //se NIP em H == NIP em P
            spreadGeral.getRange(b + 1, 16).setBackground(COLOR_RED); //cor de fundo da celula em P
          }
        }
      }
    } else if (ptPD == 'PD') { //se PT/PD em G = PD
      for (let c = 4; c < rangeGeralOO.length; c++) { //altera cor da tabela de trocas quando aluno faz serviço
        if (rangeGeralOO[c] != '') {
          let nipO = rangeGeralOO[c][0]; //NIP em O
          if (nipH == nipO) { //se NIP em H == NIP em O
            spreadGeral.getRange(c + 1, 15).setBackground(COLOR_RED); //cor de fundo da celula em M
          }
        }
      }
    }
    for (let d = 1; d < rangeMotorBB.length; d++) { //altera a data de ultimo serviço
      let nipMotor = rangeMotorBB[d][0]; //nip na coluna B da folha motor
      if (nipMotor == nipA) { //Se nip efetivo == NIP no motor
        spreadMotor.getRange((d + 1), 4).setValue(dataEscala); //Coloca a data do ultimo serviço
      }
    }
  }
  for (let e = 4; e < rangeGeralOO.length; e++) { //Elimina troca na tabela caso tenha acontecido PT e PD
    if (rangeGeralOO[e] != '') {
      let backGroundOO = spreadGeral.getRange((e + 1), 15).getBackground()
      let backGroundPP = spreadGeral.getRange((e + 1), 16).getBackground()
      if ((backGroundOO == COLOR_RED || backGroundOO == COLOR_MIX_LBLUE_RED) && (backGroundPP == COLOR_RED || backGroundPP == COLOR_MIX_LBLUE_RED)) { //se as celulas tiverem fundo vermelho ou mixed (ver função constantes)
        spreadGeral.getRange((e + 1), 15).clearContent().setBackground(COLOR_WHITE); //limpa os nips no tester na tabela trocas e cor de fundo celula O
        spreadGeral.getRange((e + 1), 16).clearContent().setBackground(COLOR_WHITE); //limpa os nips no tester na tabela trocas e cor de fundo celula P     
      }
    }
  }

  for (let a = 57; a > 3; a--) { //elimina colunas vazias na tabela de trocas (Delete Cell Shift Up)
    let rangeGeralOO1 = spreadGeral.getRange("O:O").getValues();
    if (rangeGeralOO1[a][0] != '') {
      //console.log('a: '+a+' 1 '+rangeGeralOO1[a][0])
      for (let b = a; b > 3; b--) {
        let rangeGeralOO2 = spreadGeral.getRange("O:O").getValues()
        if (rangeGeralOO2[b][0] == '') {
          console.log('b: ' + b + ' 2 ' + rangeGeralOO2[b][0])
          spreadGeral.getRange((b + 1), 15, 1, 2).deleteCells(SpreadsheetApp.Dimension.ROWS);
        }
      }
    }
  }
  spreadGeral.getRange('O5:P57').setBorder(true, true, true, true, null, null, '#000000', SpreadsheetApp.BorderStyle.SOLID_MEDIUM)
    .setBorder(null, null, null, null, true, true, '#000000', SpreadsheetApp.BorderStyle.SOLID); //BORDERS
  spreadDatas.deleteRow(1) //elimina data na folha datas

  ordenacaoDispensa();
  aCode();
};
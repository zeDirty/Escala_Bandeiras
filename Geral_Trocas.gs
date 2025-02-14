function aCode() { //compara valores que estão na tabela das trocas com a coluna A e coloca os nips na coluna G FOLHA Geral

  var spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
  var spreadGeral = spreadsheet.getSheetByName(FOLHA_GERAL);
  var rangeGeralAA = spreadGeral.getRange("A:A").getValues(); //nipEfetivo
  var rangeGeralOO = spreadGeral.getRange("O:O").getValues(); //Tabela lado Esq
  var rangeGeralPP = spreadGeral.getRange("P:P").getValues(); //Tabela lado Dir
  var rangeGeralGH = spreadGeral.getRange("G1:H" + spreadGeral.getLastRow()); //PT/PD e Nip Troca

  var values = rangeGeralGH.getValues(); //Elimina os valores na coluna G e H(Altera a cor)
  for (let c = 0; c < values.length; c++) {
    if (c % 19 >= 4) {
      values[c][0] = '';
      values[c][1] = '';
    }
  }
  rangeGeralGH.setValues(values);
  rangeGeralGH.offset(0, 1, values.length, 1).setBackground(COLOR_WHITE);

  for (let b = 4; b < rangeGeralOO.length; b++) { //comparação entre valores da coluna O e A
    let backGroundColorO = spreadGeral.getRange(b + 1, 15).getBackground();
    if (backGroundColorO === COLOR_RED || backGroundColorO === COLOR_MIX_LBLUE_RED || rangeGeralOO[b] === '') { continue }
    let nipEsqTabelaTrocas = rangeGeralOO[b][0];
    for (let a = 0; a < rangeGeralAA.length; a++) {
      if (a % 19 >= 4 && rangeGeralAA[a] != '') {
        let nipEfetivo = rangeGeralAA[a][0];
        //console.log("a: "+a+spreadGeral.getRange(a + 1, 7).getValues())
        if (nipEsqTabelaTrocas == nipEfetivo && spreadGeral.getRange(a + 1, 7).getValues() == '') { //se forem iguais coloca o valor que está em O em A
          //let test = rangeGeral.getCell(a + 1, 6).getValue()
          //console.log('range1 '+ test)
          let backGroundColorP = spreadGeral.getRange("P" + (b + 1)).getBackground();
          let nipDirTabelaTrocas = spreadGeral.getRange(b + 1, 16).getValues();
          spreadGeral.getRange(a + 1, 7).setValue("PT");
          spreadGeral.getRange(a + 1, 8).setValues(nipDirTabelaTrocas).setBackground(backGroundColorP);
          break;
        }
      }
    }
  }

  for (let d = 4; d < rangeGeralPP.length; d++) { //comparação entre valores da coluna P e A
    if (rangeGeralPP[d] == '') { continue };
    for (let e = 0; e < rangeGeralAA.length; e++) {
      if (e % 19 >= 4 && rangeGeralAA[e] != '') {
        //if (e % 19 == 0 || e % 19 == 1 || e % 19 == 2 || e % 19 == 3) continue;
        //if (rangeGeralAA[e] == '') continue;
        let nipDirTabelaTrocasB = rangeGeralPP[d][0];
        let nipEfetivoB = rangeGeralAA[e][0];
        if (nipDirTabelaTrocasB == nipEfetivoB && spreadGeral.getRange(e + 1, 7).getValues() == '') { // se forem iguais coloca o valor que está em M em G 
          //let test = rangeGeral.getCell(e + 1, 6).getValue()
          //console.log('range2 '+ test)
          let backGroundColorO = spreadGeral.getRange("O" + (d + 1)).getBackground();
          let nipEsqTabelaTrocasB = spreadGeral.getRange(d + 1, 15).getValues();
          spreadGeral.getRange(e + 1, 7).setValue("PD");
          spreadGeral.getRange(e + 1, 8).setValues(nipEsqTabelaTrocasB).setBackground(backGroundColorO);
          break
        }
      }
    }
  }
  console.log('antes verificar')
  verificar(); //verifica se as trocas são possiveis
};
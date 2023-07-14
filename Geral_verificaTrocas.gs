function verificar() { //verifica se há troca e destroca dos mesmos alunos na mesma escala e se os alunos estão de dispensa

  var spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
  var spreadGeral = spreadsheet.getSheetByName(FOLHA_GERAL);
  var spreadMotor = spreadsheet.getSheetByName(FOLHA_MOTOR);
  var spreadInfos = spreadsheet.getSheetByName(FOLHA_INFO);
  var rangeInfosBH = spreadInfos.getRange("B:H").getValues();
  var rangeInfosBB = spreadInfos.getRange("B:B").getValues();
  var rangeGeralHH = spreadGeral.getRange("H:H").getValues();
  var rangeGeralOO = spreadGeral.getRange("O:O").getValues();
  var rangeGeralPP = spreadGeral.getRange("P:P").getValues();
  var rangeGeralOP = spreadGeral.getRange("O:P").getValues();
  var rangeMotorBB = spreadMotor.getRange("B:B").getValues();
  var rangeMotorBE = spreadMotor.getRange("B:E").getValues();
  const dataHoje = new Date()

  for (let c = 0; c < rangeGeralHH.length; c++) { //verifica se há alunos a fazer troca e destroca na mesma escala
    if (c % 19 >= 4 && rangeGeralHH[c] != '') {
      let nipG = rangeGeralHH[c][0]; //valor de G
      const d = Math.floor(c / 19) + 1;
      let escala = spreadGeral.getRange(19 * d - 14, 1, 15, 1).getValues(); //escala correspondente
      for (let a = 0; a < escala.length; a++) {
        let nipEscala = escala[a][0]; //nip da escala correspondente
        if (nipG == nipEscala) { //compara o valor de G com A
          console.log('verificar Geral: troca destroca')
          spreadGeral.getRange("G" + (c + 1)).clearContent(); //se for verdade elimina NIPS em G
          spreadGeral.getRange("H" + (c + 1)).clearContent(); //se for verdade elimina PT/PD em F
          var ui = SpreadsheetApp.getUi()
          ui.alert('Erro nas trocas', 'Há alunos a fazer a troca e a destroca na mesma escala, na linha: '+ (c + 1) +' na escala nº: '+ d +', com o NIP: '+ nipEscala, ui.ButtonSet.OK)
          console.log(c)
        }
      }
    }
  }
  for (let f = 1; f < rangeMotorBB.length; f++) { //Verifica se os alunos estão de dispensa
    let dataFimDisp = rangeMotorBE[f][3];
    //console.log(f)
    if (dataFimDisp !== '' && dataFimDisp - dataHoje >= 0) {
      let nipDispensa = rangeMotorBE[f][0]
      console.log(nipDispensa)
      for (v = 4; v < rangeGeralOO.length; v++) { //verifica se os alunos na tabela de trocas na folha geral estão de dispensa
        if (rangeGeralOP[v][0] != '' && rangeGeralOP[v][1] != '') {
          for (y = 0; y <= 1; y++){
            var tabelaTrocas = rangeGeralOP[v][y]; //tabela de trocas na folha geral
            //console.log(tabelaTrocas)
            if (nipDispensa == tabelaTrocas) {
              for (let i = 1; i < rangeInfosBB.length; i++) { //
                let nipInfos = rangeInfosBH[i][0]; //NIP da folha motor
                if (nipDispensa == nipInfos) { //Se NIP da folha motor == NIP de dispensa
                  var postoNipO = rangeInfosBH[i][1];
                  var espNipO = rangeInfosBH[i][2];
                  var nomeNipO = rangeInfosBH[i][4]; //Nome do NIP de dispensa
                  var nipTabelaOP = spreadGeral.getRange((v + 1), (y + 15)).getValues();
                  var backGround = spreadGeral.getRange((v + 1), (y + 15)).getBackground()
                  if (backGround == COLOR_RED || backGround == COLOR_MIX_LBLUE_RED) { //se as celulas tiverem fundo vermelho ou mixed (ver função constantes)
                    spreadGeral.getRange((v + 1),(y + 15)).setBackground(COLOR_MIX_LBLUE_RED); //altera a cor de fundo na folha geral no aluno de dispensa
                  } else {
                    spreadGeral.getRange((v + 1),(y + 15)).setBackground(COLOR_LIGHT_BLUE); //altera a cor de fundo na folha geral no aluno de dispensa
                  }
                  for (let c = 0; c < rangeGeralHH.length; c++) { //Elimina Nips de dispensa da na tabela geral
                    if (c % 19 >= 4 && rangeGeralHH[c] != '') {
                      let nipG = rangeGeralHH[c][0]; //valor de G
                      if (nipG == nipTabelaOP){
                        console.log('c: '+c )
                        spreadGeral.getRange(c+1,7).clearContent();
                        spreadGeral.getRange(c+1,8).clearContent().setBackground(COLOR_WHITE);
                      }
                    } 
                  }  
                  var ui = SpreadsheetApp.getUi()
                  ui.alert('Erro nas trocas', 'O aluno '+nipInfos+' '+postoNipO+'/'+espNipO+' '+nomeNipO+', encontra-se de dispensa', ui.ButtonSet.OK)
                }
              }
            }
          }
        }
      }
    }
  }
  console.log('apos big for')
  for (a = 4; a < rangeGeralOO.length; a++) { //verifica se o aluno AINDA está de dispensa
    if (rangeGeralOO[a] != '' && rangeGeralPP[a] != '') {
      for (b = 0; b <= 1; b++){
        var backGround = spreadGeral.getRange((a + 1), (b + 15)).getBackground();
        if (backGround == COLOR_MIX_LBLUE_RED || backGround == COLOR_LIGHT_BLUE) {
          for (let f = 1; f < rangeMotorBB.length; f++) {
            let nipMotor = rangeMotorBE[f][0]
            let nipTabelaOP = rangeGeralOP[a][b]
            if (nipMotor == nipTabelaOP){
              let dataFimDisp = rangeMotorBE[f][3];
              if (dataFimDisp == '' || dataFimDisp - dataHoje <= 0) { //Verifica se ainda tem data na folha motor ou se já passou a dispensa
                console.log(nipMotor)
                if (backGround == COLOR_MIX_LBLUE_RED){
                  spreadGeral.getRange((a + 1), (b + 15)).setBackground(COLOR_RED);
                }
                if (backGround == COLOR_LIGHT_BLUE){
                  spreadGeral.getRange((a + 1), (b + 15)).setBackground(COLOR_WHITE);
                }
              }
            }
          }
        }
      }
    }
  }
  for (a = 57; a > 3; a--) { //coloca fundo a branco quando celula está vazia na tabela
    for (b = 0; b <= 1; b++){
      var nipTabelaOP = rangeGeralOP[a][b]
      console.log('apos: ' + nipTabelaOP)
      if (nipTabelaOP == '') { 
        spreadGeral.getRange((a+1),(b+15)).setBackground(COLOR_WHITE);
      }
    }
  }
};
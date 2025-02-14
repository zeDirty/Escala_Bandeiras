function ordenacaoDispensa() { //Organiza e ordena os alunos. Coloca Dispensados na escala em que vão fazer serviço
  var spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
  var spreadMotor = spreadsheet.getSheetByName(FOLHA_MOTOR);
  var spreadDatas = spreadsheet.getSheetByName(FOLHA_DATAS);
  let lastRowDatas = spreadDatas.getLastRow();  // 15
  let lastRowMotor = spreadMotor.getLastRow();  // 218

  var rangeMotorFF = spreadMotor.getRange("F:F")
  var valuesFF = rangeMotorFF.getValues(); 
  for (let c = 1; c < valuesFF.length; c++) { //Elimina os valores na coluna F (coluna das posições)
    valuesFF[c][0] = '';
  }
  rangeMotorFF.setValues(valuesFF);

  spreadMotor.getFilter().sort(1, true); //Ordena coluna da precedencia crescente
  spreadMotor.getFilter().sort(4, true); //Ordena coluna da Data ultimo serviço crescente

  var rangeMotorEE = spreadMotor.getRange("E:E").getValues();
  var rangeDatasAA = spreadDatas.getRange("A:A").getValues();
  let x = 0;

  for (let a = 1; a < rangeMotorEE.length; a++) { //verifica quando é que os alunos vão estar disponiveis para fazer o seu serviço. Coloca a linha que irá corresponder à escala do seu serviço na coluna F. Posição final
    if (rangeMotorEE[a] == '') continue;
    console.log("a0: " + a)
    let dataMotor = rangeMotorEE[a][0]; //data fim de dispensa
    console.log("valor x: " + x)
    console.log(dataMotor, rangeDatasAA[lastRowDatas - 1][0])
    if (dataMotor >= rangeDatasAA[lastRowDatas - 1][0]) { //Se a dispensa for maior ou igual à última data na folha datas, coloca na coluna F a ultima linha do motor.
      spreadMotor.getRange(a + 1, 6, 1, 1).setValue(lastRowMotor)
      x++
      console.log("lastRowMotor and X: " + lastRowMotor, x)
      continue;
    }
    
    if (dataMotor < rangeDatasAA[0][0]) { // A dispensa é ignorada pois a sua data é menor que a data do proximo serviço disponivel. (A DISPENSA JÁ PASSOU)
      console.log('dataMotor < dataEscalaSuposta: ' + dataMotor < rangeDatasAA[0][0] + dataMotor, rangeDatasAA[0][0])
      continue;
    }
    
    let y = a;
    let posicaoReal = y-x //verifica qual é a posição final tendo em conta os alunos que irão ser movidos acima dele. (Esta verificação acontece antes das linhas serem movidas para a posição final.)
    let escalaSuposta = Math.ceil(posicaoReal / 15) //Calcula a escala suposta
    let dataEscalaSuposta = rangeDatasAA[escalaSuposta - 1][0]
    console.log('escalaSuposta: ' + escalaSuposta + ' dataEscalaSuposta: ' + dataEscalaSuposta)
    console.log(dataMotor < dataEscalaSuposta)
    if (dataMotor < dataEscalaSuposta) { // Verifica qual será a posição final do aluno e calcula se a dispensa interessa ou não.
      console.log('dataMotor < dataEscalaSuposta...' + dataMotor < dataEscalaSuposta)
      continue;
    }
    
    for (let b = 0; b < rangeDatasAA.length; b++) {
      if (rangeDatasAA[b] == '') continue;
      let dataDatas = rangeDatasAA[b][0]; //data na folha datas
      console.log('dataMotor - dataDatas ' + dataMotor < dataDatas)
      console.log("LOOK: " + b + " " + lastRowDatas + " " + dataMotor)
      var numeroNaEscala = (b * 15) + 2; //b=posicao da celula na folha datas
      console.log(numeroNaEscala, lastRowMotor)

      if (numeroNaEscala > lastRowMotor) { //Caso o valor da posição final seja superior às linhas disponiveis no motor esta função coloca na coluna F o valor da ultima linha do motor. Caso contrario ficariam com uma posição maior às linhas disponiveis no motor. 
        spreadMotor.getRange(a + 1, 6, 1, 1).setValue(lastRowMotor);
        x++
        console.log('numeroEscala lastRow X: ' + numeroNaEscala, x)
        break;
      }

      if (dataMotor < dataDatas) { //coloca a linha correspondente onde o aluno vai fazer o serviço na coluna F, apos a dispensa
        console.log('numeroEscala X ' + numeroNaEscala, x)
        spreadMotor.getRange(a + 1, 6, 1, 1).setValue(numeroNaEscala);
        x++
        break;
      }
    }
  }

  spreadMotor.getFilter().sort(6, true);
  var rangeMotorFF = spreadMotor.getRange("F:F").getValues()
  for (let d = rangeMotorFF.length - 1; d >= 1; d--) { //Move as linhas para os numeros que estão na coluna F
    if (rangeMotorFF[d][0] === '') { continue };
    let posicaoFinal = rangeMotorFF[d][0]
    console.log('d1: ' + d)
    console.log("1 " + posicaoFinal)
    console.log("2 " + lastRowMotor)
    if (posicaoFinal === lastRowMotor) {//Caso o valor da linha movida seja a ultima linha com valor da folha motor 
      let a = 0;
      while (posicaoFinal === lastRowMotor) {//Enquato a linha a ser verificada for igual à ultima linha
        posicaoFinal = rangeMotorFF[d][0]
        console.log("3 " + posicaoFinal)
        d--
        a++
        console.log('a: ' + a)
        console.log('d2: ' + d)
      }
      let linhasAMover = (d + 3) + ':' + (a + d + 1) //cria-se o range que será movido
      let rangeAMover = spreadMotor.getRange(linhasAMover)
      console.log(linhasAMover)
      spreadMotor.moveRows(rangeAMover, lastRowMotor + 1);
      d = d + 2

    } else { //caso nao seja o valor da ultima linha
      var rangeMotorFF = spreadMotor.getRange("F:F").getValues()
      let posicaoAtual = rangeMotorFF[d][0]
      posicaoFinal = rangeMotorFF[d][0]
      console.log(posicaoAtual + ' ' + posicaoFinal)
      console.log('dd: ' + d)
      let a = 0;
      while (posicaoFinal === posicaoAtual) { //Verifica quantos valores são iguais
        posicaoAtual = rangeMotorFF[d][0]
        console.log("posicao Final " + posicaoFinal)
        console.log("posicao Atual " + posicaoAtual)
        d--
        a++
        console.log('a 1: ' + a)
        console.log('d 3: ' + d)
      }

      if ((a + d + 1) === (posicaoFinal + (a - 2))) { //Caso o range já se encontre no sitio que será movido
        break;
      }

      let linhasAMover = (d + 3) + ':' + (a + d + 1) //cria-se o range que será movido
      let rangeAMover = spreadMotor.getRange(linhasAMover)

      console.log('Linhas a Mover 2: ' + linhasAMover)
      console.log(posicaoFinal + (a - 1))
      spreadMotor.moveRows(rangeAMover, posicaoFinal + (a - 1));
      d = d + 2
    }
  }

  aCode()
}
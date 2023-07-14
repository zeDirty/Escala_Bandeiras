function ordenacaoDispensa() { //Organiza e ordena os alunos. Coloca Dispensados na escala em que vão fazer serviço
  var spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
  var spreadMotor = spreadsheet.getSheetByName(FOLHA_MOTOR);
  var spreadDatas = spreadsheet.getSheetByName(FOLHA_DATAS);
  spreadMotor.getFilter().sort(1, true);
  spreadMotor.getFilter().sort(4, true);
  var rangeMotorEE = spreadMotor.getRange("E:E").getValues();
  var rangeDatasAA = spreadDatas.getRange("A:A").getValues();
  const dataHoje = new Date()

  for (let a = 1; a < rangeMotorEE.length; a++) {
    rangeMotorEE = spreadMotor.getRange("E:E").getValues();
    if (rangeMotorEE[a] == '') continue;
    for (let b = 0; b < rangeDatasAA.length; b++) {
      if (rangeDatasAA[b] == '') continue;
      let dataMotor = rangeMotorEE[a][0]; //data fim de dispensa
      let dataDatas = rangeDatasAA[b][0]; //data na folha datas
      if (dataMotor-dataHoje <= 0) break;
      var subtracaoDatas = (dataMotor-dataDatas)/86400000 //subtracaoDatas compara data de dispensa com data da escala (86400000 converção para dias)
      console.log('sub '+subtracaoDatas) 
      if ((b + 1) == spreadDatas.getLastRow() || subtracaoDatas > 110) { //Para dispensas prologadas. Coloca aluno no final da escala
        let lastRow = spreadMotor.getLastRow() + 1;
        let linhaParaMover = spreadMotor.getRange(a + 1,1,1,1);
        console.log("a: "+a)
        //console.log(linhaAmover)
        if (lastRow-a==2) break;
        spreadMotor.moveRows(linhaParaMover, lastRow);
        break;
      } 
      if (subtracaoDatas <= 0) { //Coloca Aluno dispensado na escala em que vai fazer serviço
        var numeroDaEscala = (b * 15) + 3; //b=posicao da celula na folha datas
        let linhaAmover = spreadMotor.getRange(a + 1,1,1,1);
        console.log("a: "+a)
        //console.log(linhaAmover+" "+numeroDaEscala)
        if (numeroDaEscala-a==2) break;
        spreadMotor.moveRows(linhaAmover, numeroDaEscala);
        //spreadMotor = spreadsheet.getSheetByName('motor2');
        break;
      }
    }
  }
}
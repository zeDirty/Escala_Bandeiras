function SpecialOnEdit(e) { // wrapping it within an onEdit(e) function
  //This If statement is to ensure my macro only runs when a particular cell is edited:
    if(
    e.source.getSheetName() == FOLHA_ALUNOS && //folha tester
    e.range.columnStart == 17 &&  //range
    e.range.columnEnd == 17 &&
    e.range.rowStart >= 3 &&
    e.range.rowEnd <= 20 
  ){
    acquireLock()
    try {
      var checkboxtest = e.range.getValue();
      if(checkboxtest == true){  //Se a celula e for igual a true
        //var range = e.range;
        //var sheet = range.getSheet();
        var editor = e.user.getEmail();
        //Logger.log("Editor: " + editor + ", Range: " + range.getA1Notation() + ", Sheet: " + sheet.getName());
        let linha = e.range.getRow(); //Vai buscar a linha em que isso ocorreu
        let coluna = e.range.getColumn();
        /*try {
          check_Editor(editor, linha, coluna);
        } catch (error) {
          return; // Stop execution of SpecialOnEdit() when an error is thrown
        }*/
        console.log('123')
        var request = verificarTroca1(linha); //inicia a função aceitarTrocas e passa a linha em que ocorreu essa atualizçao
        Logger.log('request special On 1: '+request)
      }
    }catch (error) {
      // Handle any errors that occur during script execution
      console.error(error);
    } finally {
      // Release the lock after the script finishes running
      releaseLock();
      return     
    }
  } else if(
    e.source.getSheetName() == FOLHA_ALUNOS && //folha tester
    e.range.columnStart == 18 &&  //range
    e.range.columnEnd == 18 &&
    e.range.rowStart >= 3 &&
    e.range.rowEnd <= 20 
  ){
    acquireLock()
    try {
      var checkboxtest = e.range.getValue();
      if(checkboxtest == true){  //Se a celula e for igual a true
        //var range = e.range;
        //var sheet = range.getSheet();
        var editor = e.user.getEmail();
        //Logger.log("Editor: " + editor + ", Range: " + range.getA1Notation() + ", Sheet: " + sheet.getName());
        let linha = e.range.getRow(); //Vai buscar a linha em que isso ocorreu
        let coluna = e.range.getColumn();
        /*try {
          check_Editor(editor, linha, coluna);
        } catch (error) {
          return; // Stop execution of SpecialOnEdit() when an error is thrown
        }*/
        var ai = SpreadsheetApp.getUi();
        var uiResponse = ai.alert(EMAIL_CAMARADA_SEC, ai.ButtonSet.YES_NO);
        if (uiResponse == ai.Button.YES) { //caso a resposta seja "YES"
          Browser.msgBox("Respondeu que sim")
          var request = troca(linha); //inicia a função troca e passa a linha em que ocorreu essa atualizçao
          Logger.log('request special On 2: '+request)
          return
        }  
        Browser.msgBox("Respondeu que não")
        coloca_false(linha, coluna)
        return
      }
    }catch (error) {
      // Handle any errors that occur during script execution
      console.error(error);
    } finally {
      // Release the lock after the script finishes running
      releaseLock();
      return     
    }
  } else if (e.source.getSheetName() == FOLHA_ALUNOS && //folha tester
    e.range.columnStart == 19 && //range
    e.range.columnEnd == 19 &&
    e.range.rowStart >= 3 &&
    e.range.rowEnd <= 20
  ) {
      var checkboxtest = e.range.getValue();
      if(checkboxtest == true){  //Se a celula e for igual a true
        let linha = e.range.getRow(); //Vai buscar a linha em que isso ocorreu
        let coluna = e.range.getColumn();
        console.log('123'+linha)
        var ai = SpreadsheetApp.getUi();
        var uiResponse = ai.alert(EMAIL_DOIS_ALUNOS, ai.ButtonSet.YES_NO);
        if (uiResponse == ai.Button.YES) { //caso a resposta seja "YES"
          Browser.msgBox("Respondeu que sim")
          var request = aceitarSec(linha); //inicia a função aceitarSec e passa a linha em que ocorreu essa atualizçao
          Logger.log('request special On 3: '+request)
          return
        }
      Browser.msgBox("Respondeu que não")
      coloca_false(linha, coluna)
      return  
      }
    } else {
      return
  }
};
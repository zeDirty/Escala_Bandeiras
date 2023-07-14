function verificarTroca1(linha, coluna) {
  //var baseUrl = ScriptApp.getService().getUrl();
  var queryString = "?action=verificarTroca1&line=" + linha + "&col=" + coluna;
  url = URL + queryString
  Logger.log(url)

  var lock = LockService.getDocumentLock();

  const params = {
    method: "get",
    headers: {"Authorization": "Bearer " + ScriptApp.getOAuthToken()},
  };
  
  var success = lock.tryLock(10000);
  if (!success) {
  Logger.log('Could not obtain lock after 10 seconds.');
  } else {
    var request = UrlFetchApp.fetch(url,params)
    Logger.log(request)
  }
  
  SpreadsheetApp.flush()
  lock.releaseLock()

  let response = JSON.parse(request.getContentText())

  if (request.getResponseCode() == 200 ){

    Logger.log('JSON.parse(request.getContentText())')
    console.log("response",response)
    console.log('response.message',response.message)
    console.log('response.messageContent',response.messageContent)

    switch (response.message) {
      case CONTINUACAO_EMAIL:
        Logger.log(response.message)
        var ai = SpreadsheetApp.getUi();
        var uiResponse = ai.alert(CONTINUACAO_EMAIL, ai.ButtonSet.YES_NO);
        if (uiResponse == ai.Button.YES) { //caso a resposta seja "YES"
          Browser.msgBox("Respondeu que sim")
          var request = sendPost(response)
          Logger.log('request: '+request)
          return
        }
        var request = sendPost('nao_continua')
        Logger.log('request: '+request)        
        Browser.msgBox("Respondeu que não")
        return

      case ALUNO_EFETIVO_A_TROCAR:
        Logger.log(response.message)
        /*var ui = SpreadsheetApp.getUi();
        ui.alert(ERRO_TROCA, ALUNO_EFETIVO_A_TROCAR, ui.ButtonSet.OK);*/

        var ai = SpreadsheetApp.getUi();
        var uiResponse = ai.alert('O Aluno efetivo já está a realizar uma troca. \nAo continuar irá enviar um e-mail ao seu camarada.', ai.ButtonSet.YES_NO);
        if (uiResponse == ai.Button.YES) { //caso a resposta seja "YES"
          Browser.msgBox("Respondeu que sim")
          Logger.log('response: '+response)
          var request = sendPost(response)
          Logger.log('request after sendPost: '+request)
        return
        }
        var request = sendPost(json)
        Logger.log('request sendPost(json): '+request) 
        Browser.msgBox("Respondeu que não")
        return

      case ALUNO_TROCA_A_TROCAR:
        Logger.log(response.message)
        /*var ui = SpreadsheetApp.getUi();
        ui.alert(ERRO_TROCA, ALUNO_TROCA_A_TROCAR, ui.ButtonSet.OK);*/

        var ai = SpreadsheetApp.getUi();
        var uiResponse = ai.alert('O Aluno da troca já está a realizar uma troca. \nAo continuar irá enviar um e-mail ao seu camarada.', ai.ButtonSet.YES_NO);
        if (uiResponse == ai.Button.YES) { //caso a resposta seja "YES"
          Browser.msgBox("Respondeu que sim")
          var request = sendPost(response)
          Logger.log('requesttttt: '+request)
          return
        }
        var request = sendPost('nao_continua')
        Logger.log('request: '+request)         
        Browser.msgBox("Respondeu que não")
        return

      case ALUNO_TROCA_DISPENSA:
        Logger.log(response.message)
        var ui = SpreadsheetApp.getUi();
        ui.alert(ERRO_TROCA, ALUNO_TROCA_DISPENSA, ui.ButtonSet.OK);
        return

      case ALUNOS_TROCA_DESTROCA: 
        Logger.log(response.message)
        var ui = SpreadsheetApp.getUi();
        ui.alert(ERRO_TROCA, ALUNOS_TROCA_DESTROCA, ui.ButtonSet.OK);
        return

      case ALUNO_EFETIVO_DISPENSA:
        Logger.log(response.message)
        var ui = SpreadsheetApp.getUi();
        ui.alert(ERRO_TROCA, ALUNO_EFETIVO_DISPENSA, ui.ButtonSet.OK);
        return
        
      case PD_PT:
        Logger.log(response.message)
        var ui = SpreadsheetApp.getUi();
        ui.alert(ERRO_TROCA, PD_PT, ui.ButtonSet.OK);
        return

      case SEM_TROCAS:
        Logger.log(response.message)
        var ui = SpreadsheetApp.getUi();
        ui.alert('Tabela', SEM_TROCAS, ui.ButtonSet.OK);
        return

      default:
      Browser.msgBox("Erro")
    }
  }
}
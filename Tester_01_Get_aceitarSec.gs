function aceitarSec(linha) {
  //var baseUrl = ScriptApp.getService().getUrl();
  var queryString = "?action=aceitarSec&line=" + linha;
  url = URL + queryString
  Logger.log(url)

  const params = {
    method: "get",
    headers: {"Authorization": "Bearer " + ScriptApp.getOAuthToken()},
  };
    console.log('aceitarSec: 321')
  var request = UrlFetchApp.fetch(url,params)
  Logger.log(request)
  Logger.log(request.getContentText())
  /*if (request.getResponseCode() == 200) {
    response = request.getContentText()

    switch (response) {
      case EMAIL_DOIS_ALUNOS:
       var ai = SpreadsheetApp.getUi();
       var uiResponse = ai.alert(EMAIL_DOIS_ALUNOS, ai.ButtonSet.YES_NO);
       if (uiResponse == ai.Button.YES) { //caso a resposta seja "YES"
          //funçao
          Browser.msgBox("Respondeu que sim")
          return
       }
       Browser.msgBox("Respondeu que não")
       return
       
      default:
       Browser.msgBox("Erro")
    }
    return
}*/
}
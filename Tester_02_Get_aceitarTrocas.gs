function troca(linha) {
  //var baseUrl = ScriptApp.getService().getUrl();
  var queryString = "?action=troca&line=" + linha;
  url = URL + queryString
  Logger.log(url)

  const params = {
    method: "get",
    headers: { "Authorization": "Bearer " + ScriptApp.getOAuthToken() },
  };
  console.log('321')
  var request = UrlFetchApp.fetch(url, params)
  Logger.log(request)
  Logger.log(request.getContentText())

  /* if (request.getResponseCode() == 200) {
     response = JSON.parse(request.getContentText())
     console.log("response",response)
     console.log('response.message',response.message)
     console.log('response.messageContent',response.messageContent)
 
     switch (response.message) {
       case EMAIL_CAMARADA_SEC:
        var ai = SpreadsheetApp.getUi();
        var uiResponse = ai.alert(EMAIL_CAMARADA_SEC, ai.ButtonSet.YES_NO);
        if (uiResponse == ai.Button.YES) { //caso a resposta seja "YES"
           Browser.msgBox("Respondeu que sim")
           var request = sendPost(response)
           Logger.log('request: '+request)
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
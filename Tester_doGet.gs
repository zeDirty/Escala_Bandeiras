function sendGet(payload) {
  const payloads = Object.entries(payload)
  const parameters = payloads.map(o => o[0] + "=" + o[1])
  const query_string = "?" + parameters.join("&")
  
  const url = URL + encodeURI(query_string)

  Logger.log("sending GET to: "+url)
  return UrlFetchApp.fetch(
    url,
    {
      method: "get",
      headers: {"Authorization": "Bearer " + ScriptApp.getOAuthToken()},
    }
  )
}

function doGet(e) {
  /*if (isScriptRunning()) {
    return ContentService.createTextOutput('Script is already running. Please try again later.');
  }*/
  var action = "verificarTroca1" //default

  if (e != undefined) {
    var parameters =  e.queryString.split("&")
    
    if (parameters.length > 0 && e.parameter.action){
      action = e.parameter.action
    }

  }

  Logger.log("doGet action = " +action)
  try{
    switch (action) {
      case "updateTester":
        printTable();
        break;
        
      case "verificarTroca1":
        try {
          var line = parseInt(e.parameter.line)
          console.log('doGet: verificar trocas')
          return ContentService.createTextOutput(verificarTester(line));
        } catch (e) {
          return ContentService.createTextOutput("Verificar troca Failed: " + e); 
        }
        //console.log('hello1')
        //response = verificarTester()
        //console.log('hello2')
        //return ContentService.createTextOutput(response);

      case "troca":
        try {
          var line = parseInt(e.parameter.line)
          console.log('doGet: aceitar trocas')
          return ContentService.createTextOutput(aceitarTrocas(line));
        } catch (e) {
          return ContentService.createTextOutput("aceitar Troca Failed: " + e); 
        }

      case "aceitarSec":
        try {
          var line = parseInt(e.parameter.line)
          console.log(line)
          console.log('doGet: aceitar Secretaria')
          return ContentService.createTextOutput(aceitarSecretaria(line));
        } catch (e) {
          return ContentService.createTextOutput("aceitarSecretaria Failed: " + e); 
        }

      default:
        return ContentService.createTextOutput("Action does not exist: "+action)
    }

    return ContentService.createTextOutput("Success")
  } catch (err){
    return ContentService.createTextOutput("Failed")
  }
}
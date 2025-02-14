function sendPost(payload) {
  console.log("sending POST", payload)
  return UrlFetchApp.fetch(
    URL,
    {
      method: "post",
      headers: {
        "Authorization": "Bearer " + ScriptApp.getOAuthToken(),
        "contentType": "application/json",
      },
      payload: JSON.stringify(payload),
    }
  )
}

function sendPostPath(path, payload) {
  console.log("sending POST", payload)
  return UrlFetchApp.fetch(
    URL+path,
    {
      method: "post",
      headers: {
        "Authorization": "Bearer " + ScriptApp.getOAuthToken(),
        "contentType": "application/json",
      },
      payload: JSON.stringify(payload),
    }
  )
}

function doPost(e) {
  const payload = JSON.parse(e.postData.contents)
  console.log("1 pauload: ", payload)
  var action = "verificarTroca1" //default

  Logger.log(e)
  Logger.log(e.postData)
  Logger.log(e.postData.contents)
  if (e != undefined) {
    var parameters = e.queryString.split("&")
    Logger.log('parametros ' + parameters)
    if (parameters.length > 0 && e.parameter.action) {

      Logger.log('Ação 1: ' + action)

      action = e.parameter.action

      Logger.log('Ação 2: ' + action)
    }

  }
  
  Logger.log("doPost action = " + action)
  try {
    switch (action) {

      case "verificarTroca1":
        Logger.log('doPost verifica ' + payload.messageContent.emailNipM)
        response = emailSender(payload)
        return ContentService.createTextOutput(response);

      case "troca":
        try {
          var line = parseInt(e.parameter.line)
          console.log('postereee')
          return ContentService.createTextOutput(aceitarTrocas(line));
        } catch (e) {
          return ContentService.createTextOutput("Troca Failed: " + e);
        }

      case "aceitarSec":
        if (parameters.length > 0 && e.parameter.line) {
          var line = parseInt(e.parameter.line)
          aceitarSecretaria(line);
        }
        break

      case "naoContinua":
        if (parameters.length > 0 && e.parameter.line) {
          var line = parseInt(e.parameter.line);
          Logger.log('doPost naoContinua line='+line);
          coloca_false(line);
        }
        break

      default:
        return ContentService.createTextOutput("Action does not exist: " + action)
    }

    return ContentService.createTextOutput("Success")
  } catch (err) {
    return ContentService.createTextOutput("Failed")
  }
}
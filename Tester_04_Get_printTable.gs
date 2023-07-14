function insertRow() {
  //var url = ScriptApp.getService().getUrl();
  var queryString = "?action=updateTester" // Construct the query string
  url = URL + queryString // Construct the complete URL by combining the base URL with the query string
  Logger.log(url)

  const params = { // Define the parameters for the HTTP request
    method: "get",
    headers: {"Authorization": "Bearer " + ScriptApp.getOAuthToken()},
  };
  Logger.log(params);
  var request = UrlFetchApp.fetch(url,params) // Send the HTTP GET request
  if (request.getResponseCode() !== 200 ){
    Logger.log("Sorry Unable to insertRow") // Log an error message if the request was unsuccessful
    Browser.msgBox("Sorry Unable to insertRow") // Display an error message to the user
  }
}
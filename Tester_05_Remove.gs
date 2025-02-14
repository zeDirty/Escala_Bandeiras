function removeProtection() { //Botão trocas no tester


scheduleSecondScript();
}

function scheduleSecondScript() {
  // Get the current date and time
  var now = new Date();

  // Calculate the date and time 5 minutes from now
  var fiveMinutesLater = new Date(now.getTime() + 5 * 60 * 1000); // 5 minutes in milliseconds

  // Define the function to run the second script
  function runSecondScript() {
    // Put your code for the second script here
    // ...
  }

  // Schedule the second script to run 5 minutes later
  ScriptApp.newTrigger('runSecondScript')
    .timeBased()
    .at(fiveMinutesLater)
    .create();
}

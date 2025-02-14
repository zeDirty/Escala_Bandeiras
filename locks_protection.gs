// Function to acquire the lock
function acquireLock() {
  const lock = LockService.getScriptLock();
  Logger.log('acquireLock 1: ' + lock)
  lock.waitLock(30000); // Wait for up to 60 seconds to acquire the lock
  PropertiesService.getScriptProperties().setProperty('isRunning', 'true'); // Set a script property to indicate that the script is running
  Logger.log('acquireLock 2: ' + lock)
}

// Function to release the lock
function releaseLock() {
  Logger.log('releaseLock: 1')
  PropertiesService.getScriptProperties().deleteProperty('isRunning'); // Remove the script property to indicate that the script has finished running
  const lock = LockService.getScriptLock();
  if (lock.hasLock()) {
    lock.releaseLock(); // Release the lock
    Logger.log('releaseLock: 2 '+lock)
  }
  Logger.log('releaseLock: 3 ' +lock)
}

// Function to check if the script is already running
function isScriptRunning() {
  Logger.log('isScriptRunnin: ')
  const isRunning = PropertiesService.getScriptProperties().getProperty('isRunning');
  //return ContentService.createTextOutput('Script is already running. Please try again later.');
  return isRunning === 'true';
}

// Function to lock the spreadsheet
function lockSpreadsheet() {
  const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
  const protection = spreadsheet.getActiveSheet().protect();
  protection.setDescription('Script running. Please wait.'); // Optional description to indicate the spreadsheet is locked
  protection.setWarningOnly(true); // Display a warning message instead of preventing all edits
}

// Function to unlock the spreadsheet
function unlockSpreadsheet() {
  const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
  const protection = spreadsheet.getActiveSheet().protect();
  protection.remove();
}

function showLoadingDialog() {
  const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
  var spreadTester = spreadsheet.getSheetByName(FOLHA_ALUNOS);
  spreadTester.getRange(1, 8).activate().setValue('o script está a correr. aguarde.....').setFontWeight('bold').setHorizontalAlignment('center').setBackground('#666666').setFontColor('#ffffff')
}

function hideLoadingDialog() {
  const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
  var spreadTester = spreadsheet.getSheetByName(FOLHA_ALUNOS);
  spreadTester.getRange(1, 8).activate().setBackground('#ffffff').clear({contentsOnly: true, skipFilteredRows: true}).setFontWeight(null).setFontColor('#000000');
}
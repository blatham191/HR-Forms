/**
 * Returns an rfc4122 version 4 compliant GUID / UUID string
 * http://stackoverflow.com/a/2117523/1677912
 */
function getGUID() { // Public Domain/MIT
    var d = new Date().getTime();
    if (typeof performance !== 'undefined' && typeof performance.now === 'function'){
        d += performance.now(); //use high-precision timer if available
    }
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
}

function getRandom(min, max) {
  return Math.random() * (max - min) + min;
}



function createObject(sheetName, responses){
  var ss = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
  var lastRow = ss.getLastRow();
  var keys = ss.getRange(1, 4, lastRow, 1).getValues();
  
  var response = {}
  
  for(var i=0; i<responses.length; i++){
    response[keys[i]] = responses[i];
  }
  return response;
}


function createPasskey(sheetName){
  var data = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
  var numRows = data.getLastRow()
  var numCols = data.getLastColumn()
  var keyCell = data.getRange(numRows, numCols-4); 
  
  var value = getGUID();

  keyCell.setValue(value);
  
  return value;
  
}


//DEACTIVATE FOR LIVE
function getApprovers(site){
  //var site = "Site2";
  var ss = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Approvers");
  var lastRow = ss.getLastRow();
  var sites = ss.getRange(1, 1, lastRow).getValues();
  var allApprovers = ss.getRange(1, 2, lastRow).getValues();
  var approvers = [];
    
  for (var i=0; i<sites.length; i++){
    if(sites[i]==site){
      approvers.push(allApprovers[i])
    }
  }
  Logger.log(approvers)
  return approvers;
}

//ACTIVATE FOR LIVE
//function getApprovers(site){
//  var site = "Stafford";
//  var ss = SpreadsheetApp.openById(_approversSheet).getSheetByName('Sheet1')
//  var lastRow = ss.getLastRow();
//  var sites = ss.getRange(4, 4, lastRow).getValues();
//  var allApprovers = ss.getRange(4, 7, lastRow).getValues();
//  var approvers = [];
//  
//  for (var i=0; i<sites.length; i++){
//    if(sites[i]==site){
//      approvers.push(allApprovers[i])
//    }
//  }
//  Logger.log(approvers)
//  return approvers;
//}


function getDriveLink(site){
  //var site = "Site2";
  var ss = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("DriveLinks");
  var lastRow = ss.getLastRow();
  var sites = ss.getRange(1, 1, lastRow).getValues();
  var links = ss.getRange(1, 2, lastRow).getValues();
      
  for (var i=0; i<sites.length; i++){
    if(sites[i]==site){
      var link = links[i];
    }
  }
  Logger.log(link)
  return link;
}


function getData(){
  var ss = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Form Responses 1");
  var lastRow = ss.getLastRow();
  var lastCol = ss.getLastColumn();
  
  var dataRange = ss.getRange(lastRow, 1, 1, lastCol).getValues();
  return dataRange;
}



function getDriveID(site, col){
  var ss = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("DriveLinks");
  var lastRow = ss.getLastRow();
  var sites = ss.getRange(1, 1, lastRow).getValues();
  var ids = ss.getRange(1, col, lastRow).getValues();
      
  for (var i=0; i<sites.length; i++){
    if(sites[i]==site){
      var id = ids[i];
    }
  }
  
  return id;
}

function getPayroll(site){
  //var site = "Stafford"
  var ss = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Payrolls");
  var lastRow = ss.getLastRow();
  var lastCol = ss.getLastColumn();
  var sites = ss.getRange(1, 1, lastRow, 1).getValues();
  var payrolls = ss.getRange(1, 2, lastRow, 1).getValues();
  
  for(var i=0; i<sites.length; i++){
    if(sites[i] == site){
      var payroll = payrolls[i];
    }
  }
  //Logger.log(payroll);
  return payroll;
}



function setPermissisons(){
  //var site = "Stafford";
  var d_ss = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("DriveLinks");
  var d_lastRow = d_ss.getLastRow();
  var d_sites = d_ss.getRange(1, 1, d_lastRow).getValues(); 
  var driveId = d_ss.getRange(1, 2, d_lastRow).getValues();
  
  
  var ss = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Approvers");
  var lastRow = ss.getLastRow();
  var sites = ss.getRange(1, 1, lastRow).getValues();
  var allApprovers = ss.getRange(1, 2, lastRow).getValues();

  removePermissons(driveId)
  
  for (var i=0; i<sites.length; i++){
    for(var j=0; j<d_sites.length; j++){
      if(d_sites[j][0] == sites[i][0]){
        if(allApprovers[j][0] == ""){
          Logger.log("Skip the blanks")
        }
        else{
          Logger.log(d_sites[j][0]+" "+sites[i][0])
          Logger.log(allApprovers[i][0])
          insertSilentPermission(driveId[j], allApprovers[i][0], "user", "reader");
        }
      }
    }
  }
}


/**
 * Insert a new permission without sending notification email.
 *
 * @param {String} fileId ID of the file to insert permission for.
 * @param {String} value User or group e-mail address, domain name or
 * {@code null} "default" type.
 * @param {String} type The value "user", "group", "domain" or "default".
 * @param {String} role The value "owner", "writer" or "reader".
 */
function insertSilentPermission(fileId, value, type, role) {
  var request = Drive.Permissions.insert({
    'value': value,
    'type': type,
    'role': role,
    'withLink': false
  },
  fileId,
  {
    'sendNotificationEmails': false
  });
}


function removePermissons(folders){
  for each (var id in folders){
  var fExists = testFolder(id)
  if (fExists == true){
    var folder = DriveApp.getFolderById(id);
    var vExists = testViewer(folder)
    if (vExists == true){
      var viewers = folder.getViewers();
         for each (var viewer in viewers){
           folder.removeViewer(viewer)
         }
    }
  }
  }
}


function testFolder(id){
  var exist = true;
  try{var testFolder = DriveApp.getFolderById(id)}
  catch(err){exist=false}
  return exist;
}

function testViewer(folder){
  var exist = true;
  try{var testViewer = folder.getViewers()}
  catch(err){exist=false}
  return exist;
}
//Global Vars
var _spreadsheetId = '1bkQZlQiyjGQcV8_76Mjsa7OSDLjrUrx5tlnYllCOZCI';
var _approversSheet = '1nhTa3DfM2ehEVnDAL8F9kQEtAqJiyBPmmSUswmLlVu0';
var _docUrl = "https://docs.google.com/document/d/";
var driveFilePath = "https://drive.google.com/file/d/"

function newStarter(e){
  //Assign responses to variable (this is an array)
  var responses = e.values;
  var dataSheet = "DataSheet";
  var response = createObject(dataSheet, responses);
  var sheetName = 'New Starter Form';
  var formType = 'New Starter';
  
  var key = createPasskey(sheetName);
  
  //Send response.site and driveID column number
  var destinationFolderID = getDriveID(response.site, 3);
  
  var driveLink = driveFilePath + destinationFolderID
  
  if(response.perm_fName != ""){
    var name = response.perm_fName+" "+response.perm_sName;
    var fullName = response.perm_fName+"+"+response.perm_sName;
  }
  else{
    var name = response.agency_fName+" "+response.agency_sName;
    var fullName = response.agency_fName+"+"+response.agency_sName;
  }
  
  var fileName = formType+" - "+fullName+" - "+key;
  Logger.log(destinationFolderID);
  //var destinationFolderID = "1RJNzvTA-Li0ESvl1rXP-nkv5285yjw6U";
  var destFolder = DriveApp.getFolderById(destinationFolderID);
  
  if(response.type == "Agency"){
    var templateID = "1gBu45OC_m6k-Q8z1yaYpCD8SclP18mCOJq-DHGtfMYA";
  }
  else{
    var templateID = "1bzVikkvt7KmI_mlb0dLAtpp9jLZpFruUyrnkhBUFIgk";
  }

  //Push responses to copy function
  var docId = copyDocument(response, destFolder, templateID, fileName);
  
  var ss = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
  var lastCol = ss.getLastColumn();
  var lastRow = ss.getLastRow();
  var keys = ss.getRange(1, lastCol-4, lastRow, 1).getValues();
  
  
  writeDocument(docId, destFolder, response, key);
  
  
  for (var i=0; i<keys.length; i++){
  
    if(key == keys[i]){
      var docIdCell = ss.getRange(i+1, lastCol-2, 1, 1);
      docIdCell.setValue(docId);
    }
  }
  
  var approvers = getApprovers(response.site);
  
  sendMail(formType, approvers, key, response, driveLink);
}

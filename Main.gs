//Global Vars
var _spreadsheetId = '1bkQZlQiyjGQcV8_76Mjsa7OSDLjrUrx5tlnYllCOZCI';
var _approversSheet = '1nhTa3DfM2ehEVnDAL8F9kQEtAqJiyBPmmSUswmLlVu0';
var _docUrl = "https://docs.google.com/file/d/";
var driveFilePath = "https://drive.google.com/file/d/"

function newStarter(e){
  //Assign responses to variable (this is an array)
  var responses = e.values;
  var dataSheet = "NewStarter_DataSheet";
  var response = createObject(dataSheet, responses);
  var sheetName = 'New Starter';
  var formType = 'New Starter';
  
  var key = createPasskey(sheetName);
  
  //Send response.site and driveID column number
  var destinationFolderID = getDriveID(response.site, 3);
  
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
  
  
  writeDocument(formType, docId, destFolder, response, key);
  
  
  for (var i=0; i<keys.length; i++){
  
    if(key == keys[i]){
      var docIdCell = ss.getRange(i+1, lastCol-2, 1, 1);
      docIdCell.setValue(docId);
    }
  }
  var driveLink = driveFilePath + docId
  var approvers = getApprovers(response.site);
  
  sendMail(formType, approvers, key, response, driveLink, fullName, name);
}



function edc(e){
  var responses = e.values;
  var dataSheet = "edc_DataSheet";
  var response = createObject(dataSheet, responses);
  var sheetName = 'Employee Details Change';
  var formType = 'Employee Details Change';
  
  var key = createPasskey(sheetName);
  
  //Send response.site and driveID column number
  var destinationFolderID = getDriveID(response.site, 5);
  

  var name = response.fName+" "+response.sName;
  var fullName = response.fName+"+"+response.sName;
 
  
  var fileName = formType+" - "+fullName+" - "+key;
  Logger.log(destinationFolderID);
  //var destinationFolderID = "1RJNzvTA-Li0ESvl1rXP-nkv5285yjw6U";
  var destFolder = DriveApp.getFolderById(destinationFolderID);

  var templateID = "1p1v2XnH_31ezMnxqfKHwNbGZ3T9_FMDYB-3g5gctiK8";
 
  //Push responses to copy function
  var docId = copyDocument(response, destFolder, templateID, fileName);
  
  var ss = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
  var lastCol = ss.getLastColumn();
  var lastRow = ss.getLastRow();
  var keys = ss.getRange(1, lastCol-4, lastRow, 1).getValues();
  
  
  writeDocument(formType, docId, destFolder, response, key);
  
  
  for (var i=0; i<keys.length; i++){
  
    if(key == keys[i]){
      var docIdCell = ss.getRange(i+1, lastCol-2, 1, 1);
      docIdCell.setValue(docId);
    }
  }
  var driveLink = driveFilePath + docId
  var approvers = getApprovers(response.site);
  
  sendMail(formType, approvers, key, response, driveLink, fullName, name);
  
}



function payAdjust(e){
  var responses = e.values;
  var dataSheet = "payAdjust_DataSheet";
  var response = createObject(dataSheet, responses);
  var sheetName = 'Pay Adjustment/Query';
  var formType = 'Pay Adjustment/Query';
  
  var key = createPasskey(sheetName);
  
  var destinationFolderID = getDriveID(response.site, 7);
  var name = response.fName+" "+response.sName;
  var fullName = response.fName+"+"+response.sName;
  var fileName = formType+" - "+fullName+" - "+key;
  Logger.log(destinationFolderID);
  //var destinationFolderID = "1RJNzvTA-Li0ESvl1rXP-nkv5285yjw6U";
  var destFolder = DriveApp.getFolderById(destinationFolderID);

  var templateID = "1v3zd0V3VaM3C7VDPtRjBrQnTAq4R-P6Trbmpi9ZKyAE";
 
  //Push responses to copy function
  var docId = copyDocument(response, destFolder, templateID, fileName);
  
  var ss = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
  var lastCol = ss.getLastColumn();
  var lastRow = ss.getLastRow();
  var keys = ss.getRange(1, lastCol-4, lastRow, 1).getValues();
  
  
  writeDocument(formType, docId, destFolder, response, key);
  
  
  for (var i=0; i<keys.length; i++){
  
    if(key == keys[i]){
      var docIdCell = ss.getRange(i+1, lastCol-2, 1, 1);
      docIdCell.setValue(docId);
    }
  }
  var driveLink = driveFilePath + docId
  var approvers = getApprovers(response.site);
  
  sendMail(formType, approvers, key, response, driveLink, fullName, name);
}



function changeInTerms(e){
  var responses = e.values;
  var dataSheet = "changeInTerms_DataSheet";
  var response = createObject(dataSheet, responses);
  var sheetName = 'Change in Terms of Employment';
  var formType = 'Change in Terms of Employment';
  
  var key = createPasskey(sheetName);
  Logger.log(response.site)
  var destinationFolderID = getDriveID(response.site, 9);
  var name = response.fName+" "+response.sName;
  var fullName = response.fName+"+"+response.sName;
  var fileName = formType+" - "+fullName+" - "+key;
  Logger.log(destinationFolderID);
  //var destinationFolderID = "1RJNzvTA-Li0ESvl1rXP-nkv5285yjw6U";
  var destFolder = DriveApp.getFolderById(destinationFolderID);

  var templateID = "1CMXe_fhRkmSkGRrMBZy4t4L_TneDxOXSkaMNIQ3_CYM";
 
  //Push responses to copy function
  var docId = copyDocument(response, destFolder, templateID, fileName);
  
  var ss = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
  var lastCol = ss.getLastColumn();
  var lastRow = ss.getLastRow();
  var keys = ss.getRange(1, lastCol-4, lastRow, 1).getValues();
  
  
  writeDocument(formType, docId, destFolder, response, key);
  
  
  for (var i=0; i<keys.length; i++){
  
    if(key == keys[i]){
      var docIdCell = ss.getRange(i+1, lastCol-2, 1, 1);
      docIdCell.setValue(docId);
    }
  }
  var driveLink = driveFilePath + docId
  var approvers = getApprovers(response.site);
  
  sendMail(formType, approvers, key, response, driveLink, fullName, name);
}



function leaver(e){
  var responses = e.values;
  var dataSheet = "leaver_DataSheet";
  var response = createObject(dataSheet, responses);
  var sheetName = 'Leaver';
  var formType = 'Leaver';
  
  var key = createPasskey(sheetName);
  
  var destinationFolderID = getDriveID(response.site, 11);
  var name = response.fName+" "+response.sName;
  var fullName = response.fName+"+"+response.sName;
  var fileName = formType+" - "+name+" - "+key;
  Logger.log(destinationFolderID);
  //var destinationFolderID = "1RJNzvTA-Li0ESvl1rXP-nkv5285yjw6U";
  var destFolder = DriveApp.getFolderById(destinationFolderID);

  var templateID = "1gTq30fBUrBULwwsN96Eu8B4X4gpfr36ywQAU7TnxfRE";
 
  //Push responses to copy function
  var docId = copyDocument(response, destFolder, templateID, fileName);
  
  var ss = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
  var lastCol = ss.getLastColumn();
  var lastRow = ss.getLastRow();
  var keys = ss.getRange(1, lastCol-4, lastRow, 1).getValues();
  
  
  writeDocument(formType, docId, destFolder, response, key);
  
  
  for (var i=0; i<keys.length; i++){
  
    if(key == keys[i]){
      var docIdCell = ss.getRange(i+1, lastCol-2, 1, 1);
      docIdCell.setValue(docId);
    }
  }
  var driveLink = driveFilePath + docId
  var approvers = getApprovers(response.site);
  
  sendMail(formType, approvers, key, response, driveLink, fullName, name);
}

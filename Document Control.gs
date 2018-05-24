//Copy template document and move to Output folder
function copyDocument(response, destFolder, template, fileName){
  Logger.log("Start Copy");
//Set file name to be requester name + type of request
  //var fileName = "tempFile";
//Check the type of request and copy the appropriate document (from gDoc key)
    
    var docId = DriveApp.getFileById(template).makeCopy(fileName, destFolder).getId();
    Logger.log(docId);
//Send newly created document(via ID) and responses to write function
    return docId; 
}


//Write responses to document
function writeDocument(formType, docId, folder, response, key){
  Logger.log("Start Write");
  //Open document to edit
  var doc = DocumentApp.openById(docId);
  //Get body of document
  var body = doc.getBody();
  Logger.log(key)
  if(formType == "New Starter"){
    writeNewStarter(body, response, key)
  }
  else if(formType == "Employee Details Change"){
    writeEcd(body, response, key)
  }
  else if(formType == "Pay Adjustment/Query"){
    writePayAdjust(body, response, key)
  }
  else if(formType == "Change in Terms of Employment"){
    writeChangeTerms(body, response, key)
  }
  else if(formType == "Leaver"){
    writeLeaver(body, response, key)
  }
  
  //Save document, not stictly necessary as this is called when the script ends
  doc.saveAndClose();
  
}


function addApprover(sheetName, responses){
  var ss = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
  var lastRow = ss.getLastRow();
  var lastCol = ss.getLastColumn();
  var keys = ss.getRange(1, lastCol-4, lastRow, 1).getValues();
  Logger.log(keys)
  for (var i=0; i<keys.length; i++){
    if(responses[7] == keys[i]){
      var docId = ss.getRange(i+1, lastCol-2, 1, 1).getValue();
    }
  }
  var doc = DocumentApp.openById(docId);
  //Get body of document
  var body = doc.getBody();
  body.replaceText("<<Approver>>", responses[1]);
  Logger.log(docId);
  Utilities.sleep(5000);
  doc.saveAndClose();
  return docId;
}

function makePDF(docId, folders, fileName){
  var doc = DocumentApp.openById(docId);
  var docBlob = doc.getBlob().getAs('application/pdf').setName(fileName);

  //for (var i=0; i<folders.length; i++){
    var newFile = folders[0].createFile(docBlob);
    var newId = newFile.getId();
    folders[1].createFile(docBlob);
  //}
  //Send document and responses to email function
  var file = doc.getId()
  DriveApp.getFileById(file).setTrashed(true);
  Logger.log(newId);
  return newId;
}


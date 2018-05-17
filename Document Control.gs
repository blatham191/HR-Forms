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
function writeDocument(docId, folder, response, key){
  Logger.log("Start Write");
  //Open document to edit
  var doc = DocumentApp.openById(docId);
  //Get body of document
  var body = doc.getBody();
  
  if(response.type == "Agency"){
    body.replaceText("<<Agency>>" , response.agency_agency);
    body.replaceText("<<Forename>>" , response.agency_fName);
    body.replaceText("<<Surname>>" , response.agency_sName);
    body.replaceText("<<Date of Birth>>" , response.agency_dob);
    body.replaceText("<<Gender>>" , response.agency_gender);
    body.replaceText("<<Title>>" , response.agency_title);
    body.replaceText("<<Initials>>" , response.agency_initials);
    
    body.replaceText("<<Starter Checklist Declaration>>" , response.declaration);
    body.replaceText("<<I have a Student Loan>>" , response.studentLoan);
    body.replaceText("<<loanPlan>>" , response.loanType);
    body.replaceText("<<P45 Information>>" , response.p45);
    
    body.replaceText("<<Site>>" , response.site);
    body.replaceText("<<Department>>" , response.department);
    body.replaceText("<<Job Title>>" , response.jobTitle);
    body.replaceText("<<Start Date>>" , response.startDate);
    body.replaceText("<<Contracted Hours>>" , response.conHours);
    body.replaceText("<<Hourly Rate>>" , response.hourlyRate);
    body.replaceText("<<mcdID>>" , response.mcdID);
    
    body.replaceText("<<Does this person have a bank account?>>" , response.bankType);
    body.replaceText("<<Account Number>>" , response.bank_accountNo);
    body.replaceText("<<Sort Code>>" , response.bank_sortNo);
    body.replaceText("<<Account Number>>" , response.buildingSo_accountNo);
    body.replaceText("<<Sort Code>>" , response.buildingSo_sortNo);
    body.replaceText("<<Building Society Number>>" , response.buildingSo_buildingSocietyNo);
    body.replaceText("<<Email address>>" , response.email);
    
    body.replaceText("<<Access Code>>" , key);
  }
  else{
    body.replaceText("<<Forename>>" , response.perm_fName);
    body.replaceText("<<Surname>>" , response.perm_sName);
    body.replaceText("<<Address Line 1>>" , response.addressLine1);
    body.replaceText("<<Address Line 2>>" , response.addressLine2);
    body.replaceText("<<Address Line 3>>" , response.addressLine3);
    body.replaceText("<<Address Line 4>>" , response.addressLine4);
    body.replaceText("<<Address Line 5>>" , response.addressLine5);
    body.replaceText("<<Post Code>>" , response.perm_postCode);
    body.replaceText("<<Country>>" , response.country);
    
    body.replaceText("<<home>>" , response.phone_Home);
    body.replaceText("<<mobile>>" , response.phone_Mobile);
    body.replaceText("<<Date of Birth>>" , response.perm_dob);
    body.replaceText("<<Gender>>" , response.perm_gender);
    body.replaceText("<<Title>>" , response.perm_title);
    body.replaceText("<<Marital Status>>" , response.perm_maritalStatus);
    body.replaceText("<<Initials>>" , response.perm_initials);
    body.replaceText("<<National Insurance Number>>" , response.perm_niNo);
    body.replaceText("<<Nationality>>" , response.perm_nationality);
    body.replaceText("<<Email>>" , response.perm_email);
    
    body.replaceText("<<Starter Checklist Declaration>>" , response.declaration);
    body.replaceText("<<I have a Student Loan>>" , response.studentLoan);
    body.replaceText("<<loanPlan>>" , response.loanType);
    body.replaceText("<<P45 Information>>" , response.p45);
    
    body.replaceText("<<Site>>" , response.site);
    body.replaceText("<<Department>>" , response.department);
    body.replaceText("<<Job Title>>" , response.jobTitle);
    body.replaceText("<<Start Date>>" , response.startDate);
    body.replaceText("<<Contracted Hours>>" , response.conHours);
    body.replaceText("<<Hourly Rate>>" , response.hourlyRate);
    body.replaceText("<<mcdID>>" , response.mcdID);
    
    body.replaceText("<<bank type>>" , response.bankType);
    
    if(response.bankType == "Bank Account"){
      body.replaceText("<<Account Number>>" , response.bank_accountNo);
      body.replaceText("<<Sort Code>>" , response.bank_sortNo);
      body.replaceText("<<Building Society Number>>" , "N/A");
    }
    if(response.bankType == "Bank Account"){
      body.replaceText("<<Account Number>>" , response.buildingSo_accountNo);
      body.replaceText("<<Sort Code>>" , response.buildingSo_sortNo);
      body.replaceText("<<Building Society Number>>" , response.buildingSo_buildingSocietyNo);
    }     
    
    body.replaceText("<<Email address>>" , response.email);
    
    body.replaceText("<<Access Code>>" , key);
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


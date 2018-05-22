function approvalProcess(e){
  var responses = e.values;
  var answer = approvalHandle(responses);
  var dataSheet = "";
  var col = "";
  if(responses[2] == "New Starter"){
    dataSheet ="NewStarter_DataSheet";
    col = 3;
  }
  else if(responses[2] == "Employee Details Change"){
    dataSheet ="edc_DataSheet";
    col = 5;
  }
  else if(responses[2] == "Pay Adjustment/Query"){
    dataSheet ="payAdjust_DataSheet";
    col = 7;
  }
  else if(responses[2] == "Change in Terms of Employment"){
    dataSheet ="changeInTerms_DataSheet";
    col = 9;
  }
  else if(responses[2] == "Leaver"){
    dataSheet ="leaver_DataSheet";
    col = 11;
  }
  
  var approvedAnswer = approvalReply(responses, answer, dataSheet);
  var ftpFolder = DriveApp.getFolderById("1-B-neMTtdLdn7naLMo3EEgiuM45FKul8")
  var payroll = getPayroll(responses[9]);
  
  if (approvedAnswer == "Approved"){
    var fileName = "["+payroll+"]"+responses[2]+" - "+responses[3]+" - "+responses[7];
    var destinationFolderID = getDriveID(responses[9], col);
    var destFolder = DriveApp.getFolderById(destinationFolderID);
    var folders = [destFolder, ftpFolder]
    var docId = addApprover(responses[2], responses)
    
    var newId = makePDF(docId, folders, fileName);
    var document = _docUrl+newId;
    var payrollBody = "Hi Liz, A new form has been submitted, please see the following link for the submission document "+document;
    
    approvalEmails("ben.latham@roadchef.com", responses[2]+" "+"Submitted", payrollBody)
  }
  else if (approvedAnswer == "Rejected"){
    var fileName = "[REJECTED]"+responses[2]+" - "+responses[3]+" - "+responses[7];
    var destinationFolderID = getDriveID(responses[9], col+1);
    var destFolder = DriveApp.getFolderById(destinationFolderID);
    var folders = [destFolder]
    var docId = addApprover(dataSheet , responses)
    makePDF(docId, folders, fileName);
  }

}



function approvalHandle(responses){

  var ss = SpreadsheetApp.openById(_spreadsheetId).getSheetByName(responses[2]);
  var lastCol = ss.getLastColumn();
  var lastRow = ss.getLastRow();
  var keys = ss.getRange(1, lastCol-4, lastRow, 1).getValues();
  var approvals = ss.getRange(1, lastCol-3, lastRow, 1).getValues();
  var answer = ["", ""];  
  
  var ssA = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Approvals");
  var aLastRow = ssA.getLastRow();
  var aLastCol = ssA.getLastColumn();
  var keyRange = ssA.getRange(1, aLastCol-1, aLastRow, 1).getValues();
  
  if(responses[4]=="Yes"){
    var approved ="Approved"
  }
  else{
    var approved ="Rejected"
  }
  for(var i=0; i<keys.length; i++){
    if(keys[i] == responses[7]){
      var approveCell = ss.getRange(i+1, lastCol-3, 1, 1);
      var approverCell = ss.getRange(i+1, lastCol-1, 1, 1);
      var reasonCell = ss.getRange(i+1, lastCol, 1, 1);
      var currentVal = approveCell.getValue();
    }
  }
  
  Logger.log(approved);
  approveCell.setValue(approved);
  approverCell.setValue(responses[1]);
  reasonCell.setValue(responses[5]);
  
  if(currentVal == ""){
    approveCell.setValue(approved)
    answer[0] = "This approval response has been registered as "+approved;
  }
  else if(currentVal != ""){
    for(var j=0; j<keyRange.length; j++){
      if(keyRange[j] == responses[7]){
        var prevResponder = ssA.getRange(j, 4, 1, 1).getValue();
        var prevAnswer = ssA.getRange(j, 5, 1, 1.).getValue();
        if(prevAnswer=="Yes"){
          prevAnswer ="Approved"
        }
        else{
          prevAnswer ="Rejected"
        }
        break;
      }
    }
    answer[0] = "Form has already been "+prevAnswer+" by "+prevResponder;
    answer[1] = "allow"; 
  }

  return answer;
}



function approvalReply(responses, answer, dataSheet){
  var ss = SpreadsheetApp.openById(_spreadsheetId).getSheetByName(responses[2]);
  var lastCol = ss.getLastColumn();
  var lastRow = ss.getLastRow();
  var keys = ss.getRange(1, lastCol-4, lastRow, 1).getValues();
  
  var dataOb;
  Logger.log(keys);
  for(var i=0; i<keys.length; i++){
    if(keys[i] == responses[7]){
      var data = ss.getRange(i+1, 1, 1, lastCol).getValues();
      dataOb = createObject(dataSheet, data[0]);
    }
  }
  //Responses = approval form data
  Logger.log(responses);
  //Data = main sheet
  Logger.log(dataOb);
  Logger.log(answer);
  
  var approverBody = "Thank you for processing this form approval "+answer[0]; 
  //Reply to approver
  approvalEmails(responses[1], responses[2]+" Approval", approverBody)
  
  
  if(responses[4]=="Yes"){
    var approved ="Approved"
    var reason = ""
  }
  else{
    var approved ="Rejected"
    var reason = "The reason for rejection was - "+responses[5]
  }
  var subBody = "Your "+responses[2]+" form for "+responses[3]+" has been "+ approved +" by "+responses[1]+reason;
  
  //Notify Submitter
  if(answer[1] == ""){
    approvalEmails(dataOb.email, responses[2]+" "+approved, subBody)
  }
    
  return approved
}



function approvalEmails(recipient, subject, body){
  MailApp.sendEmail(recipient, subject, body, {
      name:"HR Approver",
  })
}
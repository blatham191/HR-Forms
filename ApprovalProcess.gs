function approvalProcess(e){
  var responses = e.values;
  var answer = approvalHandle(responses);
  var dataSheet = "";
  var col = "";
  var ftpFolder = "";
  var forHR = false;
  if(responses[2] == "New Starter"){
    dataSheet ="NewStarter_DataSheet";
    col = 3;
    ftpFolder = DriveApp.getFolderById("1-B-neMTtdLdn7naLMo3EEgiuM45FKul8")
  }
  else if(responses[2] == "Employee Details Change"){
    dataSheet ="edc_DataSheet";
    ftpFolder = DriveApp.getFolderById("1-B-neMTtdLdn7naLMo3EEgiuM45FKul8")
    col = 5;
  }
  else if(responses[2] == "Pay Adjustment/Query"){
    dataSheet ="payAdjust_DataSheet";
    ftpFolder = DriveApp.getFolderById("17wvH-K_xOKfctMcGm7ffphkeXG-xY-hm")
    col = 7;
  }
  else if(responses[2] == "Change in Terms of Employment"){
    dataSheet ="changeInTerms_DataSheet";
    ftpFolder = DriveApp.getFolderById("1zn8Ih23KAciLHY6eY2fz-3jbdkH1eCig")
    if(responses[10] == "Yes"){
      forHR = true
    }
    else if(responses[10] == "No"){
      ftpFolder = DriveApp.getFolderById("1-B-neMTtdLdn7naLMo3EEgiuM45FKul8")
    }
    col = 9;
  }
  else if(responses[2] == "Leaver"){
    dataSheet ="leaver_DataSheet";
    ftpFolder = DriveApp.getFolderById("1-B-neMTtdLdn7naLMo3EEgiuM45FKul8")
    col = 11;
  }
  
  var approvedAnswer = approvalReply(responses, answer, dataSheet);
  var payroll = getPayroll(responses[9]);
  
  if (approvedAnswer == "Approved"){
    var fileName = "["+payroll+"]"+responses[2]+"[PayID -"+responses[11]+"]"+responses[2]+" - "+responses[3]+" - "+responses[7];
    var destinationFolderID = getDriveID(responses[9], col);
    var destFolder = DriveApp.getFolderById(destinationFolderID);
    var folders = [destFolder, ftpFolder]
    var docId = addApprover(responses[2], responses)
    
    
    //NEWCODE
    if(responses[2] == "Pay Adjustment/Query" || responses[2] == "Change in Terms of Employment"){
      var file = DriveApp.getFileById(docId).makeCopy(fileName, ftpFolder);
      var newId = makePDF(docId, folders, fileName);
      var document = _docUrl+newId;
    }
    else{
      var newId = makePDF(docId, folders, fileName);
      var document = _docUrl+newId;
    }
    
    
    if(responses[2] == "New Starter"){
      var subject = responses[2]+" Submitted"
    }
    else{
      var subject = "[Payroll ID - "+responses[11]+"] "+responses[2]+" Submitted"
    }
    
    if(forHR == true){
      var recipient = "karen.fellows@roadchef.com"
      var payrollBody = "Hi Karen,<br><br>A new form has been submitted, please see the following link for the submission document "+document+"<br>User for:"+responses[3]+"<br>Site:"+responses[9]+"<br>ID:"+responses[7];
    }
    else{
      var recipient = "liz.robertson@roadchef.com"
      var payrollBody = "Hi Liz,<br><br>A new form has been submitted, please see the following link for the submission document "+document+"<br>User for:"+responses[3]+"<br>Site:"+responses[9]+"<br>ID:"+responses[7];
    }
    
    approvalEmails("ben.latham@roadchef.com", subject, payrollBody)
  }
  else if (approvedAnswer == "Rejected"){
    var fileName = "[REJECTED]"+responses[2]+" - "+responses[3]+" - "+responses[7];
    var destinationFolderID = getDriveID(responses[9], col+1);
    var destFolder = DriveApp.getFolderById(destinationFolderID);
    var folders = [destFolder]
    var docId = addApprover(dataSheet, responses)
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
  
  if(responses[4]=="Approve"){
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
  
  
  if(responses[4]=="Approve"){
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
  MailApp.sendEmail(recipient, subject, "not seen", {
      htmlBody: body,
      name:"HR Approver"
  })
}
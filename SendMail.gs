function sendMail(formType, approvers, key, response, driveLink, linkName, name){
  Logger.log("Send Emails");

  var formLink = "https://docs.google.com/forms/d/e/1FAIpQLSes1kjRPK0bq6byqO0emtk7TfzJQLn6o1knN9ooQyftxC87sQ/viewform?usp=pp_url";
//  var grade = "";
//  if(response.gradeChange == "Yes"){
//      grade = "Yes"
//  }
//  else{
//      grade = "NO"
//  }  
    
  var ans_type = "&entry.1296796524="+formType
  var ans_vis_name = "&entry.1743323147="+linkName
  var ans_approved = "&entry.1318196591="
  var ans_reason = "&entry.1240720955="
  var ans_hidden_name = "&entry.1700503759="+linkName
  var ans_hidden_id = "&entry.1877727938="+key
  var ans_hidden_site = "&entry.358117515="+response.site
  var ans_grade_change = "&entry.841256230="+response.gradeChange
  
  var link = formLink+ans_type+ans_vis_name+ans_approved+ans_reason+ans_hidden_name+ans_hidden_id+ans_hidden_site+ans_grade_change
  
  if(formType == 'Change in Terms of Employment'){
   var gradeType = "";
   Logger.log(response.gradeChange)
    if(response.gradeChange == "Yes"){
      gradeType = "GRADE CHANGE"
    }
    else{
      gradeType = "NOT A GRADE CHANGE"
    }
   var subject = "["+gradeType+"] "+formType + " Form Approval Request (" + key + ")" ;
   var html = "A "+formType+" form has been submitted for "+name+" by "+response.email+" and needs approval<br>Please note that this submission has been marked as "+gradeType+" please ensure that this is correct before approving this form."+ "<a href='"+link+"'>Click Here</a><br>Please go to the following <a href='"+driveLink+"'>Google Drive Link to see the full document</a>";
  }
  else{
    var subject = formType + " Form Approval Request (" + key + ")" ;
    var html = "A "+formType+" form has been submitted for "+name+" by "+response.email+" and needs approval<br>" + "<a href='"+link+"'>Click Here</a><br>Please go to the following <a href='"+driveLink+"'>Google Drive Link to see the full document</a>";
  }

  var approverList = "";

  for(var i=0; i<approvers.length; i++){
    MailApp.sendEmail(approvers[i], subject, "Null", {
      name:"HR Approver",
      htmlBody: html
    })
    approverList += approvers[i]+ ", ";
  }
  
  
  
  var subSubject = formType + " Form Submission (" + key + ")" ;
  var subBody = "Your form submission for "+name+" has been recieved. An approval email has been sent to "+approverList;
  MailApp.sendEmail(response.email, subSubject, subBody, {
      name:"HR Approver",
    })
}



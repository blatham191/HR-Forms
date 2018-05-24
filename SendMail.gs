function sendMail(formType, approvers, key, response, driveLink, linkName, name){
  Logger.log("Send Emails");
  
//  var approvers = ["ben.latham@roadchef.com"];
//  var key = "123456";
//  var response = {type:"New Starter", perm_fName:"Ben", perm_sName:"Latham"};
//  var driveLink = "www.link.com";
  
  var subject = formType + " Form Approval Request (" + key + ")" ;
  
//  var name;
//  
//  if(response.perm_fName != ""){
//    var name = response.perm_fName+" "+response.perm_sName;
//    var linkName = response.perm_fName+"+"+response.perm_sName;
//  }
//  else{
//    var name = response.agency_fName+" "+response.agency_sName;
//    var linkName = response.agency_fName+"+"+response.agency_sName;
//  }
  
  //var linkType = response.type.replace(/\s/g, "+");
  
  
  var formLink = "https://docs.google.com/forms/d/e/1FAIpQLSes1kjRPK0bq6byqO0emtk7TfzJQLn6o1knN9ooQyftxC87sQ/viewform?usp=pp_url";
  
  var ans_type = "&entry.1296796524="+formType
  var ans_vis_name = "&entry.1743323147="+linkName
  var ans_approved = "&entry.1318196591="
  var ans_reason = "&entry.1240720955="
  var ans_hidden_name = "&entry.1700503759="+linkName
  var ans_hidden_id = "&entry.1877727938="+key
  var ans_hidden_site = "&entry.358117515="+response.site
  
  var link = formLink+ans_type+ans_vis_name+ans_approved+ans_reason+ans_hidden_name+ans_hidden_id+ans_hidden_site
  
  var html = "A "+formType+" form has been submitted for "+name+" by "+response.email+" and needs approval<br>" + "<a href='"+link+"'>Click Here</a><br>Please go to the following <a href='"+driveLink+"'>Google Drive Link to see the full document</a>";

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



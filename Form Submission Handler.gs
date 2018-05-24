//On form submit collect replies (e)
//Pass responses and sheet name to createObject function to create JS object dynamically - set to response variable
//Set output folder and template document and trigger copyDocument function (send it the template and folder ID's aswell as responses) set new doc ID as variable
//Run writeDocument function send it the new docs ID along with destination folder and responses 
// Create key from key creation function (Pass it the sheet name that the form responses write too.)
//Get a list of approvers and the drive link for the site the relates to the form response.

//Send email(pass it the approvers, key, response details and the link to the drive folder)
//On Approval add approver to the file and convert to pdf
//Delete temp Google doc and copy file to ftp folder
//Google Sync file to server C:\ drive and set task in task scheduler to run batch file to move to PI channel folder on server

/*
*New starter forms are sent to payroll with a copy to Liz. WORKING
*Employee Details Change forms are sent to payroll with a copy to Liz. WORKING
*
*Pay Adjustment forms should be sent to Liz, for checking, amending Kronos records, issuing Pay Advances etc.  Once checked I forward to payroll with any additional instruction required. WORKING
*File is dropped into "For Approval" folder, once approved Liz can drop it into the approved folder which will send it to SD Worx
*
*Change in Terms forms are sent to payroll with a copy to Liz, with the exception of grade changes.
*Grade changes are sent to Karen Fellows with a copy to Liz. Once authorised Karen will forward to payroll with a copy to Liz.
*ASK KAREN ABOUT THIS
*
*Leaver forms are sent to payroll with a copy to me. WORKING
*/
//Pay adjustment forms should be sent to me, for checking, amending Kronos records, issuing Pay Advances etc.  Once checked I forward to payroll with any additional instruction required.

/*
*
*ADD GRADE CHANGE QUESTION TO CHANGE IN TERMS
*
*/


//Triggered when form is submitted 'e' is the form response
function onFormSubmit(e){
//Assign responses to variable (this is an array)
  if('Approval' in e.namedValues){
    Logger.log("Trigger Approval Function");
    approvalProcess(e);
  }
  else if('New Starter' in e.namedValues){
    Logger.log("Trigger New Starter Function");
    newStarter(e);
  }
  else if('Employee Details Change' in e.namedValues){
    Logger.log("Trigger EDC Function");
    edc(e);
  }
  else if('Pay Adjustment/Query' in e.namedValues){
    Logger.log("Trigger PayAdjust Function");
    payAdjust(e);
  }
  else if('Change in Terms of Employment' in e.namedValues){
    Logger.log("Trigger Change in Terms Function");
    changeInTerms(e);
  }
  else if('Leaver' in e.namedValues){
    Logger.log("Trigger Leaver Function");
    leaver(e);
  } 
}




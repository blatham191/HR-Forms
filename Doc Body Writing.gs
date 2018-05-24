function writeNewStarter(body, response, key) {
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
    if(response.bankType == "Building Society"){
      body.replaceText("<<Account Number>>" , response.buildingSo_accountNo);
      body.replaceText("<<Sort Code>>" , response.buildingSo_sortNo);
      body.replaceText("<<Building Society Number>>" , response.buildingSo_buildingSocietyNo);
    }     
    if(response.bankType == "None"){
      body.replaceText("<<Account Number>>" , "N/A");
      body.replaceText("<<Sort Code>>" , "N/A");
      body.replaceText("<<Building Society Number>>" , "N/A");
    } 
    
    body.replaceText("<<Email address>>" , response.email);
    
    body.replaceText("<<Access Code>>" , key);
  }
}


function writeEcd(body, response, key){
  body.replaceText("<<Email Address>>", response.email)
  
  body.replaceText("<<payrollType>>", response.payrollType)
  body.replaceText("<<Type of change>>", response.typeOfChange)
  
  body.replaceText("<<payrollNum>>", response.payrollNum)
  body.replaceText("<<forename>>", response.fName); 
  body.replaceText("<<surname>>", response.sName);
  body.replaceText("<<site>>", response.site)
  body.replaceText("<<department>>", response.department)
  
  if(response.typeOfChange == "Personal"){
    body.replaceText("<<Address Line 1>>", response.address1)
    body.replaceText("<<Address Line 2>>", response.address2)
    body.replaceText("<<Address Line 3>>", response.address3)
    body.replaceText("<<Address Line 4>>", response.address4)
    body.replaceText("<<Address Line 5>>", response.address5)
    body.replaceText("<<Post Code>>", response.postCode)
    body.replaceText("<<Country>>", response.country)
    body.replaceText("<<home>>", response.homePhone)
    body.replaceText("<<mobile>>", response.mobilePhone)
    body.replaceText("<<Title>>", response.title)
    body.replaceText("<<Marital Status>>", response.maritalStatus)
    body.replaceText("<<National Insurance Number>>", response.niNum)
    body.replaceText("<<Email>>", response.em_email)
  }
  else{
    body.replaceText("<<Address Line 1>>", response.both_address1)
    body.replaceText("<<Address Line 2>>", response.both_address2)
    body.replaceText("<<Address Line 3>>", response.both_address3)
    body.replaceText("<<Address Line 4>>", response.both_address4)
    body.replaceText("<<Address Line 5>>", response.both_address5)
    body.replaceText("<<Post Code>>", response.both_postCode)
    body.replaceText("<<Country>>", response.both_country)
    body.replaceText("<<home>>", response.both_homePhone)
    body.replaceText("<<mobile>>", response.both_mobilePhone)
    body.replaceText("<<Title>>", response.both_title)
    body.replaceText("<<Marital Status>>", response.both_maritalStatus)
    body.replaceText("<<National Insurance Number>>", response.both_niNum)
    body.replaceText("<<Email>>", response.both_em_email)
  }
  
  body.replaceText("<<bank type>>", response.bankType)
    if(response.bankType == "Bank Account"){
      body.replaceText("<<Account Number>>" , response.bank_accountNo);
      body.replaceText("<<Sort Code>>" , response.bank_sortNo);
      body.replaceText("<<Building Society Number>>" , "N/A");
    }
    if(response.bankType == "Building Society"){
      body.replaceText("<<Account Number>>" , response.buildingSo_accountNo);
      body.replaceText("<<Sort Code>>" , response.buildingSo_sortNo);
      body.replaceText("<<Building Society Number>>" , response.buildingSo_buildingSocietyNo);
    }     
    if(response.bankType == "None"){
      body.replaceText("<<Account Number>>" , "N/A");
      body.replaceText("<<Sort Code>>" , "N/A");
      body.replaceText("<<Building Society Number>>" , "N/A");
    }       
  
  body.replaceText("<<Access Code>>" , key);
}

function writePayAdjust(body, response, key){
  body.replaceText("<<Email Address>>", response.email); 
    
  body.replaceText("<<payrollType>>", response.payrollType); 
  body.replaceText("<<payrollNum>>", response.payrollNum); 
  body.replaceText("<<forename>>", response.fName); 
  body.replaceText("<<surname>>", response.sName); 
  body.replaceText("<<site>>", response.site); 
  body.replaceText("<<department>>", response.department); 
  body.replaceText("<<category>>", response.category); 
  body.replaceText("<<hours>>", response.hours); 
  body.replaceText("<<rate of pay>>", response.rateOfPay); 
  body.replaceText("<<total wages>>", response.totalWages); 
  body.replaceText("<<pay code>>", response.payCode); 
  
  body.replaceText("<<comments>>", response.comments); 
  
  
  body.replaceText("<<Access Code>>", key); 
}

function writeChangeTerms(body, response, key){
  body.replaceText("<<Email Address>>", response.email);

  body.replaceText("<<typeOfChange>>", response.typeOfChange);
  
  body.replaceText("<<payrollType>>", response.payrollType);
  body.replaceText("<<payrollNum>>", response.payrollNum);
  body.replaceText("<<forename>>", response.fName);
  body.replaceText("<<surname>>", response.sName);
  
  body.replaceText("<<basic pay>>", response.basicPay);
  body.replaceText("<<rate qualifier>>", response.rateQualifier); 
  body.replaceText("<<hourly rate>>", response.hourlyRate);
  body.replaceText("<<grade change>>", response.gradeChange);
  body.replaceText("<<contracted hours>>", response.contractedHours);
  body.replaceText("<<cost code>>", response.costCode);
  body.replaceText("<<site>>", response.site);
  body.replaceText("<<department>>", response.department);
  body.replaceText("<<date>>", response.date);
  
  body.replaceText("<<comments>>", response.comments);
  
  
  body.replaceText("<<Access Code>>", key);
}

function writeLeaver(body, response, key){
Logger.log(key)
  body.replaceText("<<Email Address>>", response.email);

  body.replaceText("<<type>>", response.type);
  body.replaceText("<<payrollType>>", response.payrollType);
  body.replaceText("<<payrollNum>>", response.payrollNum);
  body.replaceText("<<forename>>", response.fName);
  body.replaceText("<<surname>>", response.sName);
  
  body.replaceText("<<site>>", response.site);
  body.replaceText("<<leaving date>>", response.leavingDate);
  body.replaceText("<<number of holidays>>", response.numHolidays);
  body.replaceText("<<agency>>", response.agency);
  
  
  body.replaceText("<<Access Code>>", key);
}


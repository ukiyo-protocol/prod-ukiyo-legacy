const checkRequiredValidation = (fieldValue: any) => {
  let isValidate = true;
  if (!fieldValue) {
    isValidate = false;
  }
  return isValidate;
};

const shouldBeNumberValidation = (fieldValue: any, isCurrencyETH: boolean) => {
  let isValidate = true;
  let pattern;
  // let pattern = /^\d+\.?\d*$/;
  
  if (isCurrencyETH) {
    pattern = /^\d*\.?\d{0,8}$/gm;
  } else {
    pattern = /^\d*\.?\d{0,6}$/gm;
  }

  const verify = pattern.test(fieldValue);
  if (verify === false) {
    isValidate = false;
  }
  return isValidate;
};


const firstName = (fieldValue: any) => {
  let validate = false;
  let pattern = /^[A-Za-z]+$/
    ///([a-zA-Z]{3,30}\s*)+/;
  const verify = pattern.test(fieldValue);
  if (verify === true) {
    validate = true
  }
   return validate
};

const lastName = (fieldValue: any) => {
  let validate = false;
  let pattern = /^[A-Za-z]+$/
    ///[a-zA-Z]{3,30}/;
  const verify = pattern.test(fieldValue);
  if (verify === true) {
    validate = true;
  }
  return validate;
};


const email = (fieldValue: any) => {
  let validate = false;
  let pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const verify = pattern.test(fieldValue);
  if (verify === true) {
    validate = true;
  }
  return validate;
};

const emailDomain = (fieldValue: any)=>{
  
  let atpos = fieldValue.indexOf("@");
  let domain = fieldValue.split("@")[1]; // Saves user input after the @ (at)
     // First test checks for atleast one character before @
    if (atpos < 1 || domain != "yopmail.com"){ // Second test checks if the user entered a gmail.com domain after @
   // alert("Not a valid e-mail address. Please write your gmail address like this: username@gmail.com.");
   // return false;
      return false;
    } else {
      return true;
    }
  
}

const password = (fieldValue: any) => {
  let validate = false;
  // let pattern = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-.]).{8,}$/;
    let pattern = /^(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-.]).{8,}$/;

  const verify = pattern.test(fieldValue);
  if (verify === true) {
    validate = true;
  }
  return validate;
};

const decimalCountCheck = (num:number) => {
  const numStr = String(num);
   // String Contains Decimal
   if (numStr.includes('.')) {
      return numStr.split('.')[1].length;
   };
   // String Does Not Contain Decimal
   return 0;
}

export const Validation = {
  checkRequiredValidation,
  shouldBeNumberValidation,
  firstName,
  lastName,
  email,
  password,
  emailDomain,
  decimalCountCheck
};

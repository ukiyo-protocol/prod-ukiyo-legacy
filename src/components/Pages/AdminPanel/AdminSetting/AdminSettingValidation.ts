import {
  IUpdateOwnershipAddress,
  IUpdateReceiverAddress,
} from "../../../../interfaces/admin";

export const formValidtion = (
  inputValues: IUpdateOwnershipAddress,
  setErrors: any
) => {
  let isValidate = true;
  let errors: any = {};
  if (!inputValues.newOwnerAddress) {
    errors["newOwnerErr"] = "New ownership address is required";
    isValidate = false;
  }
  if (!inputValues.confirmNewOwnerAddress) {
    errors["confOwnerErr"] = "Confirmation address is required";
    isValidate = false;
  }
  if (
    inputValues.confirmNewOwnerAddress &&
    inputValues.newOwnerAddress &&
    inputValues.newOwnerAddress.toLowerCase() !==
      inputValues.confirmNewOwnerAddress.toLowerCase()
  ) {
    errors["confOwnerErr"] =
      "Please check if ownership and confirm ownership address is identical";
    isValidate = false;
  }

  setErrors(errors);
  return isValidate;
};

export const receiverFormValidtion = (
  inputValues: IUpdateReceiverAddress,
  setErrors: any
) => {
  let isValidate = true;
  let errors: any = {};
  if (!inputValues.newReceiverAddress) {
    errors["newReceiverErr"] = "New receiver address is required";
    isValidate = false;
  }
  if (!inputValues.confirmNewReceiverAddress) {
    errors["confReceiverErr"] = "Confirmation address is required";
    isValidate = false;
  }
  if (
    inputValues.confirmNewReceiverAddress &&
    inputValues.newReceiverAddress &&
    inputValues.newReceiverAddress.toLowerCase() !==
      inputValues.confirmNewReceiverAddress.toLowerCase()
  ) {
    errors["confReceiverErr"] =
      "Please check if receiver and confirm receiver address is identical";
    isValidate = false;
  }

  setErrors(errors);
  return isValidate;
};

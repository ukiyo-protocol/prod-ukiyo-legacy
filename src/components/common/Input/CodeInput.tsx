import ReactCodeInput from "react-code-input";
import "./InputStyle.scss";
import { useState } from 'react';

const CodeInput = ({ callback, input }: any) => {
  
  // onchange handler to get otp from input
  const onChangeHandler = (data: any) => {
    callback(Number(data));
  }
  return (
    <div className="codeInput_style">
      <ReactCodeInput type="number" value={input} fields={6} name={""} onChange={onChangeHandler} inputMode={"tel"} />
    </div>
  );
};

export default CodeInput;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form } from "react-bootstrap";
import AuthLayout from "../../../Layout/AuthLayout";
import CustomInput from "../../../common/Input/CustomInputNew";
import ButtonCustom from "../../../common/ButtonNew/ButtonCustomNew";
import resetImg from "../../../../assets/Images/resetImg.svg";
import { apiCallPost } from "../../../../services/axios";
import { API, API_HOST } from "../../../../config/constants";
import { IAxiosResponse } from "../../../../interfaces/axios";
import Toast from "../../../common/Toast";
import { RESPONSES } from "../../../../constants/response";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  
  // function to reset password via verify-otp
  const handlerToReset = async(e:any) => {
    e.preventDefault();
    let result = await apiCallPost(API_HOST + API.USER.PASSWORD.SEND_OTP, { email: email }) as IAxiosResponse;
    if (result && result.status == RESPONSES.SUCCESS) {
      
      navigate("/verify-otp",{state :{email : result.data}});
      Toast.success(result.message);
    } else {
      Toast.error(result.message);
    }
  }
  return (
    <AuthLayout
      img={resetImg}
      title="Reset Password"
      text="Please enter your registered email address"
      isback={true}
    >
      <Form>
        <CustomInput
          label="Email"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange ={(e:any)=> setEmail(e.target.value)}
          required
        />
        <ButtonCustom
          type='button'
          className="btnGradient authBtn mt-4"
          title="Reset"
          onClick={(e:any) => {
            handlerToReset(e);
          //  navigate("/verify-otp");
          }}
        />
      </Form>
    </AuthLayout>
  );
};

export default ResetPassword;

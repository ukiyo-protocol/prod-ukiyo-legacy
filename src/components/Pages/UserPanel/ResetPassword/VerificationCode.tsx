import { useLocation, useNavigate } from "react-router-dom";
import { Form } from "react-bootstrap";
import AuthLayout from "../../../Layout/AuthLayout";
import ButtonCustom from "../../../common/ButtonNew/ButtonCustomNew";
import resetImg from "../../../../assets/Images/resetImg.svg";
import CodeInput from "../../../common/Input/CodeInput";
import { useState } from 'react';
import { apiCallPost } from "../../../../services/axios";
import { API, API_HOST } from "../../../../config/constants";
import { IAxiosResponse } from "../../../../interfaces/axios";
import { RESPONSES } from "../../../../constants/response";
import Toast from "../../../common/Toast";

const VerificationCode = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [otp, setOtp] = useState();  
  
  const otpHandler = (data: any) => {
    setOtp(data);
  }
  
  //handler to verify otp
  const handlerToVerify = async(e: any) => {
    e.preventDefault();
    let data = {
      email: location.state.email,
      otp :(otp)
    }
    
    let result = await apiCallPost(API_HOST + API.USER.PASSWORD.VERIFY_OTP, data) as IAxiosResponse;
    if (result && result.status === RESPONSES.SUCCESS) {
      navigate("/change-password", { state: { email: location.state.email }});
      Toast.success(result.message);
    } else {
      Toast.error(result.message);
    }
    
  }
  return (
    <AuthLayout
      img={resetImg}
      title="Verification code"
      text="We have sent a verification code to your registered email ID."
      isback={true}
    >
      <Form>
        <CodeInput value={otp} callback={otpHandler} />
        <ButtonCustom
          className="btnGradient authBtn"
          title="Done"
          onClick={(e:any) => {
            handlerToVerify(e);
            // navigate("/change-password");
          }}
        />
      </Form>
    </AuthLayout>
  );
};

export default VerificationCode;

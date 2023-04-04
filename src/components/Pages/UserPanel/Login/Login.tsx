import { Link, Navigate, Outlet, useNavigate } from "react-router-dom";
import { Form } from "react-bootstrap";
import loginImg from "../../../../assets/Images/loginImg.svg";
import AuthLayout from "../../../Layout/AuthLayout";
import CustomInput from "../../../common/Input/CustomInputNew";
import ButtonCustom from "../../../common/ButtonNew/ButtonCustomNew";
import "./Login.scss";
import { useState } from "react";
import { Validation } from "../../../../helpers/validation.helper";
import { apiCallPost } from "../../../../services/axios";
import { API, API_HOST } from "../../../../config/constants";
import { AxiosResponse } from "axios";
import Toast from "../../../common/Toast";
import { COMMON_MESSAGES } from "../../../../constants/messages";
import { useAppDispatch } from "../../../../hooks/hooks";
import * as actionTypes from "../../../../redux/actionTypes";
import { setLoader } from "../../../../redux/actions/loader.action";
import { getUkiyoTokenDetailsMethod } from "../../../../services/methods/userMethod";
import { useSelector } from "react-redux";

import HideIcon from "../../../../assets/Images/hide.png";
import ShowIcon from "../../../../assets/Images/show.png";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [eyeIcon, setEyeIcon] = useState("hide");

  const clearState = () => {
    setEmail("");
    setPassword("");
  };
  const handlerToSubmit = async (e: any) => {
    e.preventDefault();
    dispatch(setLoader(true));
    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    const result = (await apiCallPost(
      API_HOST + API.USER.LOGIN,
      formData
    )) as any;
    if (result && result?.status == 200) {
      dispatch({ type: actionTypes.TOKEN, payload: result.data });
      dispatch({ type: actionTypes.IS_ADMIN, payload: false });
      clearState();
      Toast.success(COMMON_MESSAGES.USER.LOGIN.SUCCESS);
      navigate("/dashboard");
    } else {
      Toast.error(result?.message);
    }
    dispatch(setLoader(false));
  };
  return (
    <AuthLayout
      img={loginImg}
      title={
        <>
          Log in to <span>ukiyo</span>
        </>
      }
    // text="Welcome back"
    >
      <Form onSubmit={handlerToSubmit}>
        <CustomInput
          label="Email"
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e: any) => {
            let value = e.target.value;
            let verify = Validation.email(value);
            if (value) {
              if (verify) {
                setEmail(value);
                setEmailError("");
              } else {
                setEmailError("Enter a valid email address");
              }
            } else {
              setEmailError("");
            }
          }}
          required={true}
          errorText={emailError}
        />
        <div className="Password_Input">
          <CustomInput
            label="Password"
            type={eyeIcon == "hide" ? "password" : "text"}
            placeholder="Enter password"
            value={password}
            onChange={(e: any) => {
              let value = e.target.value;
              if (value) {
                setPassword(value);
                setPasswordError("");
              } else {
                setPasswordError("Please enter password");
              }
            }}
            required={true}
            errorText={passwordError}
          />

          {eyeIcon == "show" ? (
            <img
              src={ShowIcon}
              alt="show-icon"
              onClick={() => setEyeIcon("hide")}
              width="20px"
            />
          ) : (
            <img
              className="eye_Icon"
              src={HideIcon}
              onClick={() => setEyeIcon("show")}
              alt="hide-icon"
              width="20px"
            />
          )}
        </div>
        <div className="frgtLink">
          <Link to="/reset-password">Forgot Password?</Link>
        </div>
        <ButtonCustom
          type={"submit"}
          className="btnGradient authBtn"
          title="Login"
        />
        <p className="registerLink">
          Don’t have an account? <Link to="/register">Register here</Link>
        </p>
      </Form>
    </AuthLayout>
  );
};

export default Login;

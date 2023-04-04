import { useLocation, useNavigate } from "react-router-dom";
import { Form } from "react-bootstrap";
import AuthLayout from "../../../Layout/AuthLayout";
import CustomInput from "../../../common/Input/CustomInputNew";
import ButtonCustom from "../../../common/ButtonNew/ButtonCustomNew";
import resetImg from "../../../../assets/Images/resetImg.svg";
import { useState } from 'react';
import { Validation } from "../../../../helpers/validation.helper";
import { COMMON_MESSAGES } from "../../../../constants/messages";
import { apiCallPost } from '../../../../services/axios';
import { API, API_HOST } from "../../../../config/constants";
import { IAxiosResponse } from "../../../../interfaces/axios";
import { RESPONSES } from '../../../../constants/response';
import Toast from "../../../common/Toast";
import ShowIcon from "../../../../assets/Images/show.png";
import HideIcon from "../../../../assets/Images/hide.png";

const ChangePassword = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [newPasswordError, setNewPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const [eyeIcon, setEyeIcon] = useState('hide');
  const [eyeIconCnfrmPwd, setEyeIconCnfrmPwd] = useState('hide');

  //handler to confirm password with new password
  const handlerToConfirmPassword = (value: any) => {
    if (!newPassword) {
      return setNewPasswordError(COMMON_MESSAGES.PASSWORD.EMPTY)
    }
    if (!value) {
      return setConfirmPasswordError(COMMON_MESSAGES.PASSWORD.EMPTY)
    }

    if (newPassword !== value) {
      setConfirmPasswordError(COMMON_MESSAGES.PASSWORD.NOT_MATCHED)
    } else {
      setConfirmPasswordError('');
    }
  }


  //handler to update a new password after reseting

  const handlerToResetPassword = async (e: any) => {
    e.preventDefault();
    if (!newPassword) {
      return setNewPasswordError(COMMON_MESSAGES.PASSWORD.EMPTY)
    }

    if (!confirmPassword) {
      return setConfirmPasswordError(COMMON_MESSAGES.PASSWORD.EMPTY)
    }

    if (newPassword !== confirmPassword) {
      return setConfirmPasswordError(COMMON_MESSAGES.PASSWORD.NOT_MATCHED)
    }

    let data = { email: location.state.email, password: newPassword }
    let result = await apiCallPost(API_HOST + API.USER.PASSWORD.RESET, data) as IAxiosResponse;
    if (result && result.status == RESPONSES.SUCCESS) {
      Toast.success(result.message);
      navigate('/login')
    } else {
      Toast.error(result.message);
    }
  }

  return (
    <AuthLayout
      img={resetImg}
      title="Reset Password"
      text="Please enter a new password"
      isback={true}
    >
      <Form>
        <div className="Password_Input">
          <CustomInput
            label="New Password"
            type={eyeIcon == 'hide' ? "password" : 'text'}
            placeholder="Enter your new password here"
            value={newPassword}
            onChange={(e: any) => {
              let value = e.target.value;
              let verify = Validation.password(value);

              if (value) {
                if (verify) {
                  setNewPassword(value);
                  setNewPasswordError('');
                } else {
                  setNewPasswordError('Password should contains capital letter , number , special characters,minimum 8 characters..');
                }
              } else {
                setNewPasswordError('');
              }
            }}
            required
            errorText={newPasswordError}
          />

          {eyeIcon == 'show' ? <img src={ShowIcon} alt="show-icon" onClick={() => setEyeIcon('hide')} width='20px' />
            : <img src={HideIcon} onClick={() => setEyeIcon('show')} alt="hide-icon" width='20px' />}
        </div>
        <div className="Password_Input">
          <CustomInput
            label="Confirm Password"
            type={eyeIconCnfrmPwd == 'hide' ? "password" : 'text'}
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e: any) => {
              let value = e.target.value;
              if (value) {
                setConfirmPassword(value);
                handlerToConfirmPassword(e.target.value)
              } else {
                setConfirmPasswordError('')
              }
            }}
            required
            errorText={confirmPasswordError}
          />
          {eyeIconCnfrmPwd == 'show' ? <img src={ShowIcon} alt="show-icon" onClick={() => setEyeIconCnfrmPwd('hide')} width='20px' />
            : <img src={HideIcon} onClick={() => setEyeIconCnfrmPwd('show')} alt="hide-icon" width='20px' />}
        </div>

        <ButtonCustom
          type="button"
          className="btnGradient authBtn mt-4"
          title="Change Password"
          onClick={(e: any) => {
            handlerToResetPassword(e)
            //navigate("/login");
          }}
        />
      </Form>
    </AuthLayout>
  );
};

export default ChangePassword;

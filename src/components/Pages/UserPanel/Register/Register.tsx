import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Row, Col } from "react-bootstrap";
import AuthLayout from "../../../Layout/AuthLayout";
import CustomInput from "../../../common/Input/CustomInputNew";
import ButtonCustom from "../../../common/ButtonNew/ButtonCustomNew";
import registerImg from "../../../../assets/Images/registerImg.svg";
import Checkbox from "../../../common/Checkbox/Checkbox";
import SigninModal from "../../../common/Modals/SigninModal";
import "./Register.scss";

import { Validation } from "../../../../helpers/validation.helper";
import { COMMON_MESSAGES } from "../../../../constants/messages";

import { apiCallPost } from "../../../../services/axios"
import { API, API_HOST } from "../../../../config/constants";
import Toast from "../../../common/Toast";
import { AxiosResponse } from 'axios';
import { IAxiosResponse } from "../../../../interfaces/axios";
import { RESPONSES } from "../../../../constants/response";
import HideIcon from "../../../../assets/Images/hide.png";
import ShowIcon from "../../../../assets/Images/show.png";



const Register = () => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const handleClose = () => {
    navigate('/login')
    setShow(false)
  };
  const handleShow = () => setShow(true);


  //states for form data 
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [termAndCondition, setTermAndCondition] = useState(false)

  const [firstNameError, setFirstNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [confirmEmailError, setConfirmEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const [eyeIcon, setEyeIcon] = useState('hide');
  const [eyeIconCnfrmPwd, setEyeIconCnfrmPwd] = useState('hide')


  const clearState = () => {
    setFirstName('');
    setLastName('');
    setEmail('');
    setConfirmEmail('');
    setPassword('');
    setConfirmPassword('');
    setTermAndCondition(false);

  }

  const handlerToConfirmEmail = (value: any) => {

    if (!value) {
      return setEmailError('');
    } else {
      if (!email) {
        return setEmailError(COMMON_MESSAGES.EMAIL.INVALID_EMAIL)
      }
      if (!value) {
        return setConfirmEmailError(COMMON_MESSAGES.EMAIL.INVALID_EMAIL)
      }
      if (email !== value) {
        setConfirmEmailError(COMMON_MESSAGES.EMAIL.NOT_MATCHED)
      } else {
        setConfirmEmailError('');
      }


    }

  }

  const handlerToConfirmPassword = (value: any) => {
    if (!password) {
      return setPasswordError(COMMON_MESSAGES.PASSWORD.EMPTY)
    }
    if (!value) {
      return setConfirmPasswordError(COMMON_MESSAGES.PASSWORD.EMPTY)
    }
    if (password !== value) {
      setConfirmPasswordError(COMMON_MESSAGES.PASSWORD.NOT_MATCHED)
    } else {
      setConfirmPasswordError('');
    }
  }


  const handlerToSubmit = async (e: any) => {
    e.preventDefault();

    if (!Validation.email(email)) {
      return Toast.error('Please enter valid email address');
    }
    // if (!Validation.emailDomain(email)) {
    //   return Toast.error('Please enter correct email');
    // }

    if (password !== confirmPassword) {
      return setConfirmPasswordError(COMMON_MESSAGES.PASSWORD.NOT_MATCHED)

    }

    const formData = new FormData();
    formData.append('first_name', firstName);
    formData.append('last_name', lastName);
    formData.append('email', email);
    formData.append('password', password);

    const result = await apiCallPost(API_HOST + API.USER.SIGN_UP, formData) as any;
    if (result && result?.status == 200) {
      handleShow();
      clearState();
    } else {
      Toast.error(result.message)
    }

  }

  //handler to verify email on successful registeration
  // const handlerToVerifyingEmail = async(e: any) => {
  //   let data ={email :"test@yopmail.com"}
  //   let result = await apiCallPost(API_HOST + API.USER.VERIFY_EMAIL, data) as IAxiosResponse;
  //   if (result && result.status === RESPONSES.SUCCESS) {
  //     Toast.success(result.message);
  //     handleClose();
  //   } else {
  //     Toast.error(result.message);
  //   }
  // }
  return (
    <AuthLayout
      img={registerImg}
      title="Register"
    // text="Create New Ukiyo Account"
    >
      <Form onSubmit={handlerToSubmit} >
        <Row>
          <Col md={6} className="pe-md-1">
            <CustomInput
              labelRequired={true}
              type="text"
              label="First name"
              placeholder="Enter first name"
              value={firstName}
              onChange={(e: any) => {
                let value = e.target.value;
                let verify = Validation.firstName(value);
                if (value) {
                  if (verify) {
                    setFirstName(value);
                    setFirstNameError('');

                  } else {
                    setFirstNameError("Enter valid first name");
                  }
                } else {
                  setFirstNameError('');
                }

              }}
              required={true}
              errorText={firstNameError}
            />

          </Col>
          <Col md={6} className="ps-md-1">
            <CustomInput
              labelRequired={true}
              type="text"
              label="Last Name"
              placeholder="Enter last name"
              value={lastName}
              onChange={(e: any) => {
                let value = e.target.value;
                let verify = Validation.lastName(value);
                if (value) {
                  if (verify) {
                    setLastName(value);
                    setLastNameError('');
                  } else {
                    setLastNameError("Enter valid last name");
                  }
                } else {
                  setLastNameError('');
                }
              }}
              required={true}
              errorText={lastNameError}

            />

          </Col>
          <Col md={12}>
            <CustomInput
              labelRequired={true}
              type="email"
              label="Email"
              placeholder="Enter email"
              value={email}
              onChange={(e: any) => {
                let value = e.target.value;
                let verify = Validation.email(value);
                //let verifyDomain = Validation.emailDomain(value);
                if (value) {
                  // if (verify && verifyDomain) {
                  if (verify) {

                    setEmail(value);
                    setEmailError('');
                  } else {
                    setEmailError("Incorrect email id");
                  }
                } else {
                  setEmailError('');
                }
              }}
              required={true}
              errorText={emailError}

            />

          </Col>
          <Col md={12}>
            <CustomInput
              labelRequired={true}
              type="email"
              label="Confirm Email"
              placeholder="Confirm email"
              value={confirmEmail}
              onChange={(e: any) => {
                let value = e.target.value;
                if (value) {
                  setConfirmEmail(value);
                  handlerToConfirmEmail(e.target.value)
                } else {
                  setEmailError('');
                  setConfirmEmailError('')
                }

              }}
              required={true}
              errorText={confirmEmailError}
              autoComplete="new-email"

            />
          </Col>
          <Col md={6} className="pe-md-1">
            <div className="Password_Input">
              <CustomInput
                labelRequired={true}
                type={eyeIcon == 'hide' ? 'password' : 'text'}
                label="password"
                placeholder="Enter password"
                value={password}
                onChange={(e: any) => {
                  let value = e.target.value;
                  let verify = Validation.password(value);

                  if (value) {
                    if (verify) {
                      setPassword(value);
                      setPasswordError('');
                    } else {
                      setPasswordError('Password should contains capital letter,number,special characters,minimum 8 characters..');
                    }
                  } else {
                    setPasswordError('');
                  }
                }}
                required={true}
                errorText={passwordError}
                autoComplete="new-password"
              />

              {eyeIcon == 'show' ? <img src={ShowIcon} alt="show-icon" onClick={() => setEyeIcon('hide')} width='20px' />
                : <img className="eye_Icon" src={HideIcon} onClick={() => setEyeIcon('show')} alt="hide-icon" width='20px' />}
            </div>
          </Col>
          <Col md={6} className="ps-md-1">
            <div className="Password_Input">
              <CustomInput
                labelRequired={true}
                type={eyeIconCnfrmPwd == 'hide' ? 'password' : 'text'}
                label="Confirm Password"
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
                required={true}
                errorText={confirmPasswordError}

              />
              {eyeIconCnfrmPwd == 'show' ? <img src={ShowIcon} alt="show-icon" onClick={() => setEyeIconCnfrmPwd('hide')} width='20px' />
                : <img className="eye_Icon" src={HideIcon} onClick={() => setEyeIconCnfrmPwd('show')} alt="hide-icon" width='20px' />}
            </div>
          </Col>
          <Col md={12} className="checkbox_col">
            <Checkbox
              labelRequired={true}
              value={termAndCondition}
              onChange={(e: any) => setTermAndCondition(e.target.checked)}
              controlId="formBasicCheckbox1"
              label={
                <>
                  I Agree To The <Link to="/terms-and-conditions">Terms And Condition </Link> And{" "}
                  <Link to="/privacy-policy">Privacy And Policy.</Link>
                </>
              }
            />
            {/* <span className="text-danger fs-5">Note: Fields marked with an asterisk(*) are required</span> */}
          </Col>
        </Row>
        <ButtonCustom
          type={'submit'}
          className="btnGradient authBtn"
          title="Register"
          // onClick={handleShow}
          disabled={!termAndCondition ? true : false}
        />
        <SigninModal show={show} handleClose={handleClose} />
        <p className="registerLink">
          Already have an account? <Link to="/login">Login instead</Link>
        </p>
      </Form>
    </AuthLayout>
  );
};

export default Register;

import { AxiosResponse } from 'axios';
import { useEffect, useLayoutEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useSelector } from 'react-redux';
import { API, API_HOST } from "../../../../config/constants";
import { Validation } from "../../../../helpers/validation.helper";
import { IAxiosResponse } from "../../../../interfaces/axios";
import { apiCallGet, apiCallPost } from "../../../../services/axios";
import ButtonCustom from "../../../common/ButtonNew/ButtonCustomNew";
import CustomInput from "../../../common/Input/CustomInputNew";
import ChangePasswordModal from "../../../common/Modals/ChangePasswordModal";
import ProfileCard from "../../../common/ProfileCard/ProfileCard";
import Layout from "../../../Layout/Layout";
import "./Profile.scss";
import * as actionTypes from "../../../../redux/actionTypes"

import Toast from '../../../common/Toast';
import { COMMON_MESSAGES } from '../../../../constants/messages';
import { useAppDispatch } from '../../../../hooks/hooks';
import { RESPONSES } from '../../../../constants/response';
import { useNavigate } from 'react-router-dom';
import { disconnectWallet } from '../../../../redux/actions/connect.action';
import HideIcon from "../../../../assets/Images/hide.png";
import ShowIcon from "../../../../assets/Images/show.png";

const Profile = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const userDetails = useSelector((state: any) => state.user);
  const token = useSelector((state: any) => state.user.token);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('')

  const [firstNameError, setFirstNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [oldPasswordError, setOldPasswordError] = useState('');

  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [isProfileUpdated, setIsProfileUpdated] = useState(false);

  const [eyeIconOldPwd, setEyeIconOldPwd] = useState('hide');
  const [eyeIcon, setEyeIcon] = useState('hide');
  const [eyeIconCnfrmPwd, setEyeIconCnfrmPwd] = useState('hide');

  useEffect(() => {
    if (!userDetails.isAdmin) {
      getUserProfile()
    }
  }, []);

  const getUserProfile = async () => {
    const result = await (apiCallGet(API_HOST + API.USER.PROFILE.VIEW, {}, false, false)) as AxiosResponse;
    if (result && result.status == RESPONSES.SUCCESS) {
      setFirstName(result.data.first_name);
      setLastName(result.data.last_name);
      setEmail(result.data.email);
    }

    setIsProfileUpdated(false);

  }

  const updateUserProfile = async (e: any) => {
    e.preventDefault();
    
    let fName = Validation.firstName(firstName);
    let lName = Validation.lastName(lastName);
    if (!fName) {
      return setFirstNameError('Enter valid first name');
    }
    if (!lName) {
      return setLastNameError('Enter valid last name');
    }


    let formData = new FormData();
    formData.append('first_name', firstName);
    formData.append('last_name', lastName);
    const result = await (apiCallPost(API_HOST + API.USER.PROFILE.EDIT, formData)) as IAxiosResponse;
    if (result && result.status == RESPONSES.SUCCESS) {
      Toast.success(result.message);

      dispatch(disconnectWallet(userDetails.wallet))
    } else {
      Toast.error(result.message);
    }



    getUserProfile();
    setIsProfileUpdated(true)
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

  const handlerToChangePassword = async (e: any) => {
    e.preventDefault();
    if (!password) {
      return setPasswordError(COMMON_MESSAGES.PASSWORD.EMPTY)
    }
    if (!oldPassword) {
      return setOldPasswordError("Old password required")
    }
    if (password !== confirmPassword) {
      return setConfirmPasswordError(COMMON_MESSAGES.PASSWORD.NOT_MATCHED)
    }
    let formData = new FormData();
    formData.append('old_password', oldPassword);
    formData.append('new_password', password);
    const result = await (apiCallPost(API_HOST + API.USER.PROFILE.CHANGE_PASSWORD, formData)) as IAxiosResponse;
    if (result && result.status == RESPONSES.SUCCESS) {
      Toast.success(result.message);
      dispatch({ type: actionTypes.TOKEN, payload: '' });
      setOldPassword('');
      setPassword('');
      setConfirmPassword('')
      navigate('/login');
    } else {
      Toast.error(result.message);
    }

  }

  return (
    <Layout headTitle="Profile">
      <Row>
        <Col lg={4}>
          <ProfileCard status={isProfileUpdated} />
        </Col>
        <Col lg={8}>
          <div className="commn-bg profile-detail">
            <h2 className="commn-title">
              Profile
              <span> Details</span>
            </h2>
            <Row>
              <Col lg={6}>
                <CustomInput
                  label="First Name"
                  type="text"
                  placeholder="Enter your first name"
                  value={firstName}
                  onChange={(e: any) => {
                    let value = e.target.value;
                    let verify = Validation.firstName(value);
                    if (value) {
                      if (verify) {
                        setFirstName(value);
                        setFirstNameError('');

                      } else {
                        setFirstName(value);
                        setFirstNameError("Enter valid first name");
                      }
                    } else {
                      setFirstName('');
                      setFirstNameError('');
                    }

                  }}
                  errorText={firstNameError}
                  maxLimit ={25}
                />

              </Col>
              <Col lg={6}>
                <CustomInput
                  label="Last Name"
                  type="text"
                  placeholder="Enter your last name"
                  value={lastName}
                  onChange={(e: any) => {
                    let value = e.target.value;
                    let verify = Validation.lastName(value);
                    if (value) {
                      if (verify) {
                        setLastName(value);
                        setLastNameError('');
                      } else {
                        setLastName(value);
                        setLastNameError("Enter valid last name");
                      }
                    } else {
                      setLastName('');
                      setLastNameError('');
                    }
                  }}
                  errorText={lastNameError}
                  maxLimit ={25}
                />

              </Col>

              <Col lg={6}>
                <CustomInput
                  label="Email"
                  type="email"
                  placeholder="Enter your email"
                  className="email_sec mb-0"
                  value={email}
                  readOnly={true}
                />
              </Col>
              {/* <Col lg={6}>
                <div onClick={handleShow}>
                  <CustomInput
                    label="Password"
                    type="password"
                    placeholder='eg"123@#232"'
                  />
                </div>
                <ChangePasswordModal show={show} handleClose={handleClose} />
              </Col> */}
              <Col lg={6} className="d-flex align-items-end">
                <ButtonCustom type="button" title="Update" className="btnGradient mb-3" onClick={(e: any) => updateUserProfile(e)} />
              </Col>

            </Row>
          </div>

        </Col>
      </Row>
      {/* <div className="commn-bg profile-detail"> */}
      <Row className=' mt-5'>
        <Col lg={6} md={8} xs={12}>
          <div className="commn-bg profile-detail">
            <h2 className="commn-title">
              Change
              <span> Password</span>
            </h2>

            <form>
              <div className="Password_Input">
                <CustomInput
                  label="Current Password"
                  // type="password"
                  type={eyeIconOldPwd == 'hide' ? "password" : 'text'}
                  placeholder="Enter current password"
                  value={oldPassword}
                  onChange={(e: any) => {
                    e.preventDefault();
                    let value = e.target.value;
                    if (value) {
                      setOldPassword(e.target.value);
                      setOldPasswordError('');
                    }
                  }}
                  errorText={oldPasswordError}
                  required
                />
                {eyeIconOldPwd == 'show' ? <img src={ShowIcon} alt="show-icon" onClick={() => setEyeIconOldPwd('hide')} width='20px' />
                  : <img src={HideIcon} onClick={() => setEyeIconOldPwd('show')} alt="hide-icon" width='20px' />}
              </div>
              <div className="Password_Input">
                <CustomInput
                  label="New Password"
                  // type="password"
                  type={eyeIcon == 'hide' ? "password" : 'text'}

                  placeholder="Enter new password"
                  value={password}
                  onChange={(e: any) => {
                    e.preventDefault()
                    let value = e.target.value;
                    let verify = Validation.password(value);

                    if (value) {
                      if (verify) {
                        setPassword(value);
                        setPasswordError('');
                      } else {
                        setPasswordError('Password should contains capital letter , number , special characters..');
                      }
                    } else {
                      setPasswordError('');
                    }
                  }}
                  required
                  errorText={passwordError}

                />
                {eyeIcon == 'show' ? <img src={ShowIcon} alt="show-icon" onClick={() => setEyeIcon('hide')} width='20px' />
                  : <img src={HideIcon} onClick={() => setEyeIcon('show')} alt="hide-icon" width='20px' />}
              </div>
              <div className="Password_Input">
                <CustomInput
                  label="Confirm Password"
                  // type="password"
                  type={eyeIconCnfrmPwd == 'hide' ? "password" : 'text'}
                  placeholder="Confirm new password"
                  value={confirmPassword}
                  onChange={(e: any) => {
                    let value = e.target.value;
                    if (value) {
                      setConfirmPassword(value);
                      handlerToConfirmPassword(e.target.value)
                    } else {
                      setConfirmPassword('');
                      setConfirmPasswordError('')
                    }
                  }}
                  required={true}
                  errorText={confirmPasswordError}

                />
                {eyeIconCnfrmPwd == 'show' ? <img src={ShowIcon} alt="show-icon" onClick={() => setEyeIconCnfrmPwd('hide')} width='20px' />
                  : <img src={HideIcon} onClick={() => setEyeIconCnfrmPwd('show')} alt="hide-icon" width='20px' />}
              </div>
              <ButtonCustom
                title="Change Password"
                className="btnGradient w-100"
                type="button"
                onClick={(e: any) => handlerToChangePassword(e)}
              // onClick={handleClose}
              />
            </form>
          </div>
        </Col>
      </Row>
      {/* </div> */}
    </Layout>
  );
};

export default Profile;

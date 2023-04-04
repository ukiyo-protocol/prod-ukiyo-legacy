import profileImg from "../../../assets/Images/profileImg.png";

import "./ProfileCard.scss";
import { useEffect, useState } from 'react';
import { apiCallGet } from "../../../services/axios";
import { API, API_HOST } from "../../../config/constants";
import { AxiosResponse } from "axios";
import { RESPONSES } from "../../../constants/response";


const ProfileCard = ({ status }: any) => {


  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');


  useEffect(() => {
    getUserProfile();
  }, [status]);



  const capitalizeFirstLetter = (value: string) => {
    return value.charAt(0).toUpperCase() + value.slice(1);
  }

  //get login user profile details
  const getUserProfile = async () => {
    const result = await (apiCallGet(API_HOST + API.USER.PROFILE.VIEW, {}, false, false)) as AxiosResponse;
    if (result && result.status == RESPONSES.SUCCESS) {
      let first = capitalizeFirstLetter(result.data.first_name);
      let last = capitalizeFirstLetter(result.data.last_name);
      setFirstName(first);
      setLastName(last);
      setEmail(result.data.email)
    }
  }
  return (
    <div className="commn-bg profile-card text-center mb-3 d-flex flex-column justify-content-center">
      <h2 className="commn-title">
        My <span>Profile</span>
      </h2>
      {/* <div className="text-center mb-30">
        <img src={profileImg} alt="profile-img" />
      </div> */}
      {/* <div className="d-flex flex-column justify-content-center"> */}
      <h4>{firstName} {lastName}</h4>
      <p>{email}</p>
      {/* </div> */}
    </div>
  );
};

export default ProfileCard;

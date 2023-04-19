import React, { useEffect, useLayoutEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../hooks/hooks";
import { IReduxUserDetails } from "../../interfaces/store";
import { disconnectWallet } from "../../redux/actions/connect.action";
import { CommonService } from "../../services/CommonService";
import ButtonCustom from "../common/Button/ButtonCustom";
import ConnectWallet from "../common/ConnectWallet/index";
import logo from "../../assets/Images/ukiyo-main.svg";
import logo_sign from "../../assets/Images/product-logo.png";
import settings from "../../assets/Images/settings.svg";
import user from "../../assets/Images/user.svg";
import Toast from "../common/Toast";
import DisconnectModal from "../common/DisconnectModal/DisconnectModal";
import { Container } from "react-bootstrap";
import "./AdminHeader.scss";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { API, API_HOST, KYC_STATUS } from "../../config/constants";
import { AxiosResponse } from "axios";
import { apiCallGet } from "../../services/axios";
import { RESPONSES } from "../../constants/response";
import CompleteKycModal from "../common/Modals/CompleteKycModal";

type props = {
  headTitle: string;
}
const AdminHeader = ({ headTitle }: props) => {

  const location = useLocation();
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const userDetails: IReduxUserDetails = useSelector((state: any) =>
    state.user.walletAddress ? state.user : false
  );

  const [show, setShow] = useState(false);

  const [view, setView] = useState(false);

  const [isKycVerified, setIsKycVerified] = useState('');

  const [isAdminLogin, setIsAdminLogin] = useState(true);

  const viewClose = () => setView(false);
  const viewShow = () => setView(true);

  const handleClose = () => setShow(false);
  const handleShow = () => { setShow(true) };


  const [showKycPopup, setShowKycPopup] = useState(false);

  const handleToCloseKycPopup = () => setShowKycPopup(false);
  const handleToShowKycPopup = () => setShowKycPopup(true);


  useEffect(() => {
    // if (!userDetails.isAdmin) {
    //   setIsAdminLogin(false)
    // }
    setShow(false);
  }, [userDetails?.walletAddress]);


  useLayoutEffect(() => {
    if (!userDetails.isAdmin) {
      getUserProfile();
    }


  }, []);

  //get login user profile details
  const getUserProfile = async () => {
    const result = await (apiCallGet(API_HOST + API.USER.PROFILE.VIEW, {}, false, false)) as AxiosResponse;
    if (result && result.status == RESPONSES.SUCCESS) {
      setIsKycVerified(result.data.is_kyc_verified);
    }
  }
  //handler to connect --> Unused function
  // const handlerToConnect = () => {
  //   if (Number(isKycVerified) == KYC_STATUS.APPROVED) {
  //     // handleToShowKycPopup()
  //     Toast.error("Please complete you KYC");
  //   } else {
  //     handleShow();

  //   }
  // }

  //Function to disconnect wallet
  const disconnectHandler = async () => {
    dispatch(disconnectWallet(userDetails?.wallet));
    Toast.success("Disconnected successfully");
    setView(false);
    navigate('/dashboard');
  };


  // console.log('userDetails::::>>>', userDetails)
  return (
    <>
      <div className="adminHeader" id="myadminHeader">
        <Container>
          {/* <div>
            <img src={logo_sign} alt="" />
          </div> */}
          <div className="adminHd_Wrap d-flex justify-content-between">
            <div className="d-flex align-items-center">
              <img src={logo_sign} alt="" className="prod_logo" />
              <h3 className="mb-0">{headTitle}</h3>
            </div>

            {/* show connect wallet button  */}
            {
              !userDetails?.isAdmin ? (
                <>
                  {!userDetails?.walletAddress ? (
                    <>

                      <ButtonCustom
                        title="Connect Wallet"
                        className="red-btn"
                        onClick={() => {
                          // handlerToConnect()
                          setIsAdminLogin(false)
                          handleShow();
                        }}
                      />

                    </>
                  ) : <ButtonCustom
                    title={`${CommonService.custmizeAddress(
                      userDetails?.walletAddress
                    )} Disconnect`}
                    className="red-btn"
                    onClick={(e: any) => setView(true)}

                  />}
                </>
              ) : (<>

                {location.pathname.includes('admin') ?
                  <div className="log_sec d-flex gap-2">
                    <div className="d-flex align-items-center gap-2">
                      <ButtonCustom
                        title={`${CommonService.custmizeAddress(userDetails.walletAddress)}`}
                        className="red-btn"

                      />
                      <Link to='/admin/settings'>
                        <span><img src={settings} alt="settings_img" /></span>
                        <p>Settings</p>
                      </Link>
                    </div>
                    <span><img src={user} alt="user_img" /></span>
                  </div>
                  :
                  null
                }

              </>)
            }

            <DisconnectModal
              show={view}
              viewShow={viewShow}
              viewClose={viewClose}
              callback={disconnectHandler}
            />
          </div>
          <ConnectWallet
            show={show}
            handleShow={handleShow}
            handleClose={handleClose}
            // isAdmin= {isAdminLogin}
            isAdmin={userDetails.isAdmin}

          />
        </Container>

      </div>
    </>
  );
};

export default AdminHeader;

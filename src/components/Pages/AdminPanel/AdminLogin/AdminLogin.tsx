import { Link, Outlet } from "react-router-dom";
import { Form } from "react-bootstrap";
import loginImg from "../../../../assets/Images/loginImg.svg";
import AuthLayout from "../../../Layout/AuthLayout";
import CustomInput from "../../../common/Input/CustomInputNew";
import ButtonCustom from "../../../common/ButtonNew/ButtonCustomNew";
import "./AdminLogin.scss";
import { SetStateAction, useEffect, useState } from "react";
import Toast from "../../../common/Toast";
import { actionGetUkiyoIcoOwner } from "../../../../redux/actions/admin.action";
import { useAppDispatch } from "../../../../hooks/hooks";
import { useSelector } from "react-redux";
import { IS_ADMIN } from "../../../../redux/actionTypes";
import { IReduxUserDetails } from "../../../../interfaces/store";
import { useNavigate } from "react-router-dom";
import { ADMIN_PATH } from "../../../../constants/messages";
import ConnectWallet from "../../../common/ConnectWallet";
import DisconnectModal from "../../../common/DisconnectModal/DisconnectModal";
import { disconnectWallet } from "../../../../redux/actions/connect.action";

const AdminLogin = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [show, setShow] = useState(false);
    const [disconnectView, setDisconnectView] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const disconnectViewClose = () => setDisconnectView(false);
    const disconnectViewShow = () => setDisconnectView(true);
    //details from redux
    const userDetails: IReduxUserDetails = useSelector((state: any) => (state.user.walletAddress) ? state.user : false);

    useEffect(() => {
        setShow(false);
    }, [userDetails?.walletAddress]);


    //Function to make ownership address login
    const loginHandler = async (e: MouseEvent) => {

        e.preventDefault();

        //owner address
        const ownerAddress = (await dispatch(
            actionGetUkiyoIcoOwner(userDetails?.wallet)
        )) as string;

        if (userDetails.walletAddress.toLowerCase() !== ownerAddress.toLowerCase()) {
            return Toast.error("Please connect with admin address.");
        } else {
            dispatch({ type: IS_ADMIN, payload: true });
            navigate(ADMIN_PATH.DASHBOARD);
        }

    }
    //Function to disconnect wallet
    const disconnectHandler = async () => {
        dispatch(disconnectWallet(userDetails?.wallet));
        Toast.success("Logout successfully");
        setDisconnectView(false);
        navigate(ADMIN_PATH.LOGIN);
    };
    return (
        <AuthLayout
            img={loginImg}
            title={
                <>
                    Log in to <span>ukiyo Admin</span>
                </>
            }
            text="Welcome back! Login with your details that you entered during
      registration"
        >
            <Form>
                {userDetails?.walletAddress ? <CustomInput
                    label=""
                    type="text"
                    placeholder=""
                    value={userDetails?.walletAddress}
                    // onChange={(e: { target: { value: SetStateAction<string>; }; }) => setInputValue(e.target.value)}
                    disabled={true}
                /> : null}

                {
                    !userDetails?.walletAddress ? (<>
                        <ButtonCustom onClick={() => {
                            handleShow();
                        }} className="btnGradient authBtn mt-1 mb-2" title="Connect" />
                    </>) : (<>
                        <ButtonCustom
                            className="btnGradient authBtn mt-1 mb-2"
                            title="Disconnect"
                            onClick={() => setDisconnectView(true)}
                        />
                    </>)
                }

                <ButtonCustom type="submit" onClick={(e: MouseEvent) => loginHandler(e)} className="btnGradient authBtn mt-1" title="Login" />
            </Form>

            <ConnectWallet
                show={show}
                handleShow={handleShow}
                handleClose={handleClose}
                // isAdmin={userDetails.isAdmin}
                isAdmin={true}

            />

            <DisconnectModal
                show={disconnectView}
                viewShow={disconnectViewShow}
                viewClose={disconnectViewClose}
                callback={disconnectHandler}
            />
        </AuthLayout>
    );
};

export default AdminLogin;

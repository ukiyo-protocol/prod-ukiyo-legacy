import { useEffect } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import logo from "../../../assets/Images/UKIYO-red.svg";
import { API, API_HOST } from "../../../config/constants";
import { IAxiosResponse } from '../../../interfaces/axios';
import { apiCallGet } from "../../../services/axios";
import Button from "../../common/Button/ButtonCustom";
import "./SuccessVerification.scss";

const SuccessVerification = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const query: any = new URLSearchParams(location.search);
    const id = query.get('v_id');

    useEffect(() => {
        if (id) {
            apiCallGet(`${API_HOST}${API.USER.AUTH_VERIFY_EMAIL}?v_id=${id}`, {}, false, false) as unknown as IAxiosResponse;
        }
    }, [id])

    return (
        <>

            <div className="success d-flex justify-content-center align-items-center">
                <div className="success_verification">
                    <span className="success_logo"><img src={logo} alt="" /></span>
                    <p>Thank you, your account has now been verified.</p>
                    <Button className="red-btn" title="Login" onClick={() => navigate('/login')} />
                </div>
            </div>
        </>
    );
};

export default SuccessVerification;
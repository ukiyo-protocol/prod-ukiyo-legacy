import { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { API, API_HOST } from "../../../../config/constants";
import { RESPONSES } from "../../../../constants/response";
import SumsubKyc from "../../../../lib/SumsubKyc";
import { apiCallGet } from "../../../../services/axios";
import ButtonCustom from "../../../common/ButtonNew/ButtonCustomNew";
import Layout from "../../../Layout/Layout";
import "./KycRecord.scss";
const KycRecord = () => {
  const token = useSelector((state: any) => state.user.token);

  const [showKycSdk, setShowKycSdk] = useState(false);
  const [accessToken, setAccessToken] = useState("");
  const [showCompleteKyc, setShowCompleteKyc] = useState(true);

  const handleShow = async () => {
    await accessTokenHandler();
    setShowKycSdk(true);
    setShowCompleteKyc(false);
  };
  const handleClose = () => {
    setShowKycSdk(false);
  };

  useEffect(() => {
    handleShow();
  }, []);

  const accessTokenHandler = async () => {
    const result = (await apiCallGet(
      API_HOST + API.SUMSUB.ACCESS_TOKEN,
      {},
      false,
      false
    )) as AxiosResponse;
    if (result && result.status == RESPONSES.SUCCESS) {
      setAccessToken(result.data.token);
    }
  };

  return (
    <>
      {" "}
      <Layout
        headTitle="Know Your Customer Identification"
        className="d-flex justify-content-center align-items-center"
      >
        {/* {showCompleteKyc ? (
          <div className="commn-bg verification-card text-center">
            <h4 className="mb-30">Verification</h4>
            <p>Click below to start your KYC process</p>
            <ButtonCustom
              title="Complete KYC"
              className="btnGradient w-100"
              onClick={handleShow}
            />
          </div>
        ) : null} */}
        {/* {showKycSdk ? (
          <SumsubKyc show={true} token={accessToken} callback={handleClose} />
        ) : null} */}
        {accessToken ? (
          <SumsubKyc show={true} token={accessToken} callback={handleClose} />
        ) : null}
      </Layout>
    </>
  );
};

export default KycRecord;

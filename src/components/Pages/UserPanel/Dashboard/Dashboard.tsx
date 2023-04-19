import { AxiosResponse } from "axios";
import { useEffect, useLayoutEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { set } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import web3 from "web3";
import kxo from "../../../../assets/Images/kxo_logo.png";
import cashIcon from "../../../../assets/Images/cashIcon.svg";
import downIcon from "../../../../assets/Images/downIcon.svg";
import walletIcon from "../../../../assets/Images/walletIcon.svg";
import {
  ALLOWED_CURRENCY_TYPES,
  API,
  API_HOST,
  CONTRACT,
  CURRENCY_TYPE,
  ETH_DECIMALS,
  KYC_STATUS,
  USD_DECIMALS,
  USD_DECIMALS_FOR_MIN_PRICE,
  USD_DECIMALS_FOR_PRICE
} from "../../../../config/constants";
import { RESPONSES } from "../../../../constants/response";
import { Validation } from "../../../../helpers/validation.helper";
import { useAppDispatch } from "../../../../hooks/hooks";
import { IAxiosResponse } from "../../../../interfaces/axios";
import { CRPTO_TS } from "../../../../lib/crypto";
import {
  actionToBuyTokens,
  actionToCalculate,
  actionToGetAllowance,
  actionToGetBalance,
  actionToGetTokenPrice,
  actionToGetUkiyoTokenDetails,
  actionToGetUsdtTokenDetails,
  actionToSetAppoval
} from "../../../../redux/actions/user.action";
import { apiCallGet, apiCallPost } from "../../../../services/axios";
import { CommonService } from "../../../../services/CommonService";
import ButtonCustom from "../../../common/ButtonNew/ButtonCustomNew";
import CompleteKycModal from "../../../common/Modals/CompleteKycModal";
import ProfileCard from "../../../common/ProfileCard/ProfileCard";
import Toast from "../../../common/Toast";
import InfoCard from "../../../InfoCard/InfoCard";
import Layout from "../../../Layout/Layout";
import "./Dashboard.scss";
import { setLoader } from "../../../../redux/actions/loader.action";
import async from "async";
import { actionToGetMinimumPriceToBuy } from "../../../../redux/actions/admin.action";
import Web3 from "web3";
const options = [
  { value: "2", label: "USDT" },
  { value: "1", label: "ETH" }
];

const Dashboard = () => {
  let navigate = useNavigate();
  let dispatch = useAppDispatch();
  let userDetails = useSelector((state: any) => state?.user);
  const ukiyoToken = useSelector(
    (state: any) => state?.user?.ukiyoTokenDetails
  );
  const usdtToken = useSelector((state: any) => state?.user?.usdtTokenDetails);

  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    navigate("/kyc-record");
  };
  const handleShow = () => setShow(true);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [isKycVerified, setIsKycVerified] = useState(0);

  const [currencyType, setCurrencyType] = useState("1");
  const [usdtTokenDetails, setUsdtTokenDetails] = useState() as any;
  const [ukiyoTokenDetails, setUkiyoTokenDetails] = useState() as any;

  const [ethBalance, setEthBalance] = useState("");
  const [amount, setAmount] = useState<number | null>(null);

  const [calculatedTokens, setCalculatedTokens] = useState(0);
  const [totalTokenSold, setTotalTokenSold] = useState() as any;
  const [isBuyDisable, setIsBuyDisable] = useState(true);

  const [viewTokenPrice, setViewTokenPrice] = useState(0);
  const [minPriceInUsd, setMinPriceInUsd] = useState(0)

  const [calculatedAmountInUsd, setCalulatedAmountInUsd] = useState();


  useLayoutEffect(() => {
    getUserProfile();
    getTokenDetailsHandler();
  }, []);

  useEffect(() => {
    if (!userDetails?.isAdmin) {
      onInit();
      totalTokenSoldHandler();
      getTokenDetailsHandler();
      viewTokenPriceHandler();
      if (userDetails && userDetails.walletAddress) {
        getUserBalance();
      }
    }
  }, [currencyType, userDetails.walletAddress]);


  //function used on reload
  const onInit = async () => {
    try {
      await async.parallel({
        icoStatus: async function () {
          const minPrice = await dispatch(
            actionToGetMinimumPriceToBuy(userDetails.wallet)
          );
          if (minPrice) {
            setMinPriceInUsd(minPrice);
          }
        }
      });


    } catch (err) {
      dispatch(setLoader(false));
      console.log("Error under init", err);
    }
  };




  //Hook based for currency type
  useEffect(() => {
    if (amount! > 0 && Number(currencyType) === ALLOWED_CURRENCY_TYPES.USDT) {
      const valueCount = Validation.decimalCountCheck(amount as number);
      if (valueCount > 6) {
        setAmount(0);
      }
    }
    calculateTokensHandler();
  }, [currencyType]);

  //Hook for calulate the token amount to be received with basic debounce
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      calculateTokensHandler();
    }, 300);
    return () => clearTimeout(delayDebounceFn);
  }, [amount]);

  //get total token sold
  const totalTokenSoldHandler = async () => {
    let result: any = (await apiCallGet(
      API_HOST + API.USER.STATS,
      {},
      false,
      false
    )) as AxiosResponse;
    if (result && result.status === RESPONSES.SUCCESS) {
      setTotalTokenSold(result?.data[0]);
    }
  };

  //get login user profile details
  // const getUserProfile = async () => {
  //   const result = (await apiCallGet(
  //     API_HOST + API.USER.PROFILE.VIEW,
  //     {},
  //     false,
  //     false
  //   )) as AxiosResponse;
  //   if (result && result.status === RESPONSES.SUCCESS) {
  //     setFirstName(result.data.first_name);
  //     setLastName(result.data.last_name);
  //     setEmail(result.data.email);
  //     setIsKycVerified(result.data.is_kyc_verified);
  //   }
  // };

  // function to get user balance according to currency type and usdt token details
  const getUserBalance = async () => {
    let balance = await dispatch(
      actionToGetBalance(
        userDetails.wallet,
        userDetails.walletAddress,
        currencyType
      )
    );
    if (balance) {
      setEthBalance(balance);
    }
  };

  const getTokenDetailsHandler = async () => {
    let usdtTokenDetails = await dispatch(
      actionToGetUsdtTokenDetails(
        userDetails.wallet,
        userDetails?.walletAddress
      )
    );

    if (usdtTokenDetails && usdtTokenDetails != undefined) {
      setUsdtTokenDetails(usdtTokenDetails);
    }

    let ukiyoTokenDetails = await dispatch(
      actionToGetUkiyoTokenDetails(userDetails.wallet)
    );
    if (ukiyoTokenDetails && ukiyoTokenDetails != undefined) {
      setUkiyoTokenDetails(ukiyoTokenDetails);
    }
  };

  //function to get calculated tokens based on different currency types
  const calculateTokensHandler = async () => {
    // console.log('amount :>> ', amount, currencyType);
    if (amount !== null && Number(amount)) {
      let _amount;

      if (Number(currencyType) === ALLOWED_CURRENCY_TYPES.ETH) {
        _amount = CommonService.convertWithDecimal(amount, ETH_DECIMALS);
      } else {
        _amount = CommonService.convertWithDecimal(
          amount,
          usdtToken?.tokenDecimals
        );
      }
      // console.log('_amount', _amount)

      let payload = {
        type: Number(currencyType),
        amount: _amount
      };
      let token: any = await dispatch(
        actionToCalculate(userDetails.wallet, payload)
      );
      if (token) {
        let totalToken = token?._totalTokens / ukiyoToken?.tokenDecimals;

        setCalculatedTokens(totalToken);
        setCalulatedAmountInUsd(token?._amountUsd)
        setIsBuyDisable(false);
      }
    } else {
      setCalculatedTokens(0);
      setIsBuyDisable(true);
    }
  };

  //function to show balance based on currency type like(eth and usdt)
  const viewBalance = () => {
    if (Number(currencyType) === ALLOWED_CURRENCY_TYPES.ETH) {
      if (Number(ethBalance) > 0) {
        return `${(Number(ethBalance!) / ETH_DECIMALS).toFixed(5)} ${CURRENCY_TYPE.ETH
          }`;
      } else {
        return ` 0 ${CURRENCY_TYPE.ETH}`;
      }
    } else {
      if (usdtToken && usdtToken != undefined && usdtToken.tokenBalance > 0) {
        return `${(usdtToken.tokenBalance / usdtToken.tokenDecimals).toFixed(
          5
        )}  ${CURRENCY_TYPE.USDT}`;
      } else {
        return ` 0 ${CURRENCY_TYPE.USDT}`;
      }
    }
  };
  // function to get token price in usd
  const viewTokenPriceHandler = async () => {
    let price = await dispatch(actionToGetTokenPrice(userDetails.wallet));
    if (price && price != undefined) {
      setViewTokenPrice(price / USD_DECIMALS_FOR_PRICE);
    }
  };

  //onChangeHandler

  const onChangeHandler = (e: any) => {
    e.preventDefault();
    let value = e.target.value;
    if (Number(value) && Number(value) > 0) {
      const isCurrencyETH = (Number(currencyType) === ALLOWED_CURRENCY_TYPES.ETH) ? true : false;
      let validate = Validation.shouldBeNumberValidation(value, isCurrencyETH);
      if (validate === true) {
        setAmount(value);
      }
    } else {
      setAmount(null);
    }
    // else {
    //   setAmount(0);
    // }
  };

  //createVoucher

  const createVoucher = async (_amount: any) => {
    let payload = {
      type: currencyType,
      amount: _amount,
      to_address: userDetails.walletAddress
    };
    let result = (await apiCallPost(
      API_HOST + API.USER.VOUCHER.CREATE,
      payload
    )) as IAxiosResponse;
    if (result && result.status === RESPONSES.SUCCESS) {
      let decrypt = await CRPTO_TS.decryptHandler(result.data);
      return decrypt;
    } else {
      Toast.error(result.message);
    }
  };
  //handler to but tokens via usdt or eth currency

  const handlerToBuyTokens = async (e: any) => {
    e.preventDefault();
    // await getUserProfile();

    if (!userDetails.walletAddress) {
      return Toast.error("Please connect with wallet");
    }
    // if (isKycVerified !== KYC_STATUS.APPROVED) {
    //   return handleShow();
    // }

    if (amount! < 0 || amount === null) {
      return Toast.error("Please enter a valid a amout to buy");
    }

    if (currencyType === undefined) {
      return Toast.error("Please choose a currency");
    }

    if (Number(calculatedAmountInUsd) < minPriceInUsd) {
      return Toast.error(`Amount should be greater than $${minPriceInUsd / USD_DECIMALS_FOR_MIN_PRICE}`)
    }

    let _amount;
    if (Number(currencyType) === ALLOWED_CURRENCY_TYPES.ETH) {
      _amount = CommonService.convertWithDecimal(amount, ETH_DECIMALS);
    } else {
      _amount = CommonService.convertWithDecimal(
        amount,
        usdtToken?.tokenDecimals
      );
    }
    // create voucher
    // const voucher = await createVoucher(_amount);

    if (Number(currencyType) === ALLOWED_CURRENCY_TYPES.USDT) {
      let allowance;
      allowance = await dispatch(
        actionToGetAllowance(
          userDetails.wallet,
          userDetails.walletAddress,
          CONTRACT.UKIYO_ICO_ADDRESS!
        )
      );
      //  console.log("allowance", allowance)
      if (Number(allowance) <= 0) {
        await dispatch(
          actionToSetAppoval(
            userDetails.wallet,
            userDetails.walletAddress,
            CONTRACT.UKIYO_ICO_ADDRESS!
          )
        );

        // console.log('CONTRACT.UKIYO_ICO_ADDRESS!', CONTRACT.UKIYO_ICO_ADDRESS!)
      }
      if (
        Number(usdtToken.tokenBalance) <= 0 ||
        Number(usdtToken.tokenBalance) <= Number(_amount)
      ) {
        return Toast.error("Insufficient Balance");
      }
      let payload: any = {
        amount: _amount,//voucher.amount,
        type: Number(currencyType),//voucher.type,
        walletAddress: userDetails.walletAddress,//voucher.to_address,
        // signature: voucher.sign,
        email: web3.utils.toHex(email)
      };

      let buy: any = await dispatch(
        actionToBuyTokens(userDetails.wallet, payload)
      );

      if (buy && buy.status) {
        Toast.success("Token bought successfully.");
        window.location.reload();
      }

      setAmount(null);
    } else {

      if (
        Number(ethBalance) <= 0 ||
        Number(ethBalance) <= Number(_amount)
      ) {
        return Toast.error("Insufficient Balance");
      }

      let payload: any = {
        amount: _amount,//voucher.amount,
        type: Number(currencyType),//voucher.type,
        walletAddress: userDetails.walletAddress,//voucher.to_address,
        // signature: voucher.sign,
        email: web3.utils.toHex(email)
      };
      // console.log('payload', payload)
      let buy: any = await dispatch(
        actionToBuyTokens(userDetails.wallet, payload)
      );
      if (buy && buy.status) {
        Toast.success("Token bought successfully.");
        window.location.reload();
        setAmount(null);
      }
    }

    setAmount(0);
  };

  //handler to show total token sold
  const viewTotalTokenSold = () => {
    if (totalTokenSold != undefined && ukiyoTokenDetails != undefined) {
      if (
        Number(totalTokenSold?.total_purchased_tokens) &&
        Number(totalTokenSold?.total_purchased_tokens) > 0 &&
        Number(totalTokenSold?.total_purchased_tokens) !== undefined
      ) {
        return `${totalTokenSold?.total_purchased_tokens /
          ukiyoTokenDetails?.tokenDecimals
          } ${ukiyoTokenDetails?.tokenSymbol}`;
      } else {
        return `0 ${ukiyoTokenDetails?.tokenSymbol}`;
      }
    } else {
      return 0;
    }
  };

  //handler to get total amount raised in usd
  const viewTotalAmountRaisedInUsd = () => {
    if (
      Number(totalTokenSold?.total_amount_usd) &&
      Number(totalTokenSold?.total_amount_usd) > 0 &&
      Number(totalTokenSold?.total_amount_usd) != undefined
    ) {
      return `$ ${(totalTokenSold?.total_amount_usd / USD_DECIMALS).toFixed(
        5
      )}`;
    } else {
      return `$ 0`;
    }
  };

  // console.log("calculated tokens" , calculatedTokens)
  return (
    <Layout className="dashboardPage" headTitle="Dashboard">
      <Row>
        <Col xl={4} lg={6} className="mb-4 mb-xl-0">
          <ProfileCard status={true} />
        </Col>
        <Col xl={4} lg={6} className="mb-4 mb-xl-0">
          <InfoCard
            icon={cashIcon}
            title="Total KXO Purchased"
            content={viewTotalTokenSold()}
            className="dashboardPage__firstCard"
          />
          <InfoCard
            icon={walletIcon}
            // title="Total Expenditure"
            title="Total Value (USD)"
            content={viewTotalAmountRaisedInUsd()}
          />
        </Col>
        <Col xl={4} lg={12}>
          <div className="buy-form commn-bg">
            <form>
              <span>
                <img src={kxo} alt="kxo-img" />
                <h5>Buy KXO</h5>
              </span>
              <div className="inputStyle">
                <label className="form-label">You will pay</label>
                <div className="inputStyle__wrap">
                  <input
                    className="form-control"
                    type="number"
                    // value={amount! || ''}
                    value={amount!}
                    placeholder="Enter amount"
                    onChange={(e: any) => onChangeHandler(e)}
                  />
                  <div className="inputStyle__other">
                    <Select
                      options={options}
                      //isSearchable={false}
                      defaultValue={options[0]}
                      className="react-select-custom"
                      classNamePrefix="react-select"
                      onChange={(e: any) => {
                        setCurrencyType(e.value);
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="d-flex align-items-center justify-content-between">
                {/* {userDetails.walletAddress ? <p className="bal-text">
                  Price <strong>${viewTokenPrice}</strong>
                </p> : null} */}
                <p className="bal-text">
                  Price <strong>${viewTokenPrice}</strong>
                </p>

                {userDetails.walletAddress ? (
                  <p className="text-end bal-text">
                    Balance <strong>{viewBalance()}</strong>
                  </p>
                ) : null}
              </div>

              <div className="mt-4 d-flex align-items-center justify-content-between">
                <p className="bal-text">
                  Minimum Price <strong>${minPriceInUsd / USD_DECIMALS_FOR_MIN_PRICE}</strong>
                </p>

              </div>

              <div className="text-center mt-3 mb-4">
                <img src={downIcon} alt="down-icon" />
              </div>
              <div className="inputStyle">
                <label className="form-label">You will receive</label>
                <div className="inputStyle__wrap rec">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Enter amount"
                    value={calculatedTokens!}
                    readOnly
                  />
                  <div className="inputStyle__other">
                    <p className="d-flex align-items-center gap-3">
                      {ukiyoTokenDetails && ukiyoTokenDetails !== undefined
                        ? ukiyoTokenDetails.tokenSymbol
                        : null}
                      <img src={kxo} alt="kxo-img" />
                    </p>
                  </div>
                </div>
              </div>
              <ButtonCustom
                type="button"
                title="Buy"
                className="btnGradient w-100"
                //  onClick={handleShow}
                onClick={handlerToBuyTokens}
                disabled={isBuyDisable}
              />
              <CompleteKycModal show={show} handleClose={handleClose} />
            </form>
          </div>
        </Col>
      </Row>
    </Layout>
  );
};

export default Dashboard;

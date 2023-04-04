import { Col, Container, Row } from "react-bootstrap";
import "./AdminSetting.scss";
import Layout from "../../../Layout/Layout";
import ButtonCustom from "../../../common/Button/ButtonCustom";
import IcoIcon from "../../../../assets/Images/ico.svg";
import InputCustom from "../../../common/Inputs/InputCustom";
import CustomInput from "../../../common/Input/CustomInputNew";
import { ChangeEvent, SetStateAction, useEffect, useState } from "react";
import ConfirmModal from "../../../common/ConfirmModal/ConfirmModal";
import CustomTable from "../../../Table/CustomTable";
import { useAppDispatch } from "../../../../hooks/hooks";
import {
  actionGetReceiverAddress,
  actionGetUkiyoIcoOwner,
  actionToEnableOrDisableIco,
  actionToGetIcoStatus,
  actionToGetMinimumPriceToBuy,
  actionToSetMinimumPriceToBuy,
  toUpdateOwnerAddress,
  toUpdateReceiverAddress
} from "../../../../redux/actions/admin.action";
import { useSelector } from "react-redux";
import { IContractSendTxnConfirmResponse } from "../../../../interfaces/common";
import { IReduxUserDetails } from "../../../../interfaces/store";
import Toast from "../../../common/Toast";
import * as async from "async";
import {
  IAdminMinimumPricePayload,
  ICallBackResponse,
  IUpdateOwnershipAddress,
  IUpdateReceiverAddress
} from "../../../../interfaces/admin";
import { formValidtion, receiverFormValidtion } from "./AdminSettingValidation";
import { SETTING_TRIGGER, USD_DECIMALS_FOR_MIN_PRICE } from "../../../../config/constants";
import {
  IS_ADMIN,
  WALLET,
  WALLET_ADDRESS
} from "../../../../redux/actionTypes";
import { setLoader } from "../../../../redux/actions/loader.action";
// import { setLoader } from '../../../../redux/actions/loader.action';
import { useNavigate } from "react-router-dom";
import { CommonService } from "../../../../services/CommonService";

const AdminSetting = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [IcoStatus, setIcoStatus] = useState("");
  const [currentOwnerAddress, setCurrentOwnerAddress] = useState("");
  const [currentReceiverAddress, setCurrentReceiverAddress] = useState("");

  const [ownerAddressInputValues, setOwnerAddressInputValue] =
    useState<IUpdateOwnershipAddress>({
      newOwnerAddress: "",
      confirmNewOwnerAddress: ""
    });
  const [receiverAddressInputValues, setReceiverAddressInputValue] =
    useState<IUpdateReceiverAddress>({
      newReceiverAddress: "",
      confirmNewReceiverAddress: ""
    });
  const [errors, setErrors] = useState<any>();
  const [modelData, setModalData] = useState<any>({ trigger: "", address: "" });

  const [minimumPrice, setMinimumPrice] = useState();

  //modal close handler
  const handleClose = () => {
    setShow(false);
    setErrors("");
    setOwnerAddressInputValue({
      newOwnerAddress: "",
      confirmNewOwnerAddress: ""
    });
    setReceiverAddressInputValue({
      newReceiverAddress: "",
      confirmNewReceiverAddress: ""
    });
    setModalData({ trigger: "", address: "" });
    onInit();
  };
  const handleShow = () => setShow(true);
  //Details from redux
  const userDetails: IReduxUserDetails = useSelector((state: any) =>
    state.user.walletAddress ? state.user : false
  );

  useEffect(() => {
    onInit();
    return () => {};
  }, []);

  //function to handle ownership address update
  const handleUpdateOwnershipChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;
    setErrors("");
    setOwnerAddressInputValue({ ...ownerAddressInputValues, [name]: value });
  };

  //function to handle receiver address update
  const handleReceiverUpdateOnChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;
    setErrors("");
    setReceiverAddressInputValue({
      ...receiverAddressInputValues,
      [name]: value
    });
  };

  //function used on reload
  const onInit = async () => {
    try {
      //console.log('userDetails', userDetails)
      //dispatch(setLoader(true));
      //TODO will refrector the code with interface
      await async.parallel({
        icoStatus: async function () {
          const status = await dispatch(
            actionToGetIcoStatus(userDetails.wallet)
          );
          //  console.log("(((" , status)
          if (status) {
            //  setIcoStatus(status!);
            setIcoStatus(status);
          }
        },
        currentOwner: async function () {
          const ownerNow = await dispatch(
            actionGetUkiyoIcoOwner(userDetails.wallet)
          );
          if (ownerNow) {
            setCurrentOwnerAddress(ownerNow);
          }
        },
        receiverAddress: async function () {
          const receiver = await dispatch(
            actionGetReceiverAddress(userDetails.wallet)
          );
          if (receiver) {
            setCurrentReceiverAddress(receiver);
          }
        },

        minimumPrice: async function () {
          const minimumPrice = (await dispatch(
            actionToGetMinimumPriceToBuy(userDetails.wallet)
          ))as any;
          if (minimumPrice) {
              let res:any =  minimumPrice/ USD_DECIMALS_FOR_MIN_PRICE;// 10**8 as usd decimals
            setMinimumPrice(res);  
          }
        }
      });

      //  console.log(results);
      // if (results) {
      //     dispatch(setLoader(false));
      //     // if (results.icoStatus) {
      //     //     setIcoStatus(results.icoStatus)
      //     // }
      //     if (results.currentOwner) {
      //         setCurrentOwnerAddress(results.currentOwner)
      //     }
      //     if (results.receiverAddress) {
      //         setCurrentReceiverAddress(results.receiverAddress)
      //     }
      // }
    } catch (err) {
      dispatch(setLoader(false));
      console.log("Error under init", err);
    }
  };

  //Handler to enable or disable ico
  const icoHandler = async (event: MouseEvent) => {
    event.preventDefault();
    const result = (await dispatch(
      actionToEnableOrDisableIco(
        userDetails?.wallet,
        userDetails?.walletAddress
      )
    )) as IContractSendTxnConfirmResponse;
    //if status is true
    if (result.status) {
      Toast.success("ICO status updated successfully");
      onInit();
    }
  };
  //Owner address update confirm modal handler
  const confirmOwnershipAddressUpdate = async (event: MouseEvent) => {
    event.preventDefault();
    if (currentOwnerAddress === ownerAddressInputValues.newOwnerAddress) {
      handleClose();
      return Toast.error("Enter a new address to transfer ownership");
    }
    const validate = await formValidtion(ownerAddressInputValues, setErrors);
    if (validate) {
      handleShow();
      setModalData({
        trigger: SETTING_TRIGGER.OWNERSHIP,
        address: ownerAddressInputValues.newOwnerAddress
      });
    }
  };

  //Receiver address update confirm modal handler
  const confirmReceiverAddressUpdate = async (event: MouseEvent) => {
    event.preventDefault();
    if (
      currentReceiverAddress === receiverAddressInputValues.newReceiverAddress
    ) {
      handleClose();
      return Toast.error("Enter a new address to update receiver");
    }
    const validate = await receiverFormValidtion(
      receiverAddressInputValues,
      setErrors
    );
    if (validate) {
      handleShow();
      setModalData({
        trigger: SETTING_TRIGGER.RECEIVER,
        address: receiverAddressInputValues.newReceiverAddress
      });
    }
  };

  //Confirm modal callback handler trigerred on yes
  const callbackHandler = async (data: ICallBackResponse) => {
    const { trigger, address } = data;
    //Ownership update
    if (trigger === SETTING_TRIGGER.OWNERSHIP) {
      const result = await dispatch(
        toUpdateOwnerAddress(userDetails.wallet, {
          addressToUpdate: address,
          walletAddress: userDetails.walletAddress
        })
      );
      if (result && result.status === true) {
        Toast.success("Owner address updated successfully");
        dispatch({ type: WALLET, payload: "" });
        dispatch({ type: WALLET_ADDRESS, payload: "" });
        dispatch({ type: IS_ADMIN, payload: false });
        navigate("/admin/login");
      }
    }

    if (trigger === SETTING_TRIGGER.RECEIVER) {
      //receiver update
      const result = await dispatch(
        toUpdateReceiverAddress(userDetails.wallet, {
          addressToUpdate: address,
          walletAddress: userDetails.walletAddress
        })
      );
      if (result && result.status === true)
        Toast.success("Receiver address updated successfully");

      setReceiverAddressInputValue({ ...receiverAddressInputValues });
    }
    // onInit();
    handleClose();
  };



//handler to update minimum price (InUsd) to buy token
    const handlerToUpdateMinimumPrice =async(event :MouseEvent)=>{
      event.preventDefault();

      let _minPrice = CommonService.convertWithDecimal(minimumPrice , USD_DECIMALS_FOR_MIN_PRICE)
     const previousMinPrice = (await dispatch(
      actionToGetMinimumPriceToBuy(userDetails.wallet)
    ))as any;
    if (previousMinPrice) {
       if(Number(_minPrice) === Number(previousMinPrice)){
         return Toast.error("Please enter different value to set minimum price")
       }
    }
    const data ={} as IAdminMinimumPricePayload;
    data.walletAddress = userDetails.walletAddress;
    data.amountInUsd = _minPrice;

     const result =  await dispatch(actionToSetMinimumPriceToBuy(userDetails.wallet ,data));
     if(result && result.status){
      Toast.success ("Minimum price updated successfully");
      onInit();
     }
    }
  return (
    <>
      <Layout>
        <section className="admin_setting">
          <Container>
            <Row>
              <Col lg={12}>
                <div className="admin_setting_content">
                  <h3>
                    Admin <span>Settings</span>
                  </h3>
                  <div className="admin_setting_ico">
                    <div className="admin_setting_ico_detail">
                      <span>
                        <img src={IcoIcon} alt="icon" />
                      </span>
                      <div>
                        <h4>ICO</h4>
                        <p>ICO Enable/Disable</p>
                      </div>
                    </div>
                    <span>
                      {IcoStatus ? (
                        <>
                          <ButtonCustom
                            onClick={(event: MouseEvent) => icoHandler(event)}
                            className="red-btn"
                            title="Disable"
                          />
                        </>
                      ) : (
                        <>
                          <ButtonCustom
                            onClick={(event: MouseEvent) => icoHandler(event)}
                            className="enable_btn"
                            title="Enable"
                          />
                        </>
                      )}
                    </span>
                  </div>
                  <div className="owner-wrapper">
                    <Row>
                      <Col lg={6}>
                        <CustomInput
                          className="current_ownership_sec"
                          label="Current Ownership Address"
                          value={currentOwnerAddress}
                          placeholder="Current owner"
                          disabled={true}
                        />
                      </Col>
                      <Col lg={6}>
                        <CustomInput
                          name="newOwnerAddress"
                          value={ownerAddressInputValues.newOwnerAddress}
                          onChange={(event: ChangeEvent<HTMLInputElement>) =>
                            handleUpdateOwnershipChange(event)
                          }
                          label="New Ownership Address"
                          placeholder="Enter new owner address"
                        />
                        {errors && errors["newOwnerErr"] && (
                          <>
                            <p className="text-danger">
                              {" "}
                              {errors["newOwnerErr"]}{" "}
                            </p>
                          </>
                        )}
                      </Col>
                    </Row>
                    <Row>
                      <Col lg={6}>
                        <CustomInput
                          value={ownerAddressInputValues.confirmNewOwnerAddress}
                          name="confirmNewOwnerAddress"
                          onChange={(event: ChangeEvent<HTMLInputElement>) =>
                            handleUpdateOwnershipChange(event)
                          }
                          label="Confirm New Ownership Address"
                          placeholder="Confirm new owner address"
                        />
                        {errors && errors["confOwnerErr"] && (
                          <>
                            <p className="text-danger">
                              {" "}
                              {errors["confOwnerErr"]}{" "}
                            </p>
                          </>
                        )}
                      </Col>
                      {/* {
                                                errors && errors['mismatchErr'] && (<>
                                                    <p className="text-danger"> {errors['mismatchErr']} </p>
                                                </>)
                                            } */}
                    </Row>
                    <ButtonCustom
                      className="mt-5 red-btn confirm"
                      title="Update Ownership"
                      onClick={(event: MouseEvent) =>
                        confirmOwnershipAddressUpdate(event)
                      }
                    />
                  </div>

                  <div className="receiver-wrapper pt-5">
                    <Row>
                      <Col lg={6}>
                        <CustomInput
                          className="current_ownership_sec"
                          label="Current Receiver Address"
                          value={currentReceiverAddress}
                          placeholder="Current receiver"
                          disabled={true}
                        />
                      </Col>
                      <Col lg={6}>
                        <CustomInput
                          name="newReceiverAddress"
                          label="New Receiver Address"
                          value={receiverAddressInputValues.newReceiverAddress}
                          onChange={(event: ChangeEvent<HTMLInputElement>) =>
                            handleReceiverUpdateOnChange(event)
                          }
                          placeholder="Enter new receiver address"
                        />
                        {errors && errors["newReceiverErr"] && (
                          <>
                            <p className="text-danger">
                              {" "}
                              {errors["newReceiverErr"]}{" "}
                            </p>
                          </>
                        )}
                      </Col>
                    </Row>
                    <Row>
                      <Col lg={6}>
                        <CustomInput
                          name="confirmNewReceiverAddress"
                          label="Confirm New Receiver Address"
                          value={
                            receiverAddressInputValues.confirmNewReceiverAddress
                          }
                          onChange={(event: ChangeEvent<HTMLInputElement>) =>
                            handleReceiverUpdateOnChange(event)
                          }
                          placeholder="Confirm new receiver address"
                        />
                        {errors && errors["confReceiverErr"] && (
                          <>
                            <p className="text-danger">
                              {" "}
                              {errors["confReceiverErr"]}{" "}
                            </p>
                          </>
                        )}
                      </Col>
                    </Row>
                    <ButtonCustom
                      className="mt-5 red-btn confirm"
                      title="Update Receiver"
                      onClick={(event: MouseEvent) =>
                        confirmReceiverAddressUpdate(event)
                      }
                    />
                  </div>

                  <div className="receiver-wrapper mt-5 minimum_price">
                    <Row className='align-items-end'>
                      <Col lg={6}>
                        <CustomInput
                          type="number"
                          className="current_ownership_sec"
                          label="Set minimum price(In Usd)"
                          value={minimumPrice}
                          placeholder="Minimum price"
                          onChange={(event: any) =>
                            setMinimumPrice(event.target.value)
                          }
                        />
                      </Col>
                      <Col lg={6}>
                        <ButtonCustom
                        type ="button"
                          className="ms-auto d-block red-btn "
                          title="Update Price"
                          onClick={(event: MouseEvent) =>
                            handlerToUpdateMinimumPrice(event)
                          }
                        />
                      </Col>
                    </Row>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </section>

        <ConfirmModal
          show={show}
          handleShow={handleShow}
          handleClose={handleClose}
          callback={callbackHandler}
          data={modelData}
        />
      </Layout>
    </>
  );
};

export default AdminSetting;

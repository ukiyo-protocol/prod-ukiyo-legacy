import { useState } from "react";
import {
  Col, Container,
  Form, Modal, Row
} from "react-bootstrap";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../../hooks/hooks";
import { IUsdtDetails } from "../../../interfaces/common";
// import { IMetaEastTokenDetails } from "../../../interfaces/user";
import ButtonCustom from "../Button/ButtonCustom";
import InputCustom from "../Inputs/InputCustom";
import "./BuyTokenModal.scss";


const BuyTokenModal = ({ show, handleClose, buyModelReset, mainOnInit }: any) => {
  const dispatch = useAppDispatch();
  const userDetails = useSelector((state: any) => (state.user.walletAddress) ? state.user : false);
  //Block for states

  const [userBalance, setUserBalance] = useState("");
  const [calculatedTokens, setCalculatedTokens] = useState("");
  const [amount, setAmount] = useState<any>("");
  const [selectedCurrencyType, setSelectedCurrencyType] = useState<number>(0)
  const [amountError, setAmountError] = useState("");
  const [usdtTokenDetails, setUsdtTokenDetails] = useState<Partial<IUsdtDetails>>({});
  const [inputMaxLength, setInputMaxLength] = useState<number>(18);
  const [isBuyButtonDisabled, setIsBuyButtonDisabled] = useState<boolean>(false);

  return (
    <Modal
      scrollable={true}
      className="connect_wallet buy_token"
      show={show}
      onHide={handleClose}
      centered
      backdrop="static"
    >
      <Modal.Header closeButton>
        <Modal.Title>Buy Token</Modal.Title>
      </Modal.Header>
      <Modal.Body className="p-5">
        <Container>
          <Form>
            <Row>
              <Col xs={12} md={12}>
                <h6 className="mb-3">Enter Amount</h6>
                <div className="enter-amount-wrap">

                  <InputCustom
                    type="text"
                    className="mb-0 max-field"
                    placeholder='0.0'
                    Fstar="*"
                    infoclass="d-none"
                    value={amount}
                    step={"any"}
                    name="buy-amount"
                    min={0}
                    maxLength={inputMaxLength}
                    required
                  >
                  </InputCustom>
                  {/* <Form.Select onChange={event => selectOnChangeHandler(event)} className="custom-select" value={selectedCurrencyType}>
                    {options.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </Form.Select> */}
                </div>

                {amountError && (
                  <div className="pt-2 err-wrapper">
                    <p className="text-danger">
                      {amountError}
                    </p>
                  </div>

                )}
                {Number(calculatedTokens) > 0 ?
                  <Form.Text>
                    {/* You will receive : <span>{calculatedTokens} {metaEastTokenDetails?.tokenSymbol}</span> */}
                  </Form.Text> : ''}
              </Col>

              <Col xs={12} md={12}>
                <Form.Text>
                  <span>435435</span>
                </Form.Text>
                <div className="add_new mt-5 text-center">
                  {
                    isBuyButtonDisabled ? (
                      <>
                        <ButtonCustom title="Buy" type="button"  />
                      </>) : (
                      <>
                        <ButtonCustom title="Buy" type="button" disabled />
                      </>
                    )
                  }
                </div>
              </Col>
            </Row>
          </Form>
        </Container>
      </Modal.Body>
    </Modal>
  );
};

export default BuyTokenModal;

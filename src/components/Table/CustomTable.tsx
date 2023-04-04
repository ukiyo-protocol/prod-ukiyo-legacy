import { Badge, Col, Container, Row, Table } from 'react-bootstrap';
import "./CustomTable.scss";
import { CommonService } from '../../services/CommonService';
import { ALLOWED_CURRENCY_TYPES, CURRENCY_TYPE, ETH_DECIMALS, KYC_STATUS, NETWORK_DETAILS } from '../../config/constants';
import { useSelector } from 'react-redux';
import moment from 'moment';
import ButtonCustom from '../common/ButtonNew/ButtonCustomNew';
import { useAppDispatch } from '../../hooks/hooks';
import { actionToClaimTokens } from '../../redux/actions/user.action';
import Toast from '../common/Toast';
import { IAxiosResponse } from '../../interfaces/axios';
import { useEffect } from 'react';
import { actionToGetIsVerifiedStatus, actionToUpdateIsVerifiedStatus } from '../../redux/actions/admin.action';
import { toast } from 'react-hot-toast';
 import Web3 from 'web3';

type ITransactionList = {
  amount_in_usd: string;
  mapping_id: number;
  buy_amount: string;
  is_claimed: number;
  created_at: string;
  currency_type: string;
  id: string;
  total_tokens: string;
  tx_hash: string;
  updated_at: string;
  user_details: { email: string, first_name: string, last_name: string };
  user_id: string;
  vesting_start_time: string;
  wallet_address: string;
  claim_tx_hash: string;
}
const CustomTable = (props: any) => {

  const dispatch = useAppDispatch();
  const userDetails = useSelector((state: any) => state.user);
  const ukiyoTokenDetails = useSelector((state: any) => state.user.ukiyoTokenDetails);
  const usdtTokenDetails = useSelector((state: any) => state.user.usdtTokenDetails);



 

  const viewBuyamountHandler = (value: any, type: Number) => {
    if (Number(value) && Number(value) > 0) {
      if (type == ALLOWED_CURRENCY_TYPES.ETH) {
        return (Number(value) / ETH_DECIMALS).toFixed(5);
      } else {
        return (Number(value) / usdtTokenDetails?.tokenDecimals).toFixed(5);
      }
    } else {
      return 0
    }

  }

  const viewClaimStatus = (isClaimed: number) => {
    if (isClaimed == 0) {
      return (
        'Not Claimed'
        // <button className={'status_btn'}>Not Claimed</button>
      )
    } else {
      return (
        'Claimed'
        // <button className={'status_btn'}>Claimed</button>
      )
    }

  }

  const handlerToClaimTokens = async (claim_id: number) => {
    let data = {} as any;
    if (!userDetails.walletAddress) {
      return Toast.error('Please connect with wallet');
    }
    data.walletAddress = userDetails.walletAddress;
    data.claim_id = claim_id;
    let result = await dispatch(actionToClaimTokens(userDetails.wallet, data)) as unknown as IAxiosResponse;
    if (result && result.status) {
      Toast.success('Token claimed successfully')
      props.callback();
    }
    props.callback();

  }



  //Function to return kyc status
  const kycStatusView = (status: number) => {
    // if (status === KYC_STATUS.SUBMITTED) {

    //   return <Badge className='rounded-pill p-3 text-white' bg="primary">Submitted</Badge>;
    // }
    if (status === KYC_STATUS.PENDING) {
      return <Badge className='rounded-pill p-3 text-white' bg="warning">Pending</Badge>;
    }
    else if (status === KYC_STATUS.REJECTED) {
      return <Badge className='rounded-pill p-3 text-white' bg="danger">Rejected</Badge>;
    } else if (status === KYC_STATUS.APPROVED) {
      return <Badge className='rounded-pill p-3 text-white' bg="success">Approved</Badge>;
    } else {
      return <Badge className='rounded-pill p-3 text-white' bg="info">Not Submitted</Badge>;
    }
  }


//handler to APprove button based on status
 const handlerToUpdateIsVerifiedStatus =async(e ,email:string)=>{
    let payload ={
      walletAddress :userDetails.walletAddress ,
      // address :userAddress
      email : Web3.utils.toHex(email)
    }
  let result = await dispatch(actionToUpdateIsVerifiedStatus(userDetails.wallet,payload)) as any;
  if(result && result.status){
     Toast.success("Approved successfully");
     props.callback();
  }
  props.callback();
 }

  
  return (
    <>
      <section className="custom_table">
        <Container fluid>
          <Row>
            <Col className="p-0">
              <div className='table_responsive'>
                <Table className="custom_table_inner" responsive>
                  <thead>
                    <tr>
                      {props?.fields?.map((items: any, index: any) => {
                        return (
                          <th key={index}>{items.name}</th>

                        )
                      })}
                    </tr>
                  </thead>
                  {
                    props.kyc && (<>
                      <tbody>
                        {props && props?.kyc?.count > 0 ? <>
                          {props?.kyc?.rows.map((items: any, index: any) => 
                             (
                              <tr key={index}>
                                <td>{items.first_name.charAt(0).toUpperCase() + items.first_name.slice(1) + " " + items.last_name.charAt(0).toUpperCase() + items.last_name.slice(1)}</td>
                                <td>{items.email}</td>
                                <td>{items.kyc_submitted_date ? moment(items.kyc_submitted_date).format('MMM Do YYYY, h:mm a') : '--'}</td>
                                <td>{items.kyc_approved_date ? moment(items.kyc_approved_date).format('MMM Do YYYY, h:mm a') : '--'}</td>
                                <td>
                                  {kycStatusView(items.is_kyc_verified)}
                                </td>
                                <td>
                                  {items?.is_kyc_admin_approved === 0 && items.is_kyc_verified== KYC_STATUS.APPROVED?<ButtonCustom className="btn-style red-btn" title="Approve" onClick={(e) => handlerToUpdateIsVerifiedStatus(e,items.email)} type='button' />:items?.is_kyc_admin_approved === 1?
                                  <ButtonCustom className="bg-success btn-style text-white" title="Approved" disabled={true} type='button' /> :"--"}
                                  </td>
                              </tr>
                            )
                          )}
                        </> : <tr>
                          <td colSpan={8} className="text-center text-danger fs-4">
                            No record found
                          </td>

                        </tr>}
                      </tbody>
                    </>)
                  }

                  {
                    props.transactionData && props.type == 'user-txn-history' && (<>
                      <tbody>
                        {props && props?.transactionData?.count > 0 ? <>
                          {props?.transactionData?.rows?.map((items: ITransactionList, index: number) => (

                            <tr key={index}>

                              <td><a target="_blank" href={`${NETWORK_DETAILS.EXPLORER}/tx/${items.tx_hash}`}>{CommonService.custmizeAddress(items.tx_hash)}</a></td>
                              {/* <td>{items.user_details.email}</td> */}
                              <td><span>{items.total_tokens && Number(items.total_tokens) > 0 ?
                                (Number(items?.total_tokens) / ukiyoTokenDetails?.tokenDecimals).toFixed(5)
                                : 0} {ukiyoTokenDetails?.tokenSymbol}</span></td>
                              <td><span>{viewBuyamountHandler(items.buy_amount, Number(items.currency_type))} {Number(items.currency_type) == ALLOWED_CURRENCY_TYPES.ETH ? CURRENCY_TYPE.ETH : CURRENCY_TYPE.USDT}</span></td>
                              {/* <td><span>{Number(items.currency_type) == ALLOWED_CURRENCY_TYPES.ETH ? CURRENCY_TYPE.ETH : CURRENCY_TYPE.USDT}</span></td> */}
                              <td><span>{moment(items.created_at).format('MMM Do YYYY, h:mm a')}</span></td>
                              {/* <td><span>{items.claim_tx_hash}</span></td> */}
                              <td>{items?.claim_tx_hash ? <a target="_blank" href={`${NETWORK_DETAILS.EXPLORER}/tx/${items.claim_tx_hash}`}>{CommonService.custmizeAddress(items.claim_tx_hash)}</a> : '--'}</td>

                              <td><span>{viewClaimStatus(items.is_claimed)}</span></td>
                              <td>
                                {items.is_claimed == 0 ? <ButtonCustom className="btn-style red-btn" title="Claim" onClick={() => handlerToClaimTokens(items.mapping_id)} type='button' />
                                  : <ButtonCustom className="btn-style" title="Claim" type='button' disabled={true} />
                                }
                              </td>
                            </tr>
                          ))}
                        </> : <tr>
                          <td colSpan={8} className="text-center text-danger fs-4">
                            No record found
                          </td>

                        </tr>}

                      </tbody>
                    </>)
                  }


                  {
                    props.transactionData && props.type == 'admin-txn-history' && (<>
                      <tbody>
                        {props && props?.transactionData?.count > 0 ? <>
                          {props?.transactionData?.rows?.map((items: ITransactionList, index: number) => (

                            <tr key={index}>

                              <td><a target="_blank" href={`${NETWORK_DETAILS.EXPLORER}/tx/${items.tx_hash}`}>{CommonService.custmizeAddress(items.tx_hash)}</a></td>
                              <td>{items.user_details.email}</td>
                              <td><span>{Number(items.total_tokens) && Number(items.total_tokens) > 0 ?
                                (Number(items?.total_tokens) / ukiyoTokenDetails?.tokenDecimals).toFixed(5)
                                : 0} {ukiyoTokenDetails?.tokenSymbol}</span></td>
                              <td><span>{viewBuyamountHandler(items.buy_amount, Number(items.currency_type))} {Number(items.currency_type) == ALLOWED_CURRENCY_TYPES.ETH ? CURRENCY_TYPE.ETH : CURRENCY_TYPE.USDT}</span></td>
                              {/* <td><span>{Number(items.currency_type) == ALLOWED_CURRENCY_TYPES.ETH ? CURRENCY_TYPE.ETH : CURRENCY_TYPE.USDT}</span></td> */}
                              <td><span>{moment(items.created_at).format('MMM Do YYYY, h:mm a')}</span></td>

                              <td>{items?.claim_tx_hash ? <a target="_blank" href={`${NETWORK_DETAILS.EXPLORER}/tx/${items.claim_tx_hash}`}>{CommonService.custmizeAddress(items.claim_tx_hash)}</a> : '--'}</td>
                              <td><span>{viewClaimStatus(items.is_claimed)}</span></td>
                            </tr>
                          ))}
                        </> : <tr>
                          <td colSpan={8} className="text-center text-danger fs-4">
                            No record found
                          </td>

                        </tr>}

                      </tbody>
                    </>)
                  }


                </Table>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default CustomTable;
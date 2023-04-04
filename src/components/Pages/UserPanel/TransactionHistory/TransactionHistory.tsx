import { useEffect, useLayoutEffect, useState } from "react";
import { API, API_HOST } from "../../../../config/constants";
import { apiCallGet } from "../../../../services/axios";
import Paginate from "../../../common/CustomPagination/Paginate";
import Filter from "../../../common/Filter/Filter";
import Layout from "../../../Layout/Layout";
import CustomTable from "../../../Table/CustomTable";
import "./TransactionHistory.scss";
import { AxiosResponse } from 'axios';
import { RESPONSES } from '../../../../constants/response';
import { useSelector } from 'react-redux';
import Toast from "../../../common/Toast";
import moment from "moment";

const TransactionHistory = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const userDetails = useSelector((state:any)=>state.user)

  const [startDate, setStartDate] = useState(null) as any;
  const [endDate, setEndDate] = useState(null) as any
  const [claimStatus, setClaimStatus] = useState(null);

  const [list, setList] = useState() as any;
  useEffect(() => {
    if (userDetails.walletAddress) {
      getTransactionList();
    }
  }, [page, startDate, endDate, claimStatus]);

  const getTransactionList = async () => {
  
     let result = await apiCallGet(`${API_HOST}${API.USER.TRANSACTIONS}?page=${page}&limit=${limit}&start=${startDate}&end=${endDate}&status=${claimStatus}`) as any;
    // let result = await apiCallGet(`${API_HOST}${API.USER.TRANSACTIONS}?page=${page}&limit=${limit}&start=""&end=""&status=""`) as AxiosResponse;
    if (result && result.status == RESPONSES.SUCCESS) {
      setList(result.data);
    } else {
      //whenever user select incorrect range of date filter
      setList();
      Toast.error(result?.message)
  
    }
  }
  const fields = [
    { name: 'Transaction Hash' },
    // { name: 'Email ID' },
    { name: 'Tokens Bought' },
    { name: 'Tokens Spent' },
    // { name: 'Currency Type' },
    { name: 'Date & Time' },
    { name: 'Claim (Txn hash)' },

    { name: 'Status' },
    { name: 'Action' },
  ]
  //pagination handler
  const pageHandler = (page: number) => {
    setPage(page)
  }
  
  
  const filterHandler = (type:any ,data:any) => {
    if (type == "start") {
      setStartDate(data)
    } else if (type == "end") {
      setEndDate(data);
    } else if (type == 'claim') {
      setClaimStatus(data);
    }
    setPage(1)

    
  }
  
  
  // function to reset/clear start and end date
  const dateFilterResetHandler = () => {
    setStartDate(null);
    setEndDate(null);
  }
  
  
  return (
    <Layout headTitle="Transaction history">
      <div className="transaction-history">
        <Filter callback={filterHandler} dateResetCallback={dateFilterResetHandler}   />
        <CustomTable
          type = 'user-txn-history'
          fields={fields}
          transactionData={list ? list : { count: 0, rows: [] }}
          callback={getTransactionList}
        />
        {list && list.count > limit ? <Paginate totalPages={Math.ceil(list.count / limit)}
         callback={pageHandler} />
          : null}
      
      </div>
    </Layout>
  );
};

export default TransactionHistory;

import Paginate from "../../../common/CustomPagination/Paginate";
import Filter from "../../../common/Filter/Filter";
import Layout from "../../../Layout/Layout";
import CustomTable from "../../../Table/CustomTable";
import "./AdminTransactionHistory.scss";
import { useEffect, useLayoutEffect, useState } from 'react';
import { apiCallGet } from "../../../../services/axios";
import { API, API_HOST, FILTER_TYPE } from "../../../../config/constants";
import { RESPONSES } from "../../../../constants/response";
import { AxiosResponse } from "axios";
import { ITransactionListPayload } from "../../../../interfaces/admin";
import Toast from "../../../common/Toast";

const AdminTransactionHistory = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [claimStatus, setClaimStatus] = useState(null);
  const [list, setList] = useState() as any;

  useEffect(() => {
    getTransactionList();
  }, [page]);

  //hook for filters
  useEffect(() => {
    getTransactionList();
  }, [startDate, endDate, claimStatus]);
//function to get records based on different filters
  const getTransactionList = async () => {
    const result = await apiCallGet(`${API_HOST}${API.ADMIN.TRANSACTIONS}?page=${page}&limit=${limit}&start=${startDate}&end=${endDate}&status=${claimStatus}`) as any;
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
    { name: 'Email ID' },
    { name: 'Tokens Bought' },
    { name: 'Tokens Spent' },
    // { name: 'Currency Type' },
    { name: 'Date & Time' },
    {name:"Claim (Txn hash)"},
    { name: 'Status' },
  ];

  //pagination handler
  const pageHandler = (page: number) => {
    setPage(page)
  }

  //filter handlers
  const filterCallbackHandler = (type: string, data: any) => {
    if (type == FILTER_TYPE.START) {
      setStartDate(data)

    } else if (type == FILTER_TYPE.END) {
      
      setEndDate(data);
    } else if (type == FILTER_TYPE.CLAIM) {
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
    <Layout headTitle="Transaction History">
      <div className="transaction-history">
        <Filter callback={filterCallbackHandler} dateResetCallback={dateFilterResetHandler} />
        <CustomTable
          type ='admin-txn-history'
          fields={fields}
          transactionData={list ? list : { count: 0, rows: [] }}
          callback={getTransactionList}
        />
        {list && list.count > limit ? <Paginate totalPages={Math.ceil(list.count / limit)} callback={pageHandler} />
          : null}
      </div>
    </Layout>
  );



};



export default AdminTransactionHistory;

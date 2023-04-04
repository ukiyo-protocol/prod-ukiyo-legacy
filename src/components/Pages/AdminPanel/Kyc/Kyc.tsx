import { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { API, API_HOST, FILTER_TYPE } from "../../../../config/constants";
import { RESPONSES } from "../../../../constants/response";
import { IUserListPayload } from "../../../../interfaces/admin";
import { apiCallGet } from "../../../../services/axios";
import Paginate from "../../../common/CustomPagination/Paginate";
import Filter from "../../../common/Filter/Filter";
import Layout from "../../../Layout/Layout";
import CustomTable from "../../../Table/CustomTable";
import "./Kyc.scss";
import Toast from "../../../common/Toast";
import moment from "moment";


const Kyc = () => {
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);

    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    
    const [claimStatus, setClaimStatus] = useState(null);
    const [list, setList] = useState() as any;

    useEffect(() => {
        onInit();
        return () => { }
    }, [page])

    //hook for filters
    useEffect(() => {
        onInit();
    }, [startDate, endDate, claimStatus]);
    //on page reload
    const onInit = async () => {
        const result = await apiCallGet(`${API_HOST}${API.ADMIN.USERS}?page=${page}&limit=${limit}&start=${startDate}&end=${endDate}&status=${claimStatus}`) as any;
        if (result && result.status == RESPONSES.SUCCESS) {
            setList(result.data);
        } else {
            //whenever user select incorrect range of date filter
            setList();
            Toast.error(result?.message)

        }
    }
    const fields = [
        { name: 'Name'},
        { name: 'Email ID'},
        { name: 'Submitted Date & Time' },
        { name: 'Approved Date & Time' },
        { name: 'Kyc Status(Sumsub)' },
        {name :'Action(Smart Contract)'}
    ]

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

        }
        else if (type == FILTER_TYPE.CLAIM) {
            setClaimStatus(data);
        }
    }
    
    
    
    // function to reset/clear start and end date
    const dateFilterResetHandler = () => {
        setStartDate(null);
        setEndDate(null);
    }
    return (
        <Layout headTitle="Know Your Customer Identification">
            <div className="transaction-history">
                <Filter callback={filterCallbackHandler} isKycView={true} dateResetCallback={dateFilterResetHandler} />
                <CustomTable
                    fields={fields}
                    kyc={list ? list : { count: 0, rows: [] }}
                    callback={onInit}
                />
                {list && list.count > limit ? <Paginate
                    totalPages={Math.ceil(list.count / limit)}
                    callback={pageHandler} />
                    : null}
            </div>
        </Layout>
    );
};

export default Kyc;

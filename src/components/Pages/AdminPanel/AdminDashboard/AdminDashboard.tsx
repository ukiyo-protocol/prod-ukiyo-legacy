import React, { useEffect, useState } from 'react';
import "./AdminDashboard.scss";
import Layout from '../../../Layout/Layout';
import { Col, Container, Row } from 'react-bootstrap';
import InfoCard from '../../../InfoCard/InfoCard';
import token from "../../../../assets/Images/tokens.svg";
import fund from "../../../../assets/Images/fund.png";
import users from "../../../../assets/Images/users.svg";
import graph from "../../../../assets/Images/graph.png";
import CustomTable from '../../../Table/CustomTable';
import * as async from "async";
import { useAppDispatch } from '../../../../hooks/hooks';
import { actionGetAmountRaisedInUSD, actionGetTotalTokenSold } from '../../../../redux/actions/admin.action';
import { IReduxUserDetails } from '../../../../interfaces/store';
import { useSelector } from 'react-redux';
import { setLoader } from '../../../../redux/actions/loader.action';
import { API, API_HOST, USD_DECIMALS, SECRET_KEY } from '../../../../config/constants';
import { actionToGetUkiyoTokenDetails } from '../../../../redux/actions/user.action';
import { IAdminDashboardAsyncPayload, IUkiyoTokenDecimalsAndSymbol } from '../../../../interfaces/admin';

import { IChartResponse } from "../../../../interfaces/common";
import Select from "react-select";

import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend
} from "recharts";
import { apiCallGet } from '../../../../services/axios';
import { RESPONSES } from '../../../../constants/response';
import { AxiosResponse } from 'axios';
import { CommonService } from '../../../../services/CommonService';

const AdminDashboard = () => {
    //Redux 
    const userDetails: IReduxUserDetails = useSelector((state: any) => (state.user.walletAddress) ? state.user : false);
    const dispatch = useAppDispatch();
    const [kyc, setkyc] = useState([]);
    const [totalTokenSold, setTotalTokenSold] = useState("");
    const [totalAmountRaisedInUsd, setTotalAmountRaisedInUsd] = useState("");
    const [totalUsers, setTotalUsers] = useState('');
    const [ukiyoTokenDetails, setUkiyoTokenDetails] = useState() as any;

    const [graphData, setGraphData] = useState<Partial<Array<IChartResponse>>>([]);

    const [filter, setFilter] = useState("1");

    //Hook on page reload
    useEffect(() => {
        onInit();
       // pageOnInit();
        return () => { }
    }, [])



    //Function to get total ujiyo token sold
    const viewTotalTokenSold = (totalToken: string, ukiyoToken: IUkiyoTokenDecimalsAndSymbol) => {
        if (typeof (totalToken) !== 'undefined' && typeof (ukiyoToken) !== 'undefined') {
            if (Number(totalToken) && Number(totalToken) > 0 && Number(totalToken) !== undefined) {
                return `${Number(totalToken) / ukiyoToken?.tokenDecimals} ${ukiyoToken?.tokenSymbol}`
            } else {
                return `0 ${ukiyoToken?.tokenSymbol}`
            }
        } else {
            return 0
        }
    }


    //function used on reload
    // const onInit = async () => {
    //     try {
    //         dispatch(setLoader(true));
    //         //TODO will refrector the code with interface
    //         const results = (await async.parallel({
    //             totalTokenSold: async function () {
    //                 return await dispatch(actionGetTotalTokenSold(userDetails.wallet))

    //             },
    //             amountRaisedInUsd: async function () {
    //                 return await dispatch(actionGetAmountRaisedInUSD(userDetails.wallet));
    //             },

    //             ukiyoTokenInfo: async function () {
    //                 return await dispatch(actionToGetUkiyoTokenDetails(userDetails.wallet));
    //             }

    //         })) as unknown as IAdminDashboardAsyncPayload;

    //         if (results) {
    //             dispatch(setLoader(false));
    //             if (results.ukiyoTokenInfo) {
    //                 setUkiyoTokenDetails(results.ukiyoTokenInfo);
    //             }
    //             if (results.totalTokenSold) {
    //                 const data = (await viewTotalTokenSold(results.totalTokenSold, results.ukiyoTokenInfo)) as unknown as string;
    //                 setTotalTokenSold(data)
    //             }
    //             if (results.amountRaisedInUsd) {
    //                 setTotalAmountRaisedInUsd(results.amountRaisedInUsd)
    //             }

    //         }
    //     }
    //     catch (err) {
    //         dispatch(setLoader(false));
    //         console.log("Error under admin landing init", err);
    //     }
    // }

    const onInit = () => {
        async.parallel({
            totalTokenSold: function (callback) {
                //to get the ukiyo token details
                dispatch(actionToGetUkiyoTokenDetails(userDetails.wallet)).then((ukiyoTokenInfo: IUkiyoTokenDecimalsAndSymbol | any) => {
                    // callback(null, resp)
                    // to get the TVS sold
                    dispatch(actionGetTotalTokenSold(userDetails.wallet)).then((tokenSoldValue) => {
                        //store TVS result & return with callback
                        const soldValue = viewTotalTokenSold(String(tokenSoldValue), ukiyoTokenInfo);
                        callback(null, soldValue)
                    }).catch((err: unknown) => {
                        console.log('Error under total token sold', err)
                    })
                }).catch((err: unknown) => {
                    console.log('Error under while getting ukiyo token details', err)
                })

            },
            amountRaisedInUsd: function (callback) {
                dispatch(actionGetAmountRaisedInUSD(userDetails.wallet)).then((resp) => {
                    callback(null, resp)
                }).catch((err: unknown) => {
                    console.log('Error while gettting amount raised in USD', err)
                })
            }

        }, function (err, results: any) {
            if (err) {
                dispatch(setLoader(false));
                console.log("Error while intreacting with contract on page reload")
            }
            if (results) {
                dispatch(setLoader(false));

                if (results.totalTokenSold) {
                    setTotalTokenSold(results.totalTokenSold)
                }
                if (results.amountRaisedInUsd) {
                    setTotalAmountRaisedInUsd(results.amountRaisedInUsd)
                }

            }
        });
    }

    
    //Hook for filter on change
    useEffect(() => {
        if (userDetails && userDetails?.walletAddress) {
            //Graph handler
            fetchGraphDataViaFilter();
        }
        return () => { }
    }, [filter, ukiyoTokenDetails]);
    
    //Graph data on filter change
    const fetchGraphDataViaFilter = async () => {
        const graphDetails = (await apiCallGet(`${API_HOST}${API.ADMIN.GRAPH}?graph_filter=${filter}`)) as AxiosResponse;
        setTotalUsers(graphDetails.data.total_users);
        if (ukiyoTokenDetails?.tokenDecimals && graphDetails && graphDetails.status === RESPONSES.SUCCESS) {
            const formattedData = (CommonService.getGraphDataFormat(Number(filter), graphDetails.data.graph_data, ukiyoTokenDetails?.tokenDecimals!)) as unknown as Array<IChartResponse>;
            setGraphData(formattedData);
        }
    }
    
    const data = [
        {
            name: 'Page A',
            uv: 4000,
            pv: 2400,
            amt: 2400,
        },
        {
            name: 'Page B',
            uv: 3000,
            pv: 1398,
            amt: 2210,
        },
        {
            name: 'Page C',
            uv: 2000,
            pv: 9800,
            amt: 2290,
        },
        {
            name: 'Page D',
            uv: 2780,
            pv: 3908,
            amt: 2000,
        },
        {
            name: 'Page E',
            uv: 1890,
            pv: 4800,
            amt: 2181,
        },
        {
            name: 'Page F',
            uv: 2390,
            pv: 3800,
            amt: 2500,
        },
        {
            name: 'Page G',
            uv: 3490,
            pv: 4300,
            amt: 2100,
        },
    ];
    const [claimStatus, setClaimedStatus] = useState();
    //Grap select options
    const options = [
        { value: null, label: "Select Filter" },
        { value: 1, label: "Day" },
        { value: 2, label: "Weekly" },
        { value: 3, label: "Monthly" },
        { value: 4, label: "Yearly" },
    ];


    // const claimStatusFilterHandler = (selectedOption: any) => {
    //     setClaimedStatus(selectedOption);
    //     callback('claim', selectedOption.value)
    // };

    return (
        <>
            <Layout>
                <section className='admin_dashboard'>
                    <Container className='p-0'>
                        <Row>
                            <Col xs={12} sm={6} lg={6} xl={4}>
                                <InfoCard
                                    icon={token}
                                    title="Total Tokens Sold"
                                    content={totalTokenSold} />
                            </Col>
                            <Col xs={12} sm={6} lg={6} xl={4}>
                                <InfoCard
                                    icon={fund}
                                    title="Fund Raised"
                                    content={`${(Number(totalAmountRaisedInUsd) / USD_DECIMALS).toFixed(5)} USD`} />
                            </Col>
                            <Col xs={12} sm={6} lg={6} xl={4}>
                                <InfoCard
                                    icon={users}
                                    title="Total Users"
                                    content={totalUsers} />
                            </Col>
                        </Row>
                        <Row>
                            <Col lg={12}>
                                <div className='graph_sec'>
                                    <div className='graph_sec_head'>
                                        <h3>Sale Graph</h3>
                                        <div className='graph_select'>
                                            <select className="form-select form-select-lg mb-3" onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setFilter(e.target.value)} value={filter} aria-label=".form-select-lg example">
                                                {/* <option value="0">Select Filter</option> */}
                                                <option value="0">Day</option>
                                                <option value="1">Weekly</option>
                                                <option value="2">Monthly</option>
                                                <option value="3">Yearly</option>
                                            </select>
                                            {/* <Select
                                                options={options}

                                                value={claimStatus}
                                                // onChange={claimStatusFilterHandler}
                                                isSearchable={false}
                                                placeholder="All Status"
                                                className="react-select-custom react-select-custom--filter"
                                                classNamePrefix="react-select"
                                            /> */}
                                        </div>
                                    </div>
                                    <div className='graph_sec_img pb-5'>
                                        {/* <img src={graph} alt="graph_img" /> */}
                                        <div className="line_chart">
                                            <ResponsiveContainer
                                                width="100%" >
                                                <LineChart
                                                    height={300}
                                                    data={graphData}
                                                    margin={{
                                                        top: 5,
                                                        right: 30,
                                                        left: 20,
                                                        bottom: 5
                                                    }}
                                                >
                                                    <CartesianGrid strokeDasharray="3 3" />
                                                    <XAxis dataKey="name" />
                                                    <YAxis />
                                                    <Tooltip />
                                                    <Legend />
                                                    <Line
                                                        type="monotone"
                                                        dataKey="tokens"
                                                        stroke="#8884d8"
                                                        activeDot={{ r: 8 }}
                                                    />
                                                    {/* <Line type="monotone" dataKey="uv" stroke="#82ca9d" /> */}
                                                </LineChart>
                                            </ResponsiveContainer>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </section>
            </Layout>
        </>
    );
};

export default AdminDashboard;
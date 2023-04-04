import SumsubWebSdk from '@sumsub/websdk-react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { API, API_HOST } from '../config/constants';
import { IAxiosResponse } from '../interfaces/axios';
import { apiCallGet } from '../services/axios';

type props = {
    show: boolean;
    token: string;
    callback: any;
}
export default function SumsubKyc({ show, token, callback }: props) {

    const expirationHandle = (data: any) => {
    }
    const messageHandler = async (message: any, payload: any) => {
        let result = await apiCallGet(API_HOST + API.SUMSUB.APPLICANT_STATUS, {}, false, false) as IAxiosResponse;
    }
    const errorHandler = (data: any) => {

    }
    return (
        <SumsubWebSdk
            accessToken={token}
            expirationHandler={() => Promise.resolve(token)}
            options={{ addViewportTag: false, adaptIframeHeight: true }}
            onMessage={messageHandler}
            onError={errorHandler}
        />

    )
}

import React, {useEffect, useState} from 'react';
import Header from "../component/Header";
import {useAccount, useMsal} from "@azure/msal-react";
import {protectedResources} from "../config/authConfig";
import {home_get} from "../api/home.api";
import {Breadcrumb} from "antd";

const Home = () => {
    const { instance, accounts, inProgress } = useMsal();
    const account = useAccount(accounts[0] || {});
    const [data, setData] = useState<any>(null);

    useEffect(() => {
        if (account && inProgress === "none") {
            instance.acquireTokenSilent({
                scopes: protectedResources.apiHello.scopes,
                account: account
            }).then((response) => {
                home_get(response.accessToken)
                    .then(response => setData(response));
            }).catch((error) => {
                console.log(error)
            });
        }
    }, [account, inProgress, instance]);
    return (
        <div>
            {/*<Header title={"Home"}/>*/}
            <Breadcrumb style={{margin: '16px 0'}}>
                <Breadcrumb.Item>Home</Breadcrumb.Item>
                <Breadcrumb.Item></Breadcrumb.Item>
            </Breadcrumb>
            {data?.message}
        </div>
    );
};

export default Home;

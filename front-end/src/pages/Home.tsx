import React, {useEffect, useState} from 'react';
import Header from "../component/Header";
import {useAccount, useMsal} from "@azure/msal-react";
import {protectedResources} from "../config/authConfig";
import {home_get} from "../api/home.api";

const Home = () => {
    const { instance, accounts, inProgress } = useMsal();
    const account = useAccount(accounts[0] || {});
    const [data, setData] = useState<any>(null);

    useEffect(() => {
        if (account && inProgress === "none" && !data) {
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
        <>
            <Header path={["Home"]}/>
            {data?.message ?? ""}
        </>
    );
};

export default Home;

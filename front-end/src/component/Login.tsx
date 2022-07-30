import React from 'react';
import {Button} from "react-bootstrap";
import {loginRequest} from "../config/authConfig";
import {useIsAuthenticated, useAccount, useMsal} from "@azure/msal-react";

const Login = () => {
    const { instance, accounts, inProgress } = useMsal();
    const isAuthenticated = useIsAuthenticated();

    const account = useAccount(accounts[0] || {});

    const handleLogin = () => {
        instance.loginPopup(loginRequest)
            .catch((error) => console.log(error))
    }

    const handleLogout= ()=> {
        instance.logoutPopup({
            postLogoutRedirectUri: "/",
            mainWindowRedirectUri: "/"
        }).catch((error) => console.log(error));
    }

    return (
        <>
            {
                !isAuthenticated ?
                    <Button
                        variant={"outline-dark"}
                        className={"m-2"}
                        onClick={handleLogin}
                    >
                        Login
                    </Button>
                    :
                    <>
                        <Button
                            variant={"outline-success "}
                            className={"m-2 rounded-pill"}
                        >
                            {account?.name}
                        </Button>
                        <Button
                            variant={"outline-secondary"}
                            className={"m-2"}
                            onClick={handleLogout}
                        >
                            Logout
                        </Button>

                    </>
            }

        </>
    );


};

export default Login;

import React from 'react';
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
            {/*{*/}
            {/*    !isAuthenticated ?*/}
            {/*        <Button*/}
            {/*            variant={"outline-dark"}*/}
            {/*            className={"m-2"}*/}
            {/*            onClick={handleLogin}*/}
            {/*        >*/}
            {/*            Login*/}

            {/*        </Button>*/}
            {/*        :*/}
            {/*        <>*/}
            {/*            <Button*/}
            {/*                variant={"outline-success "}*/}
            {/*                className={"m-2 mx-3 rounded-pill position-relative"}*/}
            {/*            >*/}
            {/*                {account?.name}*/}
            {/*                <span*/}
            {/*                    className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"*/}
            {/*                >*/}
            {/*                    99+*/}
            {/*                <span className="visually-hidden">unread messages</span>*/}
            {/*                </span>*/}

            {/*            </Button>*/}
            {/*            <Button*/}
            {/*                variant={"outline-secondary"}*/}
            {/*                className={"m-2"}*/}
            {/*                onClick={handleLogout}*/}
            {/*            >*/}
            {/*                Logout*/}
            {/*            </Button>*/}

            {/*        </>*/}
            {/*}*/}

        </>
    );


};

export default Login;

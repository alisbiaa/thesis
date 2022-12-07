import React, {CSSProperties} from 'react';
import {Button} from "antd";
import {LockFilled} from "@ant-design/icons";
import {useMsal} from "@azure/msal-react";
import {loginRequest} from "../config/authConfig";
import {useNavigate} from "react-router-dom";
import login from "../component/Login";
import {login_create_api} from "../api/user.api";


const style : CSSProperties = {
    position: "absolute",
    top: "50%",
}


const Login = () => {

    const navigate = useNavigate();
    const { instance } = useMsal();
    const handleLogin = () => {
        instance.loginPopup(loginRequest).then((data) => {
            const username = data.account?.username;
            const name = data.account?.name;
            console.log("HELLO");
            console.log(data.account);
            login_create_api({email: username, name}).then(data => console.log(data));
            navigate("/")
        })
            .catch((error) => console.log(error));
    }

    return (
        <div style={{textAlign:"center"}}>
            <Button
                type="primary"
                shape="round"
                icon={<LockFilled/>}
                size={"large"}
                style={style}
                // loading={isAuthenticated}
                onClick={handleLogin}
            >
                Login
            </Button>
        </div>
    );
};

export default Login;

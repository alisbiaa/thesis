import React, {useEffect, useState} from 'react';
import {Layout, Menu} from 'antd';
import SideBar from "./component/SideBar";
import {Navigate, Route, Routes, useNavigate} from "react-router-dom";
import Login from "./pages/Login";
import {useIsAuthenticated, useMsal} from "@azure/msal-react";
import NotFound from "./pages/NotFound";
import {IUser} from "./static/interfaces";
import {get_user} from "./api/user.api";
import {get_routes} from "./config/routes";

const { Header, Content, Footer } = Layout;



const App: React.FC = () => {
    const navigate = useNavigate();
    const isAuthenticated = useIsAuthenticated();
    const { instance, accounts } = useMsal();
    const handleLogout= ()=> {
        instance.logoutPopup({
            postLogoutRedirectUri: "/",
            mainWindowRedirectUri: "/"
        }).catch((error) => console.log(error));
        navigate("/login");
    }

    const account = accounts[0];
    const email = account.username ?? "";

    const [user, setUser] = useState<IUser | null>(null);

    useEffect(() => {
        const fetchData = async ()=> {
            const {message, success, data, error, status} = await get_user(email);
            if (success)
                setUser(data);
            else
                setUser(null);
        }
        fetchData();
    }, [email]);

    const routes = get_routes(user?.role ?? "RO");

    return (
        isAuthenticated ?
            <Layout hasSider>
                <SideBar/>
                <Layout className="site-layout">
                    <Header className="site-layout-background" style={{padding: 0}}>
                        <Menu
                            theme="light"
                            mode={"horizontal"}
                            defaultSelectedKeys={['2']}
                        >
                            {/* TODO : fix*/}
                            <Menu.Item
                                onClick={handleLogout}
                                style={{marginLeft: "auto"}}
                            >
                                Logout
                            </Menu.Item>
                        </Menu>
                    </Header>
                    <Content style={{padding: '0 16px', backgroundColor: "white"}}>
                        <Routes>
                            {
                                routes.map((route, index) =>
                                    <Route
                                        key={index}
                                        path={route.path}
                                        element={React.createElement(route.component)}
                                    />
                                )
                            }
                            <Route path={"*"} element={<NotFound/>}/>
                        </Routes>
                    </Content>
                    <Footer style={{textAlign: 'center'}}>Thesis ELTE ©2022 Created by Ali Sbiaa Zayen</Footer>
                </Layout>
            </Layout>


            :
            <Routes>
                <Route path={"/login"} element={<Login/>}/>
                <Route path={"*"} element={<Navigate to={"/login"}/>}/>
            </Routes>

    );
};

export default App;

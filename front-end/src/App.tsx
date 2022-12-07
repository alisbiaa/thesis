import React, {useEffect, useState} from 'react';
import {Layout} from 'antd';
import SideBar from "./component/SideBar";
import {Navigate, Route, Routes} from "react-router-dom";
import Login from "./pages/Login";
import {useIsAuthenticated, useMsal} from "@azure/msal-react";
import NotFound from "./pages/NotFound";
import {IUser} from "./static/interfaces";
import {get_user} from "./api/user.api";
import {get_routes} from "./config/routes";
import NavBar from "./component/NavBar";

const { Content, Footer } = Layout;



const App: React.FC = () => {
    const isAuthenticated = useIsAuthenticated();
    const { accounts } = useMsal();

    const account = accounts[0];
    const email = account?.username ?? "";

    const [user, setUser] = useState<IUser | null>(null);

    useEffect(() => {
        if(!email) return;
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
                    <NavBar/>
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

import React from 'react';
import {Layout, Menu} from 'antd';
import SideBar from "./component/SideBar";
import {Navigate, Route, Routes, useNavigate} from "react-router-dom";
import Department from "./pages/department";
import Login from "./pages/Login";
import {useIsAuthenticated, useMsal} from "@azure/msal-react";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Profile from "./pages/profile";
import Ask from "./pages/ask";
import Search from "./pages/search/Search";
import View from "./pages/view";


const { Header, Content, Footer } = Layout;


const App: React.FC = () => {
    const navigate = useNavigate();
    const isAuthenticated = useIsAuthenticated();
    const { instance, accounts, inProgress } = useMsal();
    const handleLogout= ()=> {
        instance.logoutPopup({
            postLogoutRedirectUri: "/",
            mainWindowRedirectUri: "/"
        }).catch((error) => console.log(error));
        navigate("/login");
    }
    return (
        isAuthenticated ?
            <Layout style={{minHeight: '100vh'}}>
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
                    <Content style={{margin: '0 16px', overflow: 'initial' ,backgroundColor:"white"}} className="scrollable-container">
                        <Routes>
                            <Route path={"/"} element={<Home/>}/>
                            <Route path={"/profile"} element={<Profile/>}/>
                            <Route path={"/ask"} element={<Ask/>}/>
                            <Route path={"/search"} element={<Search/>}/>
                            <Route path={"/view/:id"} element={<View/>}/>
                            <Route path={"/department/:id"} element={<Department/>}/>
                            <Route path={"/404"} element={<NotFound/>}/>
                        </Routes>
                    </Content>
                    <Footer style={{textAlign: 'center'}}>Thesis ELTE ©2022 Created by Ali Sbiaa Zayen</Footer>
                </Layout>
            </Layout>
            :
            <Routes>
                <Route path={"/login"} element={ <Login/>}/>
                <Route path={"*"} element={<Navigate to={"/login"}/>}/>
            </Routes>

    );
};

export default App;

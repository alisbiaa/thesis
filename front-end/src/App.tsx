import React from 'react';
import {Breadcrumb, Layout, Menu} from 'antd';
import SideBar from "./component/SideBar";

const { Header, Content, Footer } = Layout;


const App: React.FC = () => {
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <SideBar/>
            <Layout className="site-layout">
                <Header className="site-layout-background" style={{ padding: 0}}  >
                    <Menu
                        theme="light"
                        mode={"horizontal"}
                        defaultSelectedKeys={['2']}

                    >
                        <Menu.Item style={{marginLeft:"auto"}}>
                            sadas
                        </Menu.Item>
                    </Menu>
                </Header>
                <Content style={{ margin: '0 16px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>User</Breadcrumb.Item>
                        <Breadcrumb.Item>Bill</Breadcrumb.Item>
                    </Breadcrumb>
                    <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                        Bill is a cat.
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
            </Layout>
        </Layout>
    );
};

export default App;

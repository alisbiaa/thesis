import React from 'react';
import Header from "../../component/Header";
import {useMsal} from "@azure/msal-react";
import {Avatar, Badge, Col, Divider, Modal, Row, Spin, Typography} from "antd";
import {UserOutlined} from "@ant-design/icons";
import Info from "./Info";
const { Title } = Typography;

const Profile = () => {
    const { accounts } = useMsal();
    const account = accounts[0];
    const name = account.name ?? "";

    const info = () => {
        Modal.info({
            title: 'This is a notification message',
            content: (
                <div>
                    <p>some messages...some messages...</p>
                    <p>some messages...some messages...</p>
                </div>
            ),
            onOk() {},
        });
    };

    return (
        <div>
            <Spin spinning={false}>
                <Header path={["Index", name]}/>
                <div className="site-layout-background" style={{padding: 24, minHeight: 360}}>
                    <Row gutter={[16, 16]}>
                        <Col span={24}>
                            {/* TODO : add notifications items */}
                            <span onClick={info} style={{cursor: "pointer"}}>
                               <Badge count={5}>
                                    <Avatar
                                        icon={<UserOutlined/>}
                                        shape="square"
                                        size={100}
                                        src="https://joeschmoe.io/api/v1/random"
                                    />
                                </Badge>
                            </span>
                            <Title style={{display: "inline", verticalAlign: "middle"}}> {name} </Title>
                        </Col>
                    </Row>
                    <Divider/>
                    <Info/>
                {/*    TODO : notifications */}
                </div>
            </Spin>
        </div>
    );
};

export default Profile;

import React, {useEffect, useState} from 'react';
import Header from "../../component/Header";
import {useMsal} from "@azure/msal-react";
import {Avatar, Badge, Col, Divider, Modal, Row, Spin, Typography} from "antd";
import {UserOutlined} from "@ant-design/icons";
import Info from "./Info";
import {IUser} from "../../static/interfaces";
import {get_user} from "../../api/user.api";
const { Title } = Typography;

const Profile = () => {
    const { accounts } = useMsal();
    const account = accounts[0];
    const name = account.name ?? "";
    const id = account.username ?? null;

    const [user, setUser] = useState<IUser | null>(null);
    const [spin, setSpin] = useState<boolean>(true);

    useEffect(() => {
        setUser(null);
        setSpin(true);
        if(!id) return;
        const fetchData = async () => {
            const {success, data} = await get_user(id);
            if (success) {
                setUser(data);
                setSpin(false);
            } else
                setUser(null);
        }
        fetchData();
    }, [id]);


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
            <Spin spinning={spin}>
                <Header path={["Profile", name]}/>
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
                    <Info user={user} editable={true}/>
                {/*    TODO : notifications */}
                </div>
            </Spin>
        </div>
    );
};

export default Profile;

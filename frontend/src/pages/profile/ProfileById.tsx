import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {IUser} from "../../static/interfaces";
import {get_user} from "../../api/user.api";
import {Avatar, Badge, Col, Divider, Row, Spin, Typography} from "antd";
import Header from "../../component/Header";
import {UserOutlined} from "@ant-design/icons";
import Info from "./Info";

const { Title } = Typography;
const ProfileById = () => {
    const {id} = useParams();

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

    const name = user?.name ?? "";

    return (
        <div>
            <Spin spinning={spin}>
                <Header path={["Profile", name]}/>
                <div className="site-layout-background" style={{padding: 24, minHeight: 360}}>
                    <Row gutter={[16, 16]}>
                        <Col span={24}>
                            {/* TODO : add notifications items */}
                            {/* onClick = {info} */}
                            <span style={{cursor: "pointer"}}>
                                    <Avatar
                                        icon={<UserOutlined/>}
                                        shape="square"
                                        size={100}
                                        src="https://joeschmoe.io/api/v1/random"
                                    />
                            </span>
                            <Title style={{display: "inline", verticalAlign: "middle"}}> {name} </Title>
                        </Col>
                    </Row>
                    <Divider/>
                    <Info user={user} editable={false}/>
                    {/*    TODO : notifications */}
                </div>
            </Spin>
        </div>
    );
};

export default ProfileById;
import React from 'react';
import {Button, Card, Col, Divider, Row, Space, Spin, Typography} from "antd";
import Header from "../component/Header";
import {EditOutlined, UserDeleteOutlined} from "@ant-design/icons";

const { Paragraph } = Typography;

const gridStyle: React.CSSProperties = {
    width: '100%',
};
const Users = () => {
    return (
        <Spin spinning={false}>
            <Header path={['Admin', 'Users']}/>
            <Row gutter={16}>
                <Col className="gutter-row" span={6}>
                    <Card title="Guest">
                        <Card.Grid style={gridStyle}>
                            <Space style={{verticalAlign:"bottom"}}>
                                cn4f59@INF.ELTE.HU
                                <Button icon={<UserDeleteOutlined/>} style={{marginLeft: "auto"}}/>
                                <Button icon={<EditOutlined/>}/>
                            </Space>
                        </Card.Grid>
                    </Card>
                </Col>
                <Col className="gutter-row" span={6}>
                    <Card title="Student">
                        <Card.Grid style={gridStyle}>
                            <UserDeleteOutlined/>
                            <EditOutlined key="edit"/>
                        </Card.Grid>
                    </Card>
                </Col>
                <Col className="gutter-row" span={6}>
                    <Card title="Teachers">
                        <Card.Grid style={gridStyle}>
                            <UserDeleteOutlined/>
                            <EditOutlined key="edit"/>
                        </Card.Grid>
                    </Card>
                </Col>
                <Col className="gutter-row" span={6}>
                    <Card title="Admin">
                        <Card.Grid style={gridStyle}>
                            <UserDeleteOutlined/>
                            <EditOutlined key="edit"/>
                        </Card.Grid>
                    </Card>
                </Col>
            </Row>
        </Spin>
    );
};

export default Users;

import React from 'react';
import {Col, Row} from "antd";
import TL from "./Timeline";
import Header from "../../component/Header";
import Content from "./Content";
import AddResponse from "./AddResponse";

const View = () => {


    return (
        <>
            <Header path={["Question"]}/>
            <div className="site-layout-background" style={{padding: 24, minHeight: 360}}>
                <Row gutter={[16, 16]}>
                    <Col span={4}>
                        {/* TODO */}
                        {/*<TL/>*/}
                    </Col>
                    <Col span={16}>
                        <Content/>
                        <AddResponse/>
                    </Col>
                </Row>
            </div>
        </>
    );
};

export default View;

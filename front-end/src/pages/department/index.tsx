import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {IDepartment, IResponse, ISubject} from "../../static/interfaces";
import {department_get_one} from "../../api/department.api";
import {Breadcrumb, Col, Collapse, Divider, Row, Typography} from "antd";
import SubjectsList from "./SubjectsList";
import TeachersList from "./TeachersList";
import Highlights from "./Highlights";


const Index = () => {
    const {id} = useParams();
    const [department,setDepartment] = useState<IDepartment | undefined>(undefined);

    useEffect(() => {
        const fetchDepartment = async () => {
            const {status,data,message,success,error} : IResponse = await department_get_one(id);
            if(success)
                setDepartment(data);
            else
                setDepartment(undefined);
        }
        fetchDepartment();
    }, [id]);

    return (
        <>
            <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>Departments</Breadcrumb.Item>
                <Breadcrumb.Item>{department?.name}</Breadcrumb.Item>
            </Breadcrumb>
            <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                <Divider orientation="left" orientationMargin={20}> Description</Divider>
                {department?.description}
                <Row gutter={[16, 24]}>
                    <Col className="gutter-row" span={8}>
                        <Divider orientation={"left"} orientationMargin={20}>Highlights</Divider>
                        <div>
                            <Highlights/>
                        </div>
                    </Col>
                    <Col className="gutter-row" span={8}>
                        <TeachersList/>
                    </Col>
                    <Col className="gutter-row" span={8}>
                        <SubjectsList/>
                    </Col>

                </Row>
            </div>

        </>
    );
};

export default Index;

import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {IDepartment, IResponse, ISubject} from "../../static/interfaces";
import {department_get_one} from "../../api/department.api";
import {Breadcrumb, Col, Collapse, Divider, Row, Typography} from "antd";
import {subject_get_all_by_department} from "../../api/subject.api";
import _ from "lodash";

const { Text } = Typography;

const Index = () => {
    const {id} = useParams();
    const [department,setDepartment] = useState<IDepartment | undefined>(undefined);
    const [subjects, setSubjects] = useState<ISubject[]>([]);

    useEffect(() => {
        const fetchDepartment = async () => {
            const {status,data,message,success,error} : IResponse = await department_get_one(id);
            if(success)
                setDepartment(data);
            else
                setDepartment(undefined);
        }
        const fetchSubjects = async () => {
            const {status,data,message,success,error} : IResponse = await subject_get_all_by_department(id);
            if(success)
                setSubjects(data);
            else
                setSubjects([]);
        }
        fetchDepartment();
        fetchSubjects();
    }, [id]);

    const genExtra = (semester:number) => (
        <div
            onClick={event => {
                // If you don't want click extra trigger collapse, you can prevent this:
                event.stopPropagation();
            }}>
            {semester}
        </div>
    );

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
                    <Col className="gutter-row" span={17}>
                        <Divider orientation={"left"} orientationMargin={20}>Highlights</Divider>
                        <div>
                            TODO
                        </div>
                    </Col>
                    <Col className="gutter-row" span={7}>
                        <Divider orientation="left" orientationMargin={20}>Subjects</Divider>

                        <Collapse
                            defaultActiveKey={['0']}
                            expandIconPosition={"end"}
                            ghost
                        >
                            {

                            }
                            {
                                _.sortBy(subjects,["semester","credits"] ).map((el,index) =>
                                    <Collapse.Panel header={el.name}  key={index} extra={genExtra(el.semester)}>
                                        <Text disabled>{el.credits} Credits </Text>
                                        <div> {el.description} </div>
                                    </Collapse.Panel>
                                )
                            }

                        </Collapse>

                    </Col>

                </Row>
            </div>

        </>
    );
};

export default Index;

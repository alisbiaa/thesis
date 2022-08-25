import React, {useEffect, useState} from 'react';
import {Col, Form, Input, PageHeader, Row, Spin} from "antd";
import Header from "../../component/Header";
import {IResponse, IUser} from "../../static/interfaces";
import {get_all_users} from "../../api/user.api";
import User from "./User";
import _ from "lodash";

const Users = () => {
    const [users, setUsers] = useState<IUser[]>([]);
    useEffect(() => {
        const fetchData = async () => {
            const {status,data,message,success,error} : IResponse = await get_all_users();
            if(success)
                setUsers(data);
            else
                setUsers([]);
        }
        fetchData();
    }, []);

    const [filter, setFilter] = useState<string>('');

    const filterData  = () : IUser[] => {
        if(filter === '') return users;
        const regex = new RegExp(`.*${filter}.*`,'i')
        return _.filter(users, user => {
            return regex.test(user.email) || regex.test(user.name)
        });
    }

    const filtered = filterData();



    return (
        <Spin spinning={false}>
            <Header path={['Admin', 'Users']}/>
            <Row>
                <Col span={8} offset={8}>
                    <Form.Item name="filter" label="Search">
                        <Input value={filter} onChange={e => setFilter(e.target.value)}/>
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={16}>
                <Col className="gutter-row" span={6}>
                    <PageHeader
                        className="site-page-header"
                        title="Student"
                    />
                    {
                        filtered.filter(user => user.role === "RO").map(user =>
                            <User key={user.email} user={user}/>
                        )
                    }

                </Col>
                <Col className="gutter-row" span={6}>
                    <PageHeader
                        className="site-page-header"
                        title="Student"
                    />
                    {
                        filtered.filter(user => user.role === "student").map(user =>
                            <User key={user.email} user={user}/>
                        )
                    }
                </Col>
                <Col className="gutter-row" span={6}>
                    <PageHeader
                        className="site-page-header"
                        title="Teachers"
                    />
                    {
                        filtered.filter(user => user.role === "teacher").map(user =>
                            <User key={user.email} user={user}/>
                        )
                    }
                </Col>
                <Col className="gutter-row" span={6}>
                    <PageHeader
                        className="site-page-header"
                        title="Admin"
                    />
                    {
                        filtered.filter(user => user.role === "admin").map(user =>
                            <User key={user.email} user={user}/>
                        )
                    }
                </Col>
            </Row>
        </Spin>
    );
};

export default Users;

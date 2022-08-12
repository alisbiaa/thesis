import Header from "../../component/Header";
import {Space, Table, TablePaginationConfig} from 'antd';
import React, {useEffect, useState} from 'react';
import {ColumnsType} from "antd/es/table";
import {IQuestion} from "../../static/interfaces";
import Subject from "./Subject";
import {subject_get_all} from "../../api/subject.api";
import _ from "lodash";
import {question_get_all} from "../../api/question.api";
import User from "../../component/User";
import {LinkOutlined} from "@ant-design/icons";
import {useNavigate} from "react-router-dom";


const Search = () => {
    const [data, setData] = useState<IQuestion[]>([]);
    const [subjects, setSubjects] = useState([]);
    const [loading, setLoading] = useState<boolean>(false);
    let navigate = useNavigate();

    const [pagination, setPagination] = useState<TablePaginationConfig>({
        current: 1,
        pageSize: 10,
        total : 200, // TODO : you should read it from server
    });

    useEffect(() => {
        const fetchData = async () => {
            const {data, message, success} = await subject_get_all();
            if(success)
                setSubjects(data.map((el: any) => _.pick(el, ['_id', 'name'])));
        }
        fetchData().finally(async () => {
            const {data, message, success} = await question_get_all();
            if(success)
                setData(data);
        });
    }, []);


    const columns : ColumnsType<IQuestion> = [
        {
            title: 'Name',
            dataIndex: 'user',
            sorter: true,
            render: (email) => <User email={email}/>,
        },
        {
            title: 'Email',
            dataIndex: 'user',
            sorter: true,
        },
        {
            title: 'TS',
            dataIndex: 'createdAt',
            render: (ts) => `${ts.split('T')[0]} ${ts.split('T')[1].split('.')[0]}`,
            sorter: true,
            width: '20%',
        },
        {
            title: 'Subject',
            dataIndex: 'subject_id',
            // todo
            filters: subjects.map((el:any) => {
                return {text : el.name , value : el._id }
            }),
            // @ts-ignore
            onFilter : (value, record) => record.subject_id.indexOf(value) === 0,
            render: id => <Subject subject_id={id}/>,
            width: '20%',
        },
    ];


    return (
        <div>
            <Header path={["Search"]}/>
            <Table
                columns={columns}
                rowKey={(record,i) => i??0}
                dataSource={data}
                pagination={pagination}
                loading={loading}
                onChange={(pagination, filters, sorter) => {
                    setPagination({...pagination});
                    // TODO : include filter and pagination to fet data
                }}
                expandable={{
                    expandedRowRender: (record: any) => {
                        return (
                            <Space size={"middle"}>
                                <LinkOutlined
                                    style={{color:"blue", cursor:"pointer"}}
                                    onClick={()=>navigate(`/view/${record._id}`)}
                                />
                                <span>{record.content}</span>
                            </Space>
                        )
                    },
                }}
            />
        </div>
    );
};

export default Search;





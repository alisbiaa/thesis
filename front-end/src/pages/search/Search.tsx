import Header from "../../component/Header";
import {Space, Table, TablePaginationConfig, Tag} from 'antd';
import React, {useEffect, useState} from 'react';
import {ColumnsType} from "antd/es/table";
import {IQuestion} from "../../static/interfaces";
import Subject from "../../component/Subject";
import {subject_get_all} from "../../api/subject.api";
import _ from "lodash";
import {question_get_all} from "../../api/question.api";
import User from "../../component/User";
import {CheckCircleOutlined, ExclamationCircleOutlined, InboxOutlined, LinkOutlined} from "@ant-design/icons";
import {useNavigate} from "react-router-dom";

type filterType = {
    hidden: true | undefined ;
    approved: true | undefined ;
    important: true | undefined ;
    subject_id: string | undefined ;
}

const Search = () => {
    const [questions, setQuestions] = useState<IQuestion[]>([]);
    const [subjects, setSubjects] = useState([]);
    const [loading, setLoading] = useState<boolean>(true);
    let navigate = useNavigate();

    const [pagination, setPagination] = useState<TablePaginationConfig>({
        current: 1,
        pageSize: 10,
        total : 0, // TODO : you should read it from server
    });

    // TODO
    const [filters, setFilter] = useState<filterType>({
        hidden: undefined,
        approved: undefined,
        important: undefined,
        subject_id: undefined
    });


    useEffect(() => {
        const fetchData = async () => {
            const {data, message, success} = await subject_get_all();
            if(success)
                setSubjects(data.map((el: any) => _.pick(el, ['_id', 'name'])));
            else
                setSubjects([]);
        }
        fetchData().finally(async () => {
            const {data, totalCount, success} = await question_get_all();
            if(success){
                setQuestions(data);
                setPagination({...pagination, total: totalCount});
            }
            else {
                setQuestions([]);
                setPagination({...pagination, total: 0});
            }
            setLoading(false);
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
            filters: subjects.map((el:any) => {
                return {text : el.name , value : el._id }
            }),
            // onFilter : (value, record) => record.subject_id.indexOf(value) === 0,
            render: id => <Subject subject_id={id}/>,
            width: '20%',
        },
        {
            title: 'Tags',
            key: 'tags',
            dataIndex: 'tags',
            render: (_, record) =>
                <Space>
                    {
                        record.hidden ?
                            <Tag color={'default'} icon={<InboxOutlined/>}>
                                {'archived'.toUpperCase()}
                            </Tag> :
                            null
                    }
                    {
                        record.solved ?
                            <Tag color={'success'} icon={<CheckCircleOutlined/>}>
                                {'solved'.toUpperCase()}
                            </Tag> :
                            null
                    }
                    {
                        record.important ?
                            <Tag color={'warning'} icon={<ExclamationCircleOutlined/>}>
                                {'important'.toUpperCase()}
                            </Tag> :
                            null
                    }
                </Space>
            ,
            filters : [
                {text : "Archived" , value: "archived"},
                {text : "Solved" , value: "solved"},
                {text : "Important" , value: "important"}
            ],
            width: '20%',
        },
    ];

    return (
        <div>
            <Header path={["Search"]}/>
            <Table
                columns={columns}
                rowKey={(record,i) => i??0}
                dataSource={questions}
                pagination={pagination}
                loading={loading}
                onChange={(pagination, filters, sorter) => {
                    setPagination({...pagination});
                    // TODO : include filter and pagination to fet data
                    // console.log(filters);
                }}
                expandable={{
                    expandedRowRender: (record: any) => {
                        return (
                            <Space size={"middle"}>
                                <LinkOutlined
                                    style={{color:"blue", cursor:"pointer"}}
                                    onClick={()=>navigate(`/question/${record._id}`)}
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





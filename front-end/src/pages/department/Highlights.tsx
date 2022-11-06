import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {IQuestion} from "../../static/interfaces";
import {question_get_all} from "../../api/question.api";
import {Space, Table, TablePaginationConfig} from "antd";
import {ColumnsType} from "antd/es/table";
import { LinkOutlined} from "@ant-design/icons";


const Highlights = () => {
    const {id} = useParams();
    let navigate = useNavigate();

    const [questions, setQuestions] = useState<IQuestion[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const [pagination, setPagination] = useState<TablePaginationConfig>({
        current: 1,
        pageSize: 10,
        total : 0, // TODO : you should read it from server
    });

    useEffect(() => {
        const fetchData = async () => {
            const {data, totalCount, success} = await question_get_all({department_id : id, important : true});
            if(success){
                setQuestions(data);
                setPagination({...pagination, total: totalCount});
            }
            else {
                setQuestions([]);
                setPagination({...pagination, total: 0});
            }
            setLoading(false);
        }
        fetchData();
    }, [id]);

    const columns : ColumnsType<IQuestion> = [

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
        },
    ];


    return (
        <div>
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

export default Highlights;
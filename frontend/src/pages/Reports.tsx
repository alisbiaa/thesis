import React, {useEffect, useState} from 'react';
import Header from "../component/Header";
import {Space, Table, TablePaginationConfig} from "antd";
import {ColumnsType} from "antd/es/table";
import {IQuestion} from "../static/interfaces";
import {LinkOutlined} from "@ant-design/icons";
import {useNavigate} from "react-router-dom";
import {subject_get_all} from "../api/subject.api";

const Reports = () => {

    let navigate = useNavigate();
    const [loading, setLoading] = useState<boolean>(false);
    const [pagination, setPagination] = useState<TablePaginationConfig>({
        current: 1,
        pageSize: 5,
        total : 0,
    });

    const [reports, setReports] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const {data, message, success} = await subject_get_all();
            if(success)
                setReports(data);
            else
                setReports([]);
        }
        fetchData().finally(async () => {
            setLoading(false);
        });
    }, []);

    const columns: ColumnsType<IQuestion> = [];

    return (
        <div>
            <Header path={["Reports"]}/>
            <Table
                columns={columns}
                rowKey={(record,i) => i??0}
                dataSource={reports}
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
                                    // onClick={()=>navigate(`/question/${record._id}`)}
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

export default Reports;
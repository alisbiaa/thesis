import React, {useEffect, useState} from 'react';
import {Form, Select} from "antd";
import {IDepartment, IResponse} from "../../static/interfaces";
import {department_get_all} from "../../api/department.api";

const { Option } = Select;

type propType = {
    setDepartmentId: any;
}
const Departments = ({setDepartmentId}:propType) => {
    const [departments, setDepartments] = useState<IDepartment[]>([]);
    useEffect(() => {
        const fetchData = async () => {
            const {status,data,message,success,error} : IResponse = await department_get_all();
            if(success)
                setDepartments(data);
            else
                setDepartments([]);
        }
        fetchData();
    }, []);

    return (
        <Form.Item
            name="department_id"
            label="Subject"
            hasFeedback
            rules={[{required: true, message: 'Please select the department!'}]}
        >
            <Select
                placeholder="Please select a department"
                onChange={e => setDepartmentId(e)}
            >
                {
                    departments.map(el =>
                        <Option key={el._id}>{el.name}</Option>
                    )
                }
            </Select>
        </Form.Item>
    );
};

export default Departments;

import React, {useEffect, useState} from 'react';
import {Form, Select} from "antd";
import {IResponse, ISubject} from "../../static/interfaces";
import {subject_get_all} from "../../api/subject.api";

const { Option } = Select;

type propType = {
    department_id: string | null;
}
const Subjects = ({ department_id}: propType) => {
    const [subjects, setSubjects] = useState<ISubject[]>([]);
    const form = Form.useFormInstance();

    useEffect(() => {
        form.setFieldsValue({subject: undefined});
        if (!department_id) return;
        const fetchData = async () => {
            const {status,data,message,success,error} : IResponse = await subject_get_all(department_id);
            if(success)
                setSubjects(data);
            else
                setSubjects([]);
        }
        fetchData();
    }, [department_id]);

    return (
        <Form.Item
            name="subject_id"
            label="Subject"
            hasFeedback
            rules={[{required: true, message: 'Please select a subject!'}]}

        >
            <Select
                placeholder="Please select a subject"
            >
                {
                    subjects.map(el =>
                        <Option key={el._id}>{el.name}</Option>
                    )
                }
            </Select>
        </Form.Item>
    );
};

export default Subjects;

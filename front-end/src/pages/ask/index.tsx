import React, { useState} from 'react';
import Header from "../../component/Header";

import {Button, Form, Input} from 'antd';
import {useMsal} from "@azure/msal-react";
import Departments from "./Departments";
import Subjects from "./Subjects";
import TODO from "./TODO";
import {question_create} from "../../api/question.api";
import {openNotification} from "../../static/functions";

const { TextArea } = Input;

const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
};

const Ask = () => {

    const { accounts } = useMsal();
    const account = accounts[0];
    const email = account.username ?? "";

    const [department_id, setDepartmentId] = useState<string|null>(null);

    const onFinish = async (values: any) => {
        // console.log('Received values of form: ', values);
        const {message, status, success, data, error} = await question_create(values);
        openNotification({
            message: "Posting a question",
            description: message + JSON.stringify(error),
            type: success ? "success" : "error",
        })
    };

    return (
        <div>
            <Header path={["Ask a question"]}/>
            <Form
                name="validate_other"
                {...formItemLayout}
                onFinish={onFinish}

            >
                <Form.Item label="Username" name={"user"} initialValue={email}>
                    <span className="ant-form-text">{email}</span>
                </Form.Item>

                <Departments setDepartmentId={setDepartmentId}/>
                <Subjects department_id={department_id} />

                <Form.Item
                    label="Content"
                    name="content"
                    hasFeedback
                    rules={[{required: true, message: 'Please write your query!'}]}
                >
                    <TextArea rows={4}/>
                </Form.Item>

                <TODO/>

                <Form.Item wrapperCol={{span: 12, offset: 6}}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default Ask;

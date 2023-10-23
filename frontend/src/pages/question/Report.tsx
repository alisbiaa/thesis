import {Button, Form, Input, Modal, Tooltip} from 'antd';
import React, { useState } from 'react';
import {CopyOutlined, ExclamationCircleOutlined} from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";
import {useNavigate} from "react-router-dom";
import {useMsal} from "@azure/msal-react";


const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 20 },
};

type propType = {
    reported: string; // email
};
const Report = ({reported} : propType) => {
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };
    const onFinish = async (values: any) => {
        console.log('Received values of form: ', values);
    }

    const { accounts } = useMsal();
    const account = accounts[0];
    const email = account.username ?? "";

    return (
        <>
            <Tooltip title={"Report"}>
                <ExclamationCircleOutlined style={{fontSize: "120%", color: "red", cursor: "pointer"}} onClick={showModal}/>
            </Tooltip>
            <Modal title="Report form" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} footer={null}>
                <Form
                    name={"report_form"}
                    onFinish={onFinish}
                    {...formItemLayout}
                >
                    <Form.Item label="Reporter" name={"reporter"} initialValue={email}>
                        <Input defaultValue={email} readOnly />
                    </Form.Item>
                    <Form.Item label="Reported" name={"reported"} initialValue={reported}>
                            <Input defaultValue={reported} readOnly/>
                    </Form.Item>
                    <Form.Item
                        label="Content"
                        name="content"
                        hasFeedback
                        rules={[{required: true, message: 'Please write your query!'}]}
                    >
                        <TextArea rows={4}/>
                    </Form.Item>
                    <Form.Item wrapperCol={{span: 12, offset: 6}}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default Report;
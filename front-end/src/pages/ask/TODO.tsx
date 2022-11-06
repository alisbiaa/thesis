import React from 'react';
import {Button, Form, Select, Switch, Upload} from "antd";
import {InfoCircleOutlined, UploadOutlined} from "@ant-design/icons";

const { Option } = Select;



const TODO = () => {
    return (
        <>
            <Form.Item
                name="tags"
                label="Tags"
                tooltip={{
                    title: 'This is going to be used for filtering, make sure the tags are accurate',
                    icon: <InfoCircleOutlined/>
                }}
                requiredMark={"optional"}
                // rules={[{ required: true, message: 'Please select your favourite colors!', type: 'array' }]}
            >
                <Select mode="multiple" placeholder="Please select favourite colors">
                    <Option value="red">Red</Option>
                    <Option value="green">Green</Option>
                    <Option value="blue">Blue</Option>
                </Select>
            </Form.Item>

            <Form.Item name="switch" label="Important" valuePropName="checked">
                <Switch/>
            </Form.Item>



        </>
    );
};

export default TODO;

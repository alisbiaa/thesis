import React from 'react';
import {Button, Form, Select, Switch, Upload} from "antd";
import {InfoCircleOutlined, UploadOutlined} from "@ant-design/icons";

const { Option } = Select;

const normFile = (e: any) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
        return e;
    }
    return e?.fileList;
};

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


            <Form.Item
                name="upload"
                label="Upload"
                valuePropName="fileList"
                getValueFromEvent={normFile}
                tooltip={{title: 'Max size 3mb', icon: <InfoCircleOutlined/>}}
                extra="Max size 3mb"
                requiredMark={"optional"}
            >
                <Upload name="logo" action="/upload.do" listType="picture">
                    <Button icon={<UploadOutlined/>}>Click to upload</Button>
                </Upload>
            </Form.Item>
        </>
    );
};

export default TODO;

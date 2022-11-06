import React from 'react';
import {InfoCircleOutlined, UploadOutlined} from "@ant-design/icons";
import {message, Button, Form, Upload, UploadProps} from "antd";
import type { RcFile } from 'antd/es/upload/interface';


type propType = {
    setFile : any;
}

const Attachment = ({setFile}: propType) => {
    const customUpload = async ({ onError, onSuccess, file }: any) => {
        if (!file) {
            alert("Please upload an image first!");
            onError("No file found.");
        }
        else {
            setFile(file);
            onSuccess("Ok");
        }
    }

    const customRemove = (file : any) =>{
        if (!file) {
            alert("Please upload a file first!");
        } else {
            setFile("");
        }
    }

    const beforeUpload = (file: RcFile) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('You can only upload JPG/PNG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 3;
        if (!isLt2M) {
            message.error('Image must smaller than 3MB!');
        }
        return isJpgOrPng && isLt2M;
    };

    const props: UploadProps = {
        customRequest : customUpload,
        onChange({ file, fileList }) {
            if (file.status !== 'uploading') {
                // console.log(file, fileList);
            }
        },
        onRemove : customRemove,
        beforeUpload: beforeUpload,
        maxCount : 1,

    };

    return (
        <Form.Item
            name="upload"
            label="Upload"
            // valuePropName="fileList"
            // getValueFromEvent={normFile}
            tooltip={{title: 'Max size 3mb', icon: <InfoCircleOutlined/>}}
            extra="Max size 3mb"
            requiredMark={"optional"}
        >
            <Upload {...props}>
                <Button icon={<UploadOutlined/>}>Click to upload</Button>
            </Upload>
        </Form.Item>
    );
};

export default Attachment;
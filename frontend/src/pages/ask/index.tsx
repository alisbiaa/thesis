import React, { useState} from 'react';
import Header from "../../component/Header";
import {getDownloadURL, getStorage, ref, uploadBytes} from "firebase/storage";

import {Button, Form, Input, notification, Spin} from 'antd';
import {useMsal} from "@azure/msal-react";
import Departments from "./Departments";
import Subjects from "./Subjects";
import {question_create} from "../../api/question.api";
import {useNavigate} from "react-router-dom";
import Attachment from "./Attachment";
import firebaseApp from "../../config/firebase";

const { TextArea } = Input;

const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
};

const storage = getStorage(firebaseApp);

const Ask = () => {
    const navigate = useNavigate();
    const { accounts } = useMsal();
    const account = accounts[0];
    const email = account.username ?? "";

    const [department_id, setDepartmentId] = useState<string|null>(null);

    const [file, setFile] = useState<any>('');

    const [loading, setLoading] = useState<boolean>(false);

    const onFinish = async (values: any) => {

        // TODO firebase
        if (file) {
            setLoading(true);
            const storageRef = ref(storage, `/${email}/${file.name}`);
            const newMetadata = {
                contentType: file.type ?? "UNKNOWN",
                customMetadata : {
                    user : email,
                }
            };
            // uploadFile(storageRef, file, newMetadata);
            await uploadBytes(storageRef,file,newMetadata)
                .then(result=> {
                    getDownloadURL(result.ref).then(url => {
                        setLoading(false);
                        question_create({...values, attachment: url})
                            .then(({message, status, success, data, error}) => {
                                notification.open({
                                    message: "Posting a question",
                                    description: message + `${error ? JSON.stringify(error) : ""}`,
                                    type: success ? "success" : "error",
                                    onClose: () => navigate(`/question/${data._id}`),
                                });
                            });
                    });
                })
                .catch(err => {
                    setLoading(false);
                    notification.open({
                        message : "Attachment",
                        description :  err,
                        type :  "error",
                    });
                })
        }
        else {
            const {message, status, success, data, error} = await question_create(values);

            notification.open({
                message: "Posting a question",
                description: message + JSON.stringify(error),
                type: success ? "success" : "error",
                onClose: () => navigate(`/question/${data._id}`),
            });
        }


    };

    return (
        <Spin spinning={loading}>
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

                {/*<TODO/>*/}

                <Attachment setFile={setFile}/>

                <Form.Item wrapperCol={{span: 12, offset: 6}}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </Spin>
    );
};

export default Ask;

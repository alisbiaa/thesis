import {Button, Form, Input} from 'antd';
import React, {useEffect, useState} from 'react';
import {IQuestion, IResponse} from "../../static/interfaces";
import {response_create} from "../../api/response.api";
import { useParams} from "react-router-dom";
import {useMsal} from "@azure/msal-react";
import {openNotification} from "../../static/functions";
import {question_get_one} from "../../api/question.api";

const { TextArea } = Input;
const AddResponse = () => {
    const {id} = useParams();

    const { accounts } = useMsal();
    const account = accounts[0];
    const email = account.username ?? "";

    const [value, setValue] = useState('');

    const [question, setQuestion] = useState<IQuestion | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            const {message, success, error, data} = await question_get_one(id);
            if (success) {
                setQuestion(data);
            } else
                setQuestion(null);
        }
        fetchData();
    }, [id]);



    const onSubmit = async () => {
        const {success,message,status, error, data}: IResponse = await response_create({
            question_id : id,
            user : email,
            content : value,
        });

        if (success) {
            openNotification({
                message: "Post comment",
                description: message,
                type: "success"
            });
            setTimeout(() => {
                window.location.reload();
            }, 1500);
        } else
            openNotification({
                message: "Post comment",
                description: message + JSON.stringify(error),
                type: "error"
            });
    }

    return (
        <>
            <Form.Item>
                <TextArea disabled={question?.solved} rows={4} onChange={e => setValue(e.target.value)} value={value} />
            </Form.Item>
            <Form.Item>
                <Button
                    disabled={question?.solved}
                    htmlType="submit"
                    // loading={submitting}
                    onClick={onSubmit}
                    type="primary"
                >
                    Add Comment
                </Button>
            </Form.Item>
        </>
    );
};

export default AddResponse;

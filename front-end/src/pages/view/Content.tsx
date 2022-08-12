import { Spin} from 'antd';
import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {IQuestion} from "../../static/interfaces";
import {question_get_one} from "../../api/question.api";
import CommentThread from "./CommentThread";
import {timeParser} from "../../static/functions";

const Content = () => {
    const {id} = useParams();
    let navigate = useNavigate();

    const [loading, setLoading] = useState<boolean>(true);
    const [question, setQuestion] = useState<IQuestion | null>(null);

    useEffect(() => {
        setLoading(true);
        const fetchData = async () => {
            const {message, success, error, data} = await question_get_one(id);
            if (success) {
                setQuestion(data);
                setLoading(false);
            } else
                setQuestion(null);
        }
        fetchData();
    }, [id]);


    return (
        <Spin spinning={loading}>

            <CommentThread
                author={question?.user || ""}
                content={<p>{question?.content}</p>}
                createdAt={timeParser(question?.createdAt)|| ""}
            >
                {
                    question?.answers.map(el =>
                        <CommentThread
                            key={el._id}
                            author={el?.user || ""}
                            content={<p>{el?.content}</p>}
                            createdAt={timeParser(el?.createdAt) || ""}
                        />
                    )
                }
            </CommentThread>

        </Spin>

    );
};



export default Content;

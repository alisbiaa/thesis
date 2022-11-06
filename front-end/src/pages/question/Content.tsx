import {Spin} from 'antd';
import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {IQuestion} from "../../static/interfaces";
import {question_get_one} from "../../api/question.api";
import CommentThread from "./CommentThread";
import QuestionThread from "./QuestionThread";

const Content = () => {
    const {id} = useParams();

    const [loading, setLoading] = useState<boolean>(true);
    const [question, setQuestion] = useState<IQuestion | null>(null);

    useEffect(() => {
        setLoading(true);
        const fetchData = async () => {
            const {success, data} = await question_get_one(id);
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
            <QuestionThread
                question={question}
            >
                {
                    question?.answers.map(el =>
                        <CommentThread
                            key={el._id}
                            answer={el}
                        />
                    )
                }
            </QuestionThread>
        </Spin>
    );
};



export default Content;

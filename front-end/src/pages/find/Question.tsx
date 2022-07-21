import React, {useEffect, useState} from 'react';
import {ArchiveFill, BookmarkCheckFill, FlagFill} from "react-bootstrap-icons";
import {IQuestion, IResponse, ISubject, ITeacher} from "../../utils/interfaces";
import {Card} from "react-bootstrap";
import {question_get_one, subject_get_one, teacher_get_one} from "../../utils/apis";
import {Link} from "react-router-dom";

type propTypes = {
    id: string;
}

const Question = ({id}:propTypes) => {
    const [question, setQuestion] = useState<IQuestion | undefined>(undefined);
    const [subject, setSubject] = useState<ISubject | undefined>(undefined);
    const [user, setUser] = useState<ITeacher | undefined>(undefined);

    const fetchQuestion = async () => {
        const {status,data,message,success,error} : IResponse = await question_get_one(id);
        if(success)
            setQuestion(data);
        else
            alert(message);
    }

    const fetchUser = async () => {
        if(!question) return;
        const {status,data,message,success,error} : IResponse = await teacher_get_one(question.user);
        if(success)
            setUser(data);
        else
            alert(message);
    }

    const fetchSubject = async () => {
        if(!question) return;
        const {status,data,message,success,error} : IResponse = await subject_get_one(question.subject_id);
        if(success)
            setSubject(data);
        else
            alert(message);
    }

    useEffect(() => {
        fetchQuestion()
    }, [id]);

    useEffect(() => {
        fetchSubject();
        fetchUser();
    }, [question]);



    return (
        <Card className="border-0">
            <Card.Body>
                <Card.Title>
                    {subject?.name ?? ""}
                    <h6 className="float-end text-muted">
                        2022/24/04 3:31 PM
                    </h6>
                </Card.Title>
                <Card.Subtitle>
                    <div className={"float-end"}>
                        <FlagFill color={"red"}/>
                        <BookmarkCheckFill color={"green"}/>
                        <ArchiveFill color={"grey"}/>
                    </div>
                </Card.Subtitle>

                <p className="card-text">
                    <Link
                        className={"text-decoration-none text-black"}
                        to={`/question/${question?._id}`}
                    >
                        {question?.content ?? ""}
                    </Link>
                </p>
                <a href="#" className="card-link text-decoration-none text-muted">
                    {user?.name} {user?.last_name} <p className={"float-end"}> {user?.email}</p>
                </a>
            </Card.Body>
        </Card>

    );
};

export default Question;

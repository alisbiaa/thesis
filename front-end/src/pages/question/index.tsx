import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {IQuestion, IResponse, ISubject, ITeacher} from "../../utils/interfaces";

const Index = () => {
    const {id} = useParams();

    const [question, setQuestion] = useState<IQuestion | undefined>(undefined);
    const [subject, setSubject] = useState<ISubject | undefined>(undefined);
    const [user, setUser] = useState<ITeacher | undefined>(undefined);
    //
    // const fetchQuestion = async () => {
    //     const {status,data,message,success,error} : IResponse = await question_get_one(id);
    //     if(success)
    //         setQuestion(data);
    //     else
    //         alert(message);
    // }
    //
    // const fetchUser = async () => {
    //     if(!question) return;
    //     const {status,data,message,success,error} : IResponse = await teacher_get_one(question.user);
    //     if(success)
    //         setUser(data);
    //     else
    //         alert(message);
    // }
    //
    // const fetchSubject = async () => {
    //     if(!question) return;
    //     const {status,data,message,success,error} : IResponse = await subject_get_one(question.subject_id);
    //     if(success)
    //         setSubject(data);
    //     else
    //         alert(message);
    // }

    useEffect(() => {
        // fetchQuestion()
    }, [id]);

    useEffect(() => {
        // fetchSubject();
        // fetchUser();
    }, [question]);

    return (
        <div>
            <div className="card">
                <div className="card-header">
                    <p className={"card-text"}> Department 1 {"-\>"} <small className="text-muted"> {subject?.name} </small> </p>
                </div>
                <div className="card-body border-0">
                    <h5 className="card-title">Ali Sbiaa Zayen</h5>
                    <p className="card-text float-end"><small className="text-muted">2021-10-20</small></p>
                    <p className="card-text">Question content : Some quick example text to build on the card title and make up the bulk
                        of the card's content.</p>
                </div>
                <hr/>
                <ul className="list-group list-group-flush border-0">
                    <li className="list-group-item">
                        <div className="card border-0">
                            <div className="card-body">
                                <h5 className="card-title">Student 1</h5>
                                <p className="card-text float-end"><small className="text-muted">2021-10-20</small></p>
                                <p className="card-text">With supporting text below as a natural lead-in to additional
                                    content.</p>
                            </div>
                        </div>
                    </li>
                    <li className="list-group-item">
                        <div className="card border-0">
                            <div className="card-body">
                                <h5 className="card-title">Student 2</h5>
                                <p className="card-text float-end"><small className="text-muted">2021-10-20</small></p>
                                <p className="card-text">With supporting text below as a natural lead-in to additional
                                    content.</p>
                            </div>
                        </div>
                    </li>
                    <li className="list-group-item">
                        <div className="card border-0">
                            <div className="card-body">
                                <h5 className="card-title">Student 3</h5>
                                <p className="card-text float-end"><small className="text-muted">2021-10-20</small></p>
                                <p className="card-text">With supporting text below as a natural lead-in to additional
                                    content.</p>
                            </div>
                        </div>
                    </li>
                    <li className="list-group-item">
                        <div className="card border-0 ">
                            <div className="mb-3">
                                <textarea className="form-control" placeholder={"Write your answer here"} rows={3} disabled></textarea>
                            </div>
                            <div className="card-footer bg-white">
                                <div className={"float-end"}>
                                    <a href="#" className="card-link text-decoration-none text-primary">Send</a>
                                </div>
                            </div>
                        </div>
                    </li>
                </ul>

                <div className="card-footer">
                    <div className={"float-end"}>
                        <a href="#" className="card-link">Hide</a>
                        <a href="#" className="card-link text-danger">Delete</a>
                    </div>
                </div>
            </div>


        </div>
    );
};

export default Index;

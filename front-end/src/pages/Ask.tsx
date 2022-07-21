import React, {useEffect, useState} from 'react';
import {Col, Row} from "react-bootstrap";
import Header from "../component/Header";
import {IResponse, ISubject, ITeacher} from "../utils/interfaces";
import {department_get_all, question_create, subject_create, subject_get_all} from "../utils/apis";
import {useNavigate} from "react-router-dom";

const Ask = () => {
    const navigate = useNavigate();

    const [departments, setDepartments] = useState<ITeacher[]>([]);
    const [subjects, setSubjects] = useState<ISubject[]>([]);

    const [department_id, setDepartment_id] = useState<string|null>(null);
    const [subject_id, setSubject_id] = useState<string|null>(null);
    const [content, setContent] = useState<string>("");

    // TODO : Set user using AD
    const [user, setUser] = useState<string>("alisbiaazayen@gmail.com");


    useEffect(() => {
        const fetchData = async () => {
            const {status,data,message,success,error} : IResponse = await department_get_all();
            if(success)
                setDepartments(data);
        }
        fetchData();
    }, []);

    useEffect(() => {
        if (!department_id) return;
        setSubject_id(null);
        const fetchData = async () => {
            const {status,data,message,success,error} : IResponse = await subject_get_all(department_id);
            if(success)
                setSubjects(data);
        }
        fetchData();

    }, [department_id]);

    const handleSubmit = () => {
        if(!department_id || !subject_id)
            return;
        const fetchData = async () => {
            const {status,data,message,success,error} : IResponse = await question_create({
                hidden: false,
                important: false,
                solved: false,
                department_id,content,user,subject_id});
            if(success){
                alert(message);
                console.log(data);
                // TODO : Navigate to the correct URL
                navigate(`/department/${department_id}`);
            } else {
                alert(message);
                console.log(error);
            }
        }
        fetchData();
    }

    return (
        <div>
            <Header title={"Ask a question"}/>
            <div className={"card"}>
                <div className={"card-body"}>
                    <Row>
                        <Col>
                            <label className="form-label">Department</label>
                            <select className="form-select mb-3" defaultValue={department_id ?? "default"}
                                    onChange={e => setDepartment_id(e.target.value)}>
                                <option value={"default"}>Select teacher</option>
                                {
                                    departments.map(department =>
                                        <option value={department._id} key={department._id}>{department.name}</option>
                                    )
                                }
                            </select>
                        </Col>
                        <Col>
                            <label className="form-label">Subject</label>
                            <select className="form-select mb-3" defaultValue={department_id ?? "default"}
                                    onChange={e => setSubject_id(e.target.value)}>
                                <option value={"default"}>Select subject</option>
                                {
                                    subjects.map(subject =>
                                        <option value={subject._id} key={subject._id}>{subject.name}</option>
                                    )
                                }
                            </select>
                        </Col>
                    </Row>

                    <div className="mb-3">
                        <label className="form-label">Email address</label>
                        <input
                            className="form-control"
                            type="text"
                            value={user}
                            readOnly
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Content</label>
                        <textarea
                            className="form-control"
                            rows={3}
                            value={content}
                            onChange={(e) =>  setContent(e.target.value)}
                        />

                    </div>
                    <button type="button" className="btn btn-outline-primary float-end" onClick={handleSubmit}>Publish</button>

                </div>
                <div className="card-footer text-muted">
                    Link to something
                </div>
            </div>
        </div>
    );
};

export default Ask;

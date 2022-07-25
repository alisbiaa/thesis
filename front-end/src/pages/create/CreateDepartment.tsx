import React, {useEffect, useState} from 'react';
import Header from "../../component/Header";
import {Col, Row} from "react-bootstrap";
import {IResponse, ITeacher} from "../../utils/interfaces";
import {useNavigate} from "react-router-dom";
import {department_create} from "../../api/department.api";

const CreateDepartment = () => {
    const navigate = useNavigate();

    const [description, setDescription] = useState<string>("");
    const [name, setName] = useState<string>("");


    const handleCreate = () => {
        const fetchData = async () => {
            const {status,data,message,success,error} : IResponse = await department_create({_id: "", name,description});
            if(success){
                alert(message);
                console.log(data);
                navigate(`/department/${data._id}`);
            } else {
                alert(message);
                console.log(error);
            }

        }
        fetchData();
    }

    return (
        <div>
            <Header title={"Create Department"}/>
            <div className="card">
                <div className="card-body">
                    <Row>
                        <Col>
                            <div className="mb-3">
                                <label className="form-label">Name</label>
                                <input type="text" className="form-control" value={name}
                                       onChange={e => setName(e.target.value)}/>
                            </div>
                        </Col>

                    </Row>
                    <Row>
                        <Col>
                            <div className="mb-3">
                                <label className="form-label">Description</label>
                                <textarea
                                    className="form-control"
                                    value={description}
                                    rows={3}
                                    onChange={e => setDescription(e.target.value)}
                                />
                            </div>
                        </Col>

                    </Row>

                    <button className="btn  btn-outline-dark float-end" onClick={handleCreate}>Create</button>
                </div>
                <div className="card-footer text-muted">
                    Link to something
                </div>
            </div>
        </div>
    );
};

export default CreateDepartment;

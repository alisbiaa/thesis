import React, {useEffect, useState} from 'react';
import Header from "../../component/Header";
import {IResponse, ITeacher} from "../../static/interfaces";
import {useNavigate} from "react-router-dom";
import {department_get_all} from "../../api/department.api";
import {subject_create} from "../../api/subject.api";

const CreateSubject = () => {
    const navigate = useNavigate();
    const [departments, setDepartments] = useState<ITeacher[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const {status,data,message,success,error} : IResponse = await department_get_all();
            if(success)
                setDepartments(data);
        }
        fetchData();
    }, []);

    const [description, setDescription] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [department_id, setDepartment_id] = useState<string>("");

    const handleCreate = () => {
        const fetchData = async () => {
            const {status,data,message,success,error} : IResponse = await subject_create(name,department_id,description);
            if(success){
                alert(message);
                console.log(data);
                // navigate(`/department/${department_id}`);
            } else {
                alert(message);
                console.log(error);
            }

        }
        fetchData();
    }

    return (
        <div>
            <Header title={"Create Subject"} />
            <div className="card">
                <div className="card-body">
                    {/*<Row>*/}
                    {/*    <Col>*/}
                    {/*        <div className="mb-3">*/}
                    {/*            <label className="form-label">Name</label>*/}
                    {/*            <input type="text" className="form-control" value={name}*/}
                    {/*                   onChange={e => setName(e.target.value)}/>*/}
                    {/*        </div>*/}
                    {/*    </Col>*/}
                    {/*    <Col>*/}
                    {/*        <div className="mb-3">*/}
                    {/*            <label className="form-label">Department</label>*/}
                    {/*            <select className="form-select mb-3" defaultValue={department_id} onChange={e => setDepartment_id(e.target.value)}>*/}
                    {/*                <option value={"1"}>Select department</option>*/}
                    {/*                {*/}
                    {/*                    departments.map(department =>*/}
                    {/*                        <option value={department._id} key={department._id}>{department.name}</option>*/}
                    {/*                    )*/}
                    {/*                }*/}
                    {/*            </select>*/}

                    {/*        </div>*/}
                    {/*    </Col>*/}
                    {/*</Row>*/}
                    {/*<Row>*/}
                    {/*    <Col>*/}
                    {/*        <div className="mb-3">*/}
                    {/*            <label className="form-label">Description</label>*/}
                    {/*            <textarea*/}
                    {/*                className="form-control"*/}
                    {/*                value={description}*/}
                    {/*                rows={3}*/}
                    {/*                onChange={e => setDescription(e.target.value)}*/}
                    {/*            />*/}
                    {/*        </div>*/}
                    {/*    </Col>*/}

                    {/*</Row>*/}

                    <button className="btn  btn-outline-dark float-end" onClick={handleCreate}>Create</button>
                </div>
                <div className="card-footer text-muted">
                    Link to something
                </div>
            </div>

        </div>
    );
};

export default CreateSubject;

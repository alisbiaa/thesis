import React, {useEffect, useState} from 'react';
import Header from "../../component/Header";
import {IDepartment, IResponse} from "../../static/interfaces";
import { useNavigate } from "react-router-dom";
import {department_get_all} from "../../api/department.api";

const CreateTeacher = () => {
    const navigate = useNavigate();
    const [departments,setDepartments] = useState<IDepartment[]>([]);
    useEffect(() => {
        const fetchData = async () => {
            const {status,data,message,success,error} : IResponse = await department_get_all();
            if(success)
                setDepartments(data);
        }
        fetchData();
    }, []);

    const [email, setEmail] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [last_name, setLast_name] = useState<string>("");
    const [bio, setBio] = useState<string>("");
    const [department_id, setDepartment_id] = useState<string>("");

    const handleCreate= () => {
        // const fetchData = async () => {
        //     const {status,data,message,success,error} : IResponse = await teacher_create({
        //         name,
        //         department_id,
        //         email,
        //         bio,
        //         last_name,
        //         _id: "",
        //     });
        //     if(success){
        //         alert(message);
        //         console.log(data);
        //         navigate(`/`);
        //     } else {
        //         alert(message);
        //         console.log(error);
        //     }
        //
        // }
        // fetchData();
    }

    return (
        <div>
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
                    {/*            <label className="form-label">Last Name</label>*/}
                    {/*            <input type="text" className="form-control" value={last_name}*/}
                    {/*                   onChange={e => setLast_name(e.target.value)}/>*/}
                    {/*        </div>*/}
                    {/*    </Col>*/}
                    {/*</Row>*/}
                    {/*<Row>*/}
                    {/*    <Col>*/}
                    {/*        <div className="mb-3">*/}
                    {/*            <label className="form-label">Email address</label>*/}
                    {/*            <span className="form-text float-end">*/}
                    {/*                It should be the university email @elte.hu*/}
                    {/*            </span>*/}
                    {/*            <input type="email" className="form-control" value={email}*/}
                    {/*                   onChange={e => setEmail(e.target.value)}/>*/}

                    {/*        </div>*/}
                    {/*    </Col>*/}
                    {/*    <Col>*/}
                    {/*        <div className="mb-3">*/}
                    {/*            <label className="form-label">Bio</label>*/}
                    {/*            <input type="text" className="form-control" value={bio}*/}
                    {/*                   onChange={e => setBio(e.target.value)}/>*/}
                    {/*        </div>*/}
                    {/*    </Col>*/}
                    {/*</Row>*/}
                    {/*<Row>*/}
                    {/*    <Col>*/}
                    {/*        <label className="form-label">Department</label>*/}

                    {/*        <select className="form-select mb-3" defaultValue={department_id} onChange={e => setDepartment_id(e.target.value)}>*/}
                    {/*            <option value={"null"}>Select department</option>*/}
                    {/*            {*/}
                    {/*                departments.map(department =>*/}
                    {/*                    <option value={department._id} key={department._id}>{department.name}</option>*/}
                    {/*                )*/}
                    {/*            }*/}
                    {/*        </select>*/}
                    {/*    </Col>*/}
                    {/*    <Col>*/}

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

export default CreateTeacher;

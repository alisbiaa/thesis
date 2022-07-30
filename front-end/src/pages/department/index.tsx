import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import Header from "../../component/Header";
import {IDepartment, IResponse} from "../../static/interfaces";
import TeachersList from "./TeachersList";
import SubjectsList from "./SubjectsList";
import {department_get_one} from "../../api/department.api";

const Index = () => {
    const {id} = useParams();
    const [department,setDepartment] = useState<IDepartment | undefined>(undefined);

    useEffect(() => {
        const fetchData = async () => {
            const {status,data,message,success,error} : IResponse = await department_get_one(id);
            if(success)
                setDepartment(data);
            else
                setDepartment(undefined);
        }
        fetchData();
    }, [id]);

    return (
        <>
            <Header title={department?.name || ""}/>
            <div className="card">
                <div className="card-body">
                    <p className="card-text"><small className="text-muted">Description </small></p>
                    <p className="card-text"> {department?.description}</p>
                    <p className="card-text"><small className="text-muted">Teachers </small></p>
                    <TeachersList department_id={department?._id}/>
                    <SubjectsList />
                </div>
                <div className="card-footer text-muted">
                    Head department is...
                </div>
            </div>
        </>
    );
};

export default Index;

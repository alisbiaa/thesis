import React, {useEffect, useState} from 'react';
import {IResponse, ISubject} from "../../static/interfaces";
import {subject_get_all} from "../../api/subject.api";
import {useParams} from "react-router-dom";


const SubjectsList = () => {
    const {id} = useParams();

    const [subjects,setSubjects] = useState<ISubject[]>([]);
    useEffect(() => {
        const fetchData = async () => {
            const {status,data,message,success,error} : IResponse = await subject_get_all(id);
            if(success)
                setSubjects(data);
            else
                setSubjects([]);
        }
        fetchData();
    }, [id]);
    return (
        <div className="row">
            {
                subjects.map( subject =>
                    <div className="col-sm-6 p-1" key={subject._id}>
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">{subject.name}</h5>
                                <p className="card-text">{subject.description}</p>
                                <a className="nav-link" href="#">Find Questions</a>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    );
};

export default SubjectsList;

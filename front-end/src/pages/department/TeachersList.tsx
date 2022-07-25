import React, {useEffect, useState} from 'react';
import {IResponse, ITeacher} from "../../utils/interfaces";


type propTypes = {
    department_id: string | undefined;
}
const TeachersList = ({department_id}:propTypes) => {

    const [teachers, setTeachers] = useState<ITeacher[]>([]);
    useEffect(() => {
        const fetchData = async () => {
            if(!department_id) return;
            // const {status,data,message,success,error} : IResponse = await teacher_get_all_by_department(department_id);
            // if(success)
            //     setTeachers(data);
        }
        fetchData();
    }, [department_id]);

    return (
        <ul className="list-group list-group-flush">
            {
                teachers.map(teacher =>
                    <li className="list-group-item" key={teacher._id}>
                        <span>{teacher.name} {teacher.last_name}</span>
                        <small className="text-muted float-end">{teacher.email}</small>
                    </li>
                )
            }
        </ul>

    );
};

export default TeachersList;

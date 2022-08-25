import React, {useEffect, useState} from 'react';
import {IResponse, IUser} from "../../static/interfaces";
import {teacher_get_all_by_department} from "../../api/user.api";
import {useParams} from "react-router-dom";
import {Avatar, Divider, List} from "antd";


const TeachersList = () => {
    const {id} = useParams();
    const [teachers, setTeachers] = useState<IUser[]>([]);
    useEffect(() => {
        const fetchData = async () => {
            if(!id) return;
            const {status,data,message,success,error} : IResponse = await teacher_get_all_by_department(id);
            if(success)
                setTeachers(data);
            else
                setTeachers([]);
        }
        fetchData();
    }, [id]);

    return (
        <>
            <Divider orientation={"left"} orientationMargin={20}>Teachers</Divider>
            <List>
                {
                    teachers.map(teacher =>
                        <List.Item key={teacher.email} >
                            <List.Item.Meta
                                avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                                // TODO : change the href  ...
                                title={<a href="https://ant.design">{teacher.name}</a>}
                                description={teacher.email}
                            >
                            </List.Item.Meta>
                        </List.Item>
                    )
                }
            </List>
        </>

    );
};

export default TeachersList;

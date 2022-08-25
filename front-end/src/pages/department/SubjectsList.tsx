import React, {useEffect, useState} from 'react';
import {IResponse, ISubject} from "../../static/interfaces";
import {subject_get_all_by_department} from "../../api/subject.api";
import {useParams} from "react-router-dom";
import {Collapse, Divider, Typography} from "antd";
import _ from "lodash";

const { Text } = Typography;


const SubjectsList = () => {
    const {id} = useParams();
    const [subjects,setSubjects] = useState<ISubject[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const {status,data,message,success,error} : IResponse = await subject_get_all_by_department(id);
            if(success)
                setSubjects(data);
            else
                setSubjects([]);
        }
        fetchData();
    }, [id]);

    const genExtra = (semester:number) => (
        <div
            onClick={event => {
                // If you don't want click extra trigger collapse, you can prevent this:
                event.stopPropagation();
            }}>
            {semester}
        </div>
    );

    return (
        <>
            <Divider orientation="left" orientationMargin={20}>Subjects</Divider>
            <Collapse
                defaultActiveKey={['0']}
                expandIconPosition={"end"}
                ghost
            >
                {

                }
                {
                    _.sortBy(subjects,["semester","credits"] ).map((el,index) =>
                        <Collapse.Panel header={el.name}  key={index} extra={genExtra(el.semester)}>
                            <Text disabled>{el.credits} Credits </Text>
                            <div> {el.description} </div>
                        </Collapse.Panel>
                    )
                }

            </Collapse>
        </>
    );
};

export default SubjectsList;

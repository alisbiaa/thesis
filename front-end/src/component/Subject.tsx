import React, {useEffect, useState} from 'react';
import {IResponse, ISubject} from "../static/interfaces";
import {subject_get_one} from "../api/subject.api";

type propType = {
    subject_id: string;
}

const Subject = ({subject_id} : propType) => {

    const [subject, setSubject] = useState<ISubject | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            const {data,success}: IResponse = await subject_get_one(subject_id);
            if(success)
                setSubject(data);
            else
                setSubject(null);
         }
        fetchData();
    }, [subject_id]);
    return (
        <>
            {subject?.name ?? subject_id}
        </>
    );
};

export default Subject;

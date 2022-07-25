import React, {useEffect, useState} from 'react';
import Header from "../../component/Header";
import {Card} from "react-bootstrap";
import {IQuestion, IResponse} from "../../utils/interfaces";
import Filter from "./Filter";
import Pagination from "./Pagination";
import Question from "./Question";
import {question_get_all} from "../../api/question.api";

const Find = () => {
    const [allData, setAllData] = useState<IQuestion[]>([]);
    const [displayedData, setDisplayedData] = useState<IQuestion[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const {status,data,message,success,error} : IResponse = await question_get_all();
            if(success)
                setAllData(data);
            else
                alert(message);
        }
        fetchData();
    }, []);

    return (
        <div>
            <Header title={"Find"}/>
            <Card>
                <Card.Header>
                    <Filter data={allData}/>
                </Card.Header>
                <Card.Body>
                    <div>
                        {
                            allData.map((question,index) =>
                                    <Question id={question._id ?? ""} key={index}/>
                            )
                        }
                    </div>
                </Card.Body>
                <Card.Footer className={"text-muted"}>
                    <Pagination/>
                </Card.Footer>
            </Card>

        </div>
    );
};

export default Find;

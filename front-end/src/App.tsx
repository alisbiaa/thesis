import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from "./component/NavBar";
import {Row} from "react-bootstrap";
import './static/test.css';
import {Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import Department from "./pages/department";
import Ask from "./pages/Ask";
import Question from "./pages/question";
import CreateDepartment from "./pages/create/CreateDepartment";
import CreateSubject from "./pages/create/CreateSubject";
import CreateStudent from "./pages/create/CreateStudent";
import CreateTeacher from "./pages/create/CreateTeacher";
import Find from "./pages/find";


function App() {
    return (
        <div className={"container-fluid"}>
            <Row>
                <div className="col-2 p-3">
                    <NavBar/>
                </div>
                <div className="col-10 p-3">
                    <Routes>
                        <Route path="/" element={<Home/>}/>
                        <Route path="/department/:id" element={<Department/>}/>
                        <Route path="/ask" element={<Ask/>}/>
                        <Route path="/question/:id" element={<Question/>}/>
                        <Route path={"/find"} element={<Find/>} />

                        <Route path="/create/department" element={<CreateDepartment/>}/>
                        <Route path="/create/subject" element={<CreateSubject/>}/>
                        <Route path="/create/student" element={<CreateStudent/>}/>
                        <Route path="/create/teacher" element={<CreateTeacher/>}/>
                        <Route path="/test" element={<div> Hello this is a test</div>} />
                    </Routes>
                </div>
            </Row>
        </div>

    );
}

export default App;

import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import {IDepartment, IResponse} from "../static/interfaces";
import {department_get_all} from "../api/department.api";


const NavBar = () => {
    const [departments,setDepartments] = useState<IDepartment[]>([]);
    useEffect(() => {
        const fetchData = async () => {
            const {status,data,message,success,error} : IResponse = await department_get_all();
            if(success)
                setDepartments(data);
        }
        fetchData();
    }, []);
    return (
        <div className="bg-white">
            <a href="/"
               className="d-flex align-items-center pb-3 mb-3 link-dark text-decoration-none border-bottom">
                <svg className="bi me-2" width="30" height="24">
                    <use xlinkHref="#bootstrap"></use>
                </svg>
                <span className="fs-5 fw-semibold">Stack-Uni</span>
            </a>
            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
            <ul className="list-unstyled ps-0">
                <li className="mb-1">
                    <button className="btn btn-toggle align-items-center rounded collapsed"
                            data-bs-toggle="collapse" data-bs-target="#home-collapse" aria-expanded="true">
                        Departments
                    </button>
                    <div className="collapse show" id="home-collapse">
                        <ul className="btn-toggle-nav fw-normal pb-1 small">
                            {
                                departments.map(department =>
                                    <li key={department._id}>
                                        <Link to={`/department/${department._id}`} className="link-dark rounded text-decoration-none">
                                            {department.name}
                                        </Link>
                                    </li>
                                )
                            }
                        </ul>
                    </div>
                </li>
                <li className="mb-1">
                    <button className="btn btn-toggle align-items-center rounded collapsed"
                            data-bs-toggle="collapse" data-bs-target="#dashboard-collapse" aria-expanded="false">
                        Create
                    </button>
                    <div className="collapse" id="dashboard-collapse">
                        <ul className="btn-toggle-nav fw-normal pb-1 small">
                            <li><Link to="/create/teacher" className="link-dark rounded text-decoration-none">Teacher</Link></li>
                            <li><Link to="/create/department" className="link-dark rounded text-decoration-none">Department</Link></li>
                            <li><Link to="/create/subject" className="link-dark rounded text-decoration-none">Subject</Link></li>
                            <li><Link to="/create/student" className="link-dark rounded text-decoration-none">Student</Link></li>
                        </ul>
                    </div>
                </li>
                <li className="mb-1">
                    <button className="btn btn-toggle align-items-center rounded collapsed">
                        <Link to="/ask" className={"text-decoration-none text-reset"}>Ask</Link>
                    </button>
                </li>
                <li className="mb-1">
                    <button className="btn btn-toggle align-items-center rounded collapsed">
                        <Link to="/find" className={"text-decoration-none text-reset"}>Find</Link>
                    </button>
                </li>
                <li className="border-top my-3"></li>
                <li className="mb-1">
                    <button className="btn btn-toggle align-items-center rounded collapsed"
                            data-bs-toggle="collapse" data-bs-target="#account-collapse" aria-expanded="false">
                        Account
                    </button>
                    <div className="collapse" id="account-collapse">
                        <ul className="btn-toggle-nav fw-normal pb-1 small">
                            <li><a href="#" className="link-dark rounded">New...</a></li>
                            <li><a href="#" className="link-dark rounded">Profile</a></li>
                            <li><a href="#" className="link-dark rounded">Settings</a></li>
                            <li><a href="#" className="link-dark rounded">Sign out</a></li>
                        </ul>
                    </div>
                </li>

            </ul>


        </div>
    );
};

export default NavBar;

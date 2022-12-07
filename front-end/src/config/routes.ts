import React from "react";
import Home from '../pages/Home';
import Search from "../pages/search/Search";
import Question from "../pages/question";
import Department from "../pages/department";
import Profile from "../pages/profile";
import Ask from "../pages/ask";
import Users from "../pages/users";
import Test from "../pages/Test";

import {
    UserOutlined,
    SearchOutlined,
    QuestionCircleOutlined,
    UsergroupAddOutlined,
    ExclamationCircleOutlined
} from "@ant-design/icons";
import ProfileById from "../pages/profile/ProfileById";
import Reports from "../pages/Reports";


interface IRoute {
    path : string;
    component : React.FC;
    auth : "RO" | "admin" | "teacher" | "student",
    sidebar : boolean,
    label ? : string | null
    icon ? : React.FC  ;
}

const isAuthorized  = (user_role: IRoute["auth"], route_role: IRoute["auth"]) : boolean  => {
    if (user_role === 'admin')
        return true
    else if ((user_role === 'teacher') && (route_role != 'admin'))
        return true
    else if ((user_role === 'student') && (route_role != 'admin' && route_role != 'teacher'))
        return true
    else if ((user_role === 'RO') && (route_role == 'RO'))
        return true
    return false
};

const routes: IRoute[] = [

    {
        path : '/',
        component: Home,
        auth : "RO",
        sidebar : false,
        label : null
    },
    {
        path : '/search',
        component: Search,
        auth : "RO",
        sidebar : true,
        label : "Search",
        icon : SearchOutlined
    },
    {
        path : '/question/:id',
        component: Question,
        auth : "RO",
        sidebar : false,
        label : null
    },
    {
        path : '/department/:id',
        component: Department,
        auth : "RO",
        sidebar : false
    },
    {
        path : '/profile/:id',
        component: ProfileById,
        auth : "student",
        sidebar : false,
        label : 'Profile',
        icon : UserOutlined
    },
    {
        path : '/profile',
        component: Profile,
        auth : "student",
        sidebar : true,
        label : 'Profile',
        icon : UserOutlined
    },
    {
        path : '/ask',
        component: Ask,
        auth : "student",
        sidebar : true,
        label : 'Ask',
        icon : QuestionCircleOutlined
    },
    {
        path : '/users',
        component: Users,
        auth : "teacher",
        sidebar : true,
        label : 'Users',
        icon : UsergroupAddOutlined
    },
    {
        path : '/admin/reports',
        component: Reports,
        auth : "teacher",
        sidebar : true,
        label : 'Reports',
        icon : ExclamationCircleOutlined
    },
];

export const get_routes = (user_role: IRoute["auth"]) : IRoute[] => {
    return routes.filter((r) => isAuthorized(user_role, r.auth));
}

export const get_nav_routes = (user_role: IRoute["auth"]) : IRoute[] => {
    return get_routes(user_role).filter(r => r.sidebar);
}
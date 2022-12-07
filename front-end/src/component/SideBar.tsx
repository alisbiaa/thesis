import React, { useEffect, useState} from 'react';
import {Layout, Menu} from "antd";
import {department_get_all} from "../api/department.api";
import {IDepartment, IUser} from "../static/interfaces";
import { useNavigate } from "react-router-dom";
import {get_user} from "../api/user.api";
import {get_nav_routes} from "../config/routes";
import {useMsal} from "@azure/msal-react";
import {DatabaseOutlined} from "@ant-design/icons";

const {Sider} = Layout;

const SideBar = () => {
    let navigate = useNavigate();
    const [departments, setDepartments] = useState<IDepartment[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const {success,message,status,data,error} = await department_get_all();
            if (success)
                setDepartments(data);
            else
                console.log(message);
        }
        fetchData();
    }, []);

    const { accounts } = useMsal();
    const account = accounts[0];
    const email = account.username ?? "";

    const [user, setUser] = useState<IUser | null>(null);

    useEffect(() => {
        const fetchData = async ()=> {
            const {message, success, data, error, status} = await get_user(email);
            if (success)
                setUser(data);
            else
                setUser(null);
        }
        fetchData();
    }, [email]);

    const nav_routes = get_nav_routes(user?.role ?? "RO");



    const [collapsed, setCollapsed] = useState(false);
    return (
        <Sider
            style={{
                overflow: 'auto',
                height: '100vh',
                left: 0,
                top: 0,
                bottom: 0,
                // margin: "5px"
                // padding:"5px"
            }}
            theme={"dark"} collapsible collapsed={collapsed} onCollapse={value => setCollapsed(value)} >
            <img
                loading={"lazy"}
                src={collapsed ? "/elte-logo-sm.svg" : "/elte-logo.svg"}
                alt={"elte logo"}
                style={{cursor: "pointer"}}
                onClick={() => navigate("/")}
            />


            <Menu theme={"dark"} mode="vertical">
                <Menu.SubMenu key={3} title="Departments" icon={<DatabaseOutlined/>}>
                    {departments.map(el =>
                        <Menu.Item
                            key={el._id}
                            onClick={() => navigate(`/department/${el._id}`)}
                        >
                            {el.name}
                        </Menu.Item>
                    )}
                </Menu.SubMenu>
                {
                    nav_routes.map( (r,i) =>

                        <Menu.Item
                            key={i+3}
                            icon={r.icon ? React.createElement(r.icon) : null  }
                            onClick={() => navigate(r.path)}
                        >
                            {r.label}
                        </Menu.Item>
                    )
                }
            </Menu>
        </Sider>
    );
};

export default SideBar;

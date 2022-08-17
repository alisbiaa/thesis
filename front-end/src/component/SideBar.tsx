import React, {CSSProperties, useEffect, useState} from 'react';
import {Layout, Menu, MenuProps,Divider} from "antd";
import {
    UserOutlined,
    DatabaseOutlined,
    SearchOutlined, QuestionCircleOutlined, UsergroupAddOutlined
} from "@ant-design/icons";
import {department_get_all} from "../api/department.api";
import {IDepartment} from "../static/interfaces";
import { useNavigate } from "react-router-dom";

const {Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

const style : CSSProperties = {
    color: "white", border:"white"

}

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



    const [collapsed, setCollapsed] = useState(false);
    return (
        <Sider theme={"dark"} collapsible collapsed={collapsed} onCollapse={value => setCollapsed(value)}>
            <img
                loading={"lazy"}
                src={collapsed ? "/elte-logo-sm.svg" : "/elte-logo.svg"}
                alt={"elte logo"}
                style={{cursor: "pointer"}}
                onClick={() => navigate("/")}
            />


            <Divider style={{ borderWidth: 2, borderColor: '#ffffff' }} />


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
                <Menu.Item
                    key={2}
                    icon={<SearchOutlined/>}
                    onClick={() => navigate("/search")}
                >
                    Search
                </Menu.Item>
                <Divider orientation="left" plain style={style}>
                    Student
                </Divider>
                <Menu.Item
                    key={1}
                    icon={<UserOutlined/>}
                    onClick={() => navigate("/profile")}
                >
                    Profile
                </Menu.Item>

                <Menu.Item
                    icon={<QuestionCircleOutlined/>}
                    onClick={() => navigate("/ask")}
                    key={4}
                >
                    Ask
                </Menu.Item>
                <Divider orientation="left" plain style={style}>
                    Teacher
                </Divider>
                <Divider orientation="left" plain style={style}>
                    Admin
                </Divider>
                <Menu.Item
                    icon={<UsergroupAddOutlined/>}
                    onClick={() => navigate("/admin/users")}
                    key={5}
                >
                    Users
                </Menu.Item>
            </Menu>



        </Sider>
    );
};

export default SideBar;

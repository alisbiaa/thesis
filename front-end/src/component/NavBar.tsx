import React, {useEffect, useState} from 'react';
import {Avatar, Badge, Layout, Menu, Select, Typography} from "antd";
import {useNavigate} from "react-router-dom";
import {useMsal} from "@azure/msal-react";
import {IResponse, IUser} from "../static/interfaces";
import {get_all_users} from "../api/user.api";
const { Header } = Layout;



const { Text } = Typography;
const NavBar = () => {
    const navigate = useNavigate();
    const { instance } = useMsal();

    const { accounts } = useMsal();

    const account = accounts[0];
    const name = account?.name ?? "";
    const handleLogout= ()=> {
        instance.logoutPopup({
            postLogoutRedirectUri: "/",
            mainWindowRedirectUri: "/"
        }).catch((error) => console.log(error));
        navigate("/login");
    }

    const [users, setUsers] = useState<IUser[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const {status,data,message,success,error} : IResponse = await get_all_users();
            if(success)
                setUsers(data);
            else
                setUsers([]);
        }
        fetchData();
    }, []);

    const options = users.map(u => {
        return {value : u.email, label : u.name}
    })


    return (
        <Header className="site-layout-background" style={{padding: 0}}>
            <Menu
                theme="light"
                mode={"horizontal"}
                defaultSelectedKeys={['2']}
            >
                <Menu.Item danger={true} key={3} style={{marginLeft: 'auto'}}>
                    <Select
                        showSearch
                        onChange={(value)=>   window.location.replace(`/profile/${value}`)}
                        style={{width: 200}}
                        placeholder="Search to Select"
                        optionFilterProp="children"
                        filterOption={(input, option) => (option?.label ?? '').includes(input)}
                        filterSort={(optionA, optionB) =>
                            (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                        }
                        options={options}
                    />
                </Menu.Item>


                <Menu.Item
                    key={1}
                    style={{marginLeft: 'auto'}}
                    onClick={() => navigate("/profile")}
                >
                    <Badge dot={true} showZero>
                        <Avatar shape="square" size="large" src="https://joeschmoe.io/api/v1/random"/>
                    </Badge>
                    <Text disabled style={{margin: "3px"}}> {name} </Text>
                </Menu.Item>
                <Menu.Item
                    onClick={handleLogout}
                    key={2}
                >
                    Logout
                </Menu.Item>
            </Menu>
        </Header>
    );
};

export default NavBar;
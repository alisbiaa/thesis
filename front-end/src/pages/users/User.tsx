import React from 'react';
import {Dropdown, List, Menu, message, notification, Typography} from "antd";
import {UserDeleteOutlined, UserOutlined, UserAddOutlined} from "@ant-design/icons";
import {IResponse, IUser} from "../../static/interfaces";
import {useMsal} from "@azure/msal-react";
import {ban_user, set_user_role, unban_user} from "../../api/action.api";

type propType = {
    user: IUser;
}

const User = ({user}: propType) => {

    const handleBan = async (ban :boolean) => {
        let response: IResponse;
        ban ?
            response = await ban_user(email, user.email)
            :
            response = await unban_user(email, user.email);

        const {success, message, status} = response;
        if(success)
            notification.open({
                message: `${ban? 'Ban' : 'Unban'}`,
                description: `${user.email} is ${ban? 'banned' : 'unbanned'}`,
                type : "warning",
                duration : 2,
                onClose: () => window.location.reload(),
            });
        else
            notification.open({
                message: "Role",
                description: message + `status : ${status}`,
                type : "error",
            });
    };

    const { accounts } = useMsal();
    const account = accounts[0];
    const email = account.username ?? "";

    const roleHandler = async (role : IUser["role"]) => {
        if(user.role === role) return;
        const {success, message, status} = await set_user_role(
            email, user.email, role
        );
        if(success)
            notification.open({
                message: "Role",
                description: `${user.email} is now ${role}`,
                type : "success",
                duration : 2,
                onClose: () => window.location.reload(),
            });
        else
            notification.open({
                message: "Role",
                description: message + `status : ${status}`,
                type : "error",
            });
    }

    const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        message.info('Click on left button.');
        console.log('click left button', e);
    };


    const menu = (
        <Menu
            items={[
                {
                    label: 'Set',
                    key: '1',
                    icon: <UserOutlined/>,
                    title: "Test",
                    children: [
                        !(user.role === "RO") ?{
                            key: '2-1',
                            label: (
                                <div onClick={() => roleHandler("RO")}>
                                    Guest
                                </div>
                            ),
                        }: null,
                        !(user.role === "student") ?{
                            key: '2-2',
                            label: (
                                <div onClick={() => roleHandler("student")}>
                                    Student
                                </div>
                            ),
                        }: null,
                        !(user.role === "teacher") ?{
                            key: '2-3',
                            label: (
                                <div onClick={() => roleHandler("teacher")}>
                                    Teacher
                                </div>
                            ),
                        }: null,
                        !(user.role === "admin") ? {
                            key: '2-4',
                            label: (
                                <div onClick={() => roleHandler("admin")}>
                                    Admin
                                </div>
                            ),
                            danger: true,
                        } : null,
                    ],
                },
                !user.banned ? {
                    label: (
                        <div onClick={() => handleBan(true)}>
                            Ban
                        </div>
                    ),
                    key: '2',
                    icon: <UserDeleteOutlined/>,
                    danger: true,
                } : null,
                user.banned ? {
                    label: (
                        <Typography.Text type="success">
                            <div onClick={() => handleBan(false)}>
                                Unban
                            </div>
                        </Typography.Text>
                    ),
                    key: '3',
                    icon: <UserAddOutlined style={{color: "green"}}/>,
                } : null
            ]}
        />
    );


    return (
            <List.Item>
                <Dropdown.Button onClick={handleButtonClick} overlay={menu}>
                    {
                        user.banned ?
                            <Typography.Text type={`danger`} >
                                {user.email}
                            </Typography.Text>
                            :
                            <>
                            {user.email}
                            </>
                    }
                </Dropdown.Button>
            </List.Item>
    );
};

export default User;
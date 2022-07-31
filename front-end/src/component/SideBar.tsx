import React, {useState} from 'react';
import {Layout, Menu, MenuProps,Divider} from "antd";
import {
    DesktopOutlined,
    FileOutlined,
    PieChartOutlined,
    TeamOutlined,
    UserOutlined
} from "@ant-design/icons";

const {Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
    } as MenuItem;
}

const items: MenuItem[] = [
    getItem('Option 1', '1', <PieChartOutlined />),
    getItem('Option 2', '2', <DesktopOutlined />),
    getItem('User', 'sub1', <UserOutlined />, [
        getItem('Tom', '3'),
        getItem('Bill', '4'),
        getItem('Alex', '5'),
    ]),
    getItem('Team', 'sub2', <TeamOutlined />, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
    getItem('Files', '9', <FileOutlined />),
];
const SideBar = () => {


    const [collapsed, setCollapsed] = useState(false);
    return (
        <Sider theme={"light"} collapsible collapsed={collapsed} onCollapse={value => setCollapsed(value)}>
            <div className="logo" />
            <Menu defaultSelectedKeys={['1']} mode="inline" items={items} />
            <Divider orientation="left" plain>
                Student
            </Divider>
            <Divider orientation="left" plain>
                Teacher
            </Divider>
            <Divider orientation="left" plain>
                Admin
            </Divider>
        </Sider>
    );
};

export default SideBar;

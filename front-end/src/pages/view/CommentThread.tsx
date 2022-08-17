import {Avatar, Comment, Space, Tooltip} from "antd";
import {
    CheckCircleTwoTone, ExclamationCircleOutlined, ImportOutlined,
    InboxOutlined,
    LikeFilled,
    StarTwoTone
} from "@ant-design/icons";
import React from "react";
import User from "../../component/User";

type propType = {
    content : any, //
    author: string; // email
    createdAt: string;
    children?: any;
}

const flags = (datetime : string) =>
    <Space>
        {datetime}
        <Tooltip title={"Important"} color={"gold"}>
            <StarTwoTone style={{fontSize:"120%", color:"gold", cursor:"pointer"}} twoToneColor={"gold"}/>
        </Tooltip>
        <Tooltip title={"Solved"} color={"green"}>
            <CheckCircleTwoTone style={{fontSize:"120%",cursor:"pointer"}} twoToneColor={"#3d9d0d"}/>
        </Tooltip>
        <Tooltip title={"Archived"}>
            <InboxOutlined style={{fontSize:"120%", color:"rgb(87,87,94)",cursor:"pointer"}}/>
        </Tooltip>
    </Space>

const actions = () =>
    <Space>
        {/*<span> 20 </span> <LikeFilled style={{cursor:"pointer"}} />*/}
        <Tooltip title={"Set as important"} >
            <StarTwoTone style={{fontSize:"120%", cursor:"pointer"}} twoToneColor={"rgb(33,33,173)"}/>
        </Tooltip>
        <Tooltip title={"Validate"} >
            <CheckCircleTwoTone style={{fontSize:"120%",cursor:"pointer"}} twoToneColor={"rgb(33,33,173)"}/>
        </Tooltip>
        <Tooltip title={"Archive"}>
            <InboxOutlined style={{fontSize:"120%", color:"rgb(33,33,173)",cursor:"pointer"}}/>
        </Tooltip>
        <Tooltip title={"Report"}>
            <ExclamationCircleOutlined style={{fontSize:"120%", color:"red",cursor:"pointer"}}/>
        </Tooltip>
    </Space>

const CommentThread = ({author,content,createdAt, children } : propType) => (
    <Comment
        actions={[actions()]}
        author={<User email={author}/> }
        avatar={<Avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />}
        content={content}
        datetime={flags(createdAt)}
    >
        {children}
    </Comment>
);

export default CommentThread;

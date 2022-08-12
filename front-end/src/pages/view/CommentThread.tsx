import {Avatar, Comment} from "antd";
import {LikeFilled} from "@ant-design/icons";
import React from "react";
import User from "../../component/User";

type propType = {
    content : any, //
    author: string; // email
    createdAt: string;
    children?: any;
}

const CommentThread = ({author,content,createdAt, children } : propType) => (
    <Comment
        actions={[<span key="comment-nested-reply-to">Reply to</span>, <LikeFilled/>]}
        author={<User email={author}/>}
        avatar={<Avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />}
        content={content}
        datetime={createdAt}
    >
        {children}
    </Comment>
);

export default CommentThread;

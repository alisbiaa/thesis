import React from 'react';
import User from "../../component/User";
import {Alert, Avatar, Button, Comment, notification, Popconfirm, Space, Tooltip} from "antd";
import {
    CheckCircleTwoTone,
    DownloadOutlined,
    ExclamationCircleOutlined,
    InboxOutlined,
    StarTwoTone
} from "@ant-design/icons";
import {IQuestion} from "../../static/interfaces";
import {timeParser} from "../../static/functions";
import {update_question_hidden, update_question_important} from "../../api/action.api";
import {useMsal} from "@azure/msal-react";
import Report from "./Report";
import {useNavigate} from "react-router-dom";

type propType = {
    question: IQuestion | null;
    children?: any;
}


const QuestionThread = ({question, children } : propType) => {

    let navigate = useNavigate();
    const { accounts } = useMsal();
    const account = accounts[0];
    const email = account.username ?? "";

    const handleImportant = async (important:boolean) => {
        if(!question?._id) return;
        const {success, message, status} = await update_question_important(
            email, question?._id, important
        );
        if(success)
            notification.open({
                message: "Updating flags",
                description: `This question is now ${important? '' : 'NOT'} important`,
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
    };

    const handleHidden = async (hidden:boolean) => {
        if(!question?._id) return;
        const {success, message, status} = await update_question_hidden(
            email, question?._id, hidden
        );
        if(success)
            notification.open({
                message: "Updating flags",
                description: hidden ? `This question is now archived` : 'This question has been restored' ,
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
    };

    const handleProfile = (id: string | null) => {
        if(!id) return;
        navigate(`/profile/${id}`);
    };

    const flags = () =>
        <Space>
            {timeParser(question?.createdAt)}
            {
                question?.important ?
                    <Popconfirm
                        title="Are you sure to make this question unimportant?"
                        onConfirm={() => handleImportant(false)}
                        // onCancel={cancel}
                        okText="Yes"
                        cancelText="No"
                    >
                        <StarTwoTone
                            style={{fontSize: "120%", color: "gold", cursor: "pointer"}}
                            twoToneColor={"gold"}
                        />
                    </Popconfirm>
                    :
                    null
            }
            {
                question?.solved ?
                    <Tooltip title={"Solved"} color={"green"}>
                        <CheckCircleTwoTone style={{fontSize: "120%", cursor: "pointer"}} twoToneColor={"#3d9d0d"}/>
                    </Tooltip>
                    :
                    null
            }
            {
                question?.hidden ?
                    <Popconfirm
                        title="Are you sure to restore this question?"
                        onConfirm={() => handleHidden(false)}
                        // onCancel={cancel}
                        okText="Yes"
                        cancelText="No"
                    >
                        <InboxOutlined style={{fontSize: "120%", color: "rgb(87,87,94)", cursor: "pointer"}}/>
                    </Popconfirm>
                    :
                    null
            }
        </Space>;

    const actions = () =>
        <Space>
            {/*<span> 20 </span> <LikeFilled style={{cursor:"pointer"}} />*/}
            {
                !question?.important ?
                    <Popconfirm
                        title="Are you sure to make this question important?"
                        onConfirm={() => handleImportant(true)}
                        // onCancel={cancel}
                        okText="Yes"
                        cancelText="No"
                    >
                        <StarTwoTone style={{fontSize: "120%", cursor: "pointer"}} twoToneColor={"rgb(33,33,173)"}/>
                    </Popconfirm>

                    :
                    null
            }
            {
                !question?.hidden ?
                        <Popconfirm
                            title="Are you sure to archive this question?"
                            onConfirm={() => handleHidden(true)}
                            // onCancel={cancel}
                            okText="Yes"
                            cancelText="No"
                        >
                            <InboxOutlined style={{fontSize: "120%", color: "rgb(33,33,173)", cursor: "pointer"}}/>
                        </Popconfirm>

                    :
                    null
            }
            <Report reported={question?.user ?? ""}/>
        </Space>;


    return (
        <Comment
            actions={[actions()]}
            author={<User email={question?.user ?? ""}/>}
            avatar={
                <Avatar
                    src="https://joeschmoe.io/api/v1/random"
                    alt="avatar"
                    onClick={() => handleProfile(question?.user ?? null)}
                />
            }
            content={
                <>
                    {question?.solved ?
                        <Alert
                            description={question?.content}
                            type="success"
                        /> :
                        <>
                            {question?.content}
                        </>
                    }
                    {
                        question?.attachment ?
                            <Button
                                type="ghost"
                                shape="round"
                                size={"small"}
                                style={{float: 'right'}}
                            >
                                <a href={question.attachment} download target="_blank"> <DownloadOutlined/> </a>
                            </Button>
                            :
                            null
                    }
                </>
            }
            datetime={flags()}
        >
            {children}
        </Comment>
    );
};

export default QuestionThread;
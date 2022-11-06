import {Alert, Avatar, Comment, notification, Popconfirm, Space, Tooltip} from "antd";
import {
    CheckCircleTwoTone,
    ExclamationCircleOutlined,
} from "@ant-design/icons";
import React from "react";
import User from "../../component/User";
import {IAnswer} from "../../static/interfaces";
import {timeParser} from "../../static/functions";
import {update_answer_approved, update_question_important} from "../../api/action.api";
import {useMsal} from "@azure/msal-react";
import Report from "./Report";

type propType = {
    answer: IAnswer | null;
    children?: any;
}

const CommentThread = ({answer} : propType) => {

    const { accounts } = useMsal();
    const account = accounts[0];
    const email = account.username ?? "";

    const handleApprove = async (solve:boolean) => {
        if(!answer?._id) return;
        const {success, message, status} = await update_answer_approved(
            email, answer?._id, solve
        );

        if(success)
            notification.open({
                message: "Updating flags",
                description: `This answer is now ${solve? '' : 'NOT'} approved`,
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
    const flags = () =>
        <Space>
            {timeParser(answer?.createdAt)}
            {
                answer?.approved ?
                    <Popconfirm
                        title="Are you sure to unapproved this answer?"
                        onConfirm={() => handleApprove(false)}
                        // onCancel={cancel}
                        okText="Yes"
                        cancelText="No"
                    >
                        <CheckCircleTwoTone style={{fontSize: "120%", cursor: "pointer"}} twoToneColor={"#3d9d0d"}/>
                    </Popconfirm>
                    :
                    null
            }
        </Space>;

    const actions = () =>
        <Space>
            {/*<span> 20 </span> <LikeFilled style={{cursor:"pointer"}} />*/}
            {
                !answer?.approved ?
                    <>
                        <Popconfirm
                            title="Are you sure to approve this answer?"
                            onConfirm={() => handleApprove(true)}
                            // onCancel={cancel}
                            okText="Yes"
                            cancelText="No"
                        >
                            <CheckCircleTwoTone style={{fontSize:"120%",cursor:"pointer"}} twoToneColor={"rgb(33,33,173)"}/>
                        </Popconfirm>
                        <Report reported={answer?.user ?? ""}/>
                    </>

                    :
                    null
            }

        </Space>


    return (
        <Comment
            actions={[actions()]}
            author={<User email={answer?.user ?? ""}/>}
            avatar={<Avatar src="https://joeschmoe.io/api/v1/random" alt="avatar"/>}
            content={
                answer?.approved ?
                    <Alert
                        description={answer?.content}
                        type="success"
                    /> :
                    <>
                        {answer?.content}
                    </>
            }
            datetime={flags()}
        />
    );

};

export default CommentThread;

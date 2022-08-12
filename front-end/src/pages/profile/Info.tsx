import React, {useEffect, useState} from 'react';
import {Badge, Button, Descriptions, notification, Spin, Typography} from 'antd';
import {useMsal} from "@azure/msal-react";
import {get_user, update_user} from "../../api/user.api";
import {IUser} from "../../static/interfaces";
import {EditFilled} from "@ant-design/icons";
import {openNotification} from "../../static/functions";
const { Paragraph } = Typography;

const Info = () => {
    const { accounts } = useMsal();
    const account = accounts[0];
    const email = account.username ?? "";
    const name = account.name ?? "";

    const [user, setUser] = useState<IUser | null>(null);
    const [spin, setSpin] = useState<boolean>(false);
    const [bio, setBio] = useState<string|null>(null);

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

    const handleUpdate = () => {
        if(!bio) return;
        setSpin(true);
        const fetchData = async ()=> {
            const {message, success, data, error, status} = await update_user({email,bio});
            if (success)
                setUser(data);
            else
                setUser(null);
            setSpin(false);
            setBio(null);
            openNotification(
                {
                    message: "Profile update",
                    description: message,
                    duration: 2,
                    type: success ? "success" : "error",
                }
            )
        }
        fetchData();
    }


    return (
        <Spin spinning={spin}>
            <Descriptions title="Info">
                <Descriptions.Item label="Email" span={3}>
                    <Paragraph
                        copyable={true}
                    >
                        {email}
                    </Paragraph>
                </Descriptions.Item>
                <Descriptions.Item label="Name" span={3}>
                    <Paragraph
                        copyable={true}
                    >
                        {name}
                    </Paragraph>
                </Descriptions.Item>
                <Descriptions.Item label="Bio" span={3}>
                    <Paragraph
                        editable={{
                            tooltip: "Cannot edit",
                            triggerType: ["text", "icon"],
                            onChange: value => setBio(value),
                        }}
                    >
                        { bio ?? user?.bio ?? "..." }
                    </Paragraph>
                </Descriptions.Item>
                <Descriptions.Item label="Role" span={3}>
                    <Badge
                        status={user?.role == "RO" ? "default" : "success"}
                        text={user?.role ?? ""}
                    />
                </Descriptions.Item>
            </Descriptions>
            <Button
                type="default"
                shape="round"
                icon={<EditFilled/>}
                size={"middle"}
                value={"Update"}
                onClick={handleUpdate}
                disabled={!bio}
                // loading
            >
                Update
            </Button>

        </Spin>
    );
};

export default Info;

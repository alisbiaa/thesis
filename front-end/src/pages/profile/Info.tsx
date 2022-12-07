import React, {useState} from 'react';
import {Badge, Button, Descriptions, Spin, Typography} from 'antd';
import {get_user, update_user} from "../../api/user.api";
import {IUser} from "../../static/interfaces";
import {EditFilled} from "@ant-design/icons";
import {openNotification} from "../../static/functions";
const { Paragraph } = Typography;

type propType = {
    user: IUser | null;
    editable : boolean;
}
const Info = ({user, editable} : propType) => {


    const [spin, setSpin] = useState<boolean>(false);
    const [bio, setBio] = useState<string|null>(null);

    const email: string | null = user?.email ?? null;

    const handleUpdate = () => {
        if(!bio) return;
        setSpin(true);
        const fetchData = async ()=> {
            const {message, success, data, error, status} = await update_user({email,bio});
            setBio(null);
            openNotification(
                {
                    message: "Profile update",
                    description: message,
                    duration: 2,
                    type: success ? "success" : "error",
                }
            )
            if (success) {
                window.location.reload();
            }
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
                        {user?.name}
                    </Paragraph>
                </Descriptions.Item>
                <Descriptions.Item label="Bio" span={3}>
                    <Paragraph
                        editable={
                            editable ?
                                {
                                    tooltip: "Click to edit",
                                    triggerType: ["text", "icon"],
                                    onChange: value => setBio(value),
                                }
                                :
                                false
                        }
                    >
                        {bio ?? user?.bio ?? "..."}
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

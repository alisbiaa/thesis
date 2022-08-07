import {ArgsProps} from "antd/es/notification";
import {notification} from "antd";


export const openNotification = ({message,description,duration=0,type}:ArgsProps) => {
    const args : ArgsProps = {
        message,
        description,
        duration,
        placement: "topRight",
        type
    };
    notification.open(args);
};

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

export const timeParser = (input : string | undefined | null) : string | null => {
    if(!input) return null;
    return new Date(input).toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
}



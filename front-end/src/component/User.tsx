import React, {useEffect, useState} from 'react';
import {IResponse, IUser} from "../static/interfaces";
import {get_user} from "../api/user.api";


type propType = {
    email: string;
}

const User = ({email} : propType) => {
    const [user, setUser] = useState<IUser | null>(null);
    useEffect(() => {
        const fetchData = async () => {
            const {data,message,success,status,error}: IResponse = await get_user(email);
            if(success)
                setUser(data);
            else
                setUser(null);
        }
        fetchData();
    }, [email]);
    return (
        <>
            {user?.name}
        </>
    );
};

export default User;

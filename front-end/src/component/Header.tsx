import React from 'react';
import {Breadcrumb} from "antd";


type propTypes = {
    path: string[];
}
const Header = ({path} : propTypes) => {
    return (
        <Breadcrumb style={{margin: '16px 0'}}>
            {
                path.map((el,index) =>
                    <Breadcrumb.Item key={index}>{el}</Breadcrumb.Item>
                )
            }
        </Breadcrumb>

    );
};

export default Header;

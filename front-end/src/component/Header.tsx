import React from 'react';


type propTypes = {
    title: string;
}
const Header = ({title} : propTypes) => {
    return (
        <span className="d-flex align-items-center pb-3 mb-3 link-dark text-decoration-none border-bottom">
                <span className="fs-5 fw-semibold">{title}</span>
        </span>
    );
};

export default Header;

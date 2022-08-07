import React from 'react';
import "./../static/unauthorized.css";

const NotFound = () => {
    return (
        <div>
            <svg style={{display:"none"}}>
                <symbol id="ghost" xmlns="http://www.w3.org/2000/svg" width="100" height="100"
                        viewBox="0 0 26.458333 26.458334">
                    <g transform="translate(0 -270.542)">
                        <path
                            d="M4.63 279.293c0-4.833 3.85-8.751 8.6-8.751 4.748 0 8.598 3.918 8.598 8.75H13.23zM4.725 279.293h16.914c.052 0 .19.043.19.096l-.095 14.329c0 .026-.011.05-.028.068a.093.093 0 0 1-.067.028c-.881 0-1.235-1.68-2.114-1.616-.995.072-1.12 2.082-2.114 2.154-.88.064-1.233-1.615-2.115-1.615-.881 0-1.233 1.615-2.114 1.615-.881 0-1.233-1.615-2.114-1.615-.882 0-1.236 1.679-2.115 1.615-.994-.072-1.12-2.082-2.114-2.154-.88-.063-1.41 1.077-2.114 1.616-.021.016-.05-.01-.067-.028a.097.097 0 0 1-.028-.068v-14.33c0-.052.042-.095.095-.095z"
                            fill="#f1eedb" paint-order="stroke fill markers"/>
                        <path
                            d="M15.453 281.27a1.987 1.94 0 0 1-.994 1.68 1.987 1.94 0 0 1-1.987 0 1.987 1.94 0 0 1-.994-1.68h1.988z"
                            fill="#282b24" paint-order="stroke fill markers"/>
                        <g fill="#282b24" transform="matrix(1 0 0 1.0177 .283 -5.653)">
                            <ellipse cx="10.205" cy="278.668" rx="1.231" ry="1.181" paint-order="stroke fill markers"/>
                            <ellipse ry="1.181" rx="1.231" cy="278.668" cx="16.159" paint-order="stroke fill markers"/>
                            <ellipse ry=".331" rx=".853" cy="280.936" cx="10.205" opacity=".5"
                                     paint-order="stroke fill markers"/>
                            <ellipse cx="16.159" cy="280.936" rx=".853" ry=".331" opacity=".5"
                                     paint-order="stroke fill markers"/>
                        </g>
                        <ellipse ry=".614" rx="8.082" cy="296.386" cx="13.229" opacity=".1" fill="#00000"
                                 paint-order="stroke fill markers"/>
                    </g>
                </symbol>
            </svg>

            <div className="container">
                <h1>404</h1>
                <p>page not found</p>
                <svg className="keyhole">
                    <use href="#keyhole"/>
                </svg>
            </div>

            <div className="ghost">
                <svg className="ghost">
                    <use href="#ghost"/>
                </svg>
            </div>
        </div>

    );
};

export default NotFound;

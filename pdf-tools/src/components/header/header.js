import React from 'react';
import {Link} from "react-router-dom";
import "./header.css";

export default function Header(){
    return (
        <>
            <div className="red navbar">
                <div className="ml-1">
                    <Link to="/" className="navTitle">PDF Tools</Link>
                </div>
                <div>
                    <ul className="tabs transparent">
                        <li className="tab col">
                            <Link className="active white-text waves-effect waves-light" to="/">Home</Link>
                        </li>
                        <li className="tab col">
                            <Link className="white-text waves-effect waves-light" to="/get-started">Get Started</Link>
                        </li>
                        <li className="tab col">
                            <Link className="white-text waves-effect waves-light" to="/my-files">My Files</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </>
        
    )
}


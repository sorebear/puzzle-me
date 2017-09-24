import React from 'react';
import { NavLink } from 'react-router-dom';

export default (props) => {
    return (
        <ul className="nav justify-content-between header">
            <li className="nav-item align-self-center">
                <NavLink to="/" className="nav-link">
                    <div style={{color: "white"}}><span style={{color: "rgb(217,83,79)"}}>puzzle</span>me</div>
                </NavLink>
            </li>
            <li className="nav-item align-self-center">
                <i className="icon-style fa fa-info nav-link align-items-center" onClick={props.callModal}></i>
            </li>
        </ul>
    )
}
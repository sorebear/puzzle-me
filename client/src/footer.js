import React from 'react';
import { NavLink } from 'react-router-dom'

export default () => {

    return (
        <ul className="nav justify-content-around align-items-center footer">
            <li className="nav-item">
                <NavLink to="/home" className="nav-link">
                    <i className="icon-style fa fa-home"></i>
                </NavLink>
            </li>
            <li className="nav-item">
                <NavLink to="/play" className="nav-link">
                    <i className="icon-style fa fa-play"></i>
                </NavLink>
            </li>
            <li className="nav-item">
                <NavLink to="/create"  className="nav-link">
                    <i className="icon-style fa fa-pencil"></i>
                </NavLink>
            </li>
            <li className="nav-item">
                <NavLink to="/rankings" className="nav-link">
                    <i className="icon-style fa fa-signal"></i>
                </NavLink>
            </li>
            <li className="nav-item">
                <NavLink to="/profile" className="nav-link">
                    <i className="icon-style fa fa-user"></i>
                </NavLink>
            </li>
        </ul>
    )
}
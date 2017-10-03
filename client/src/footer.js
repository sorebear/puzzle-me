import React from 'react';
import { NavLink } from 'react-router-dom'

export default (props) => {
    return (
        <ul className="nav justify-content-around align-items-center footer">
            <li className="nav-item">
                <NavLink to="/home" className="nav-link" >
                    <i className="icon-style fa fa-home" onClick={() => props.updateCurrentPath("home")}></i>
                </NavLink>
            </li>
            <li className="nav-item">
                <NavLink to="/play" className="nav-link" >
                    <i className="icon-style fa fa-play" onClick={() => props.updateCurrentPath("play_menu")}></i>
                </NavLink>
            </li>
            <li className="nav-item">
                <NavLink to="/create"  className="nav-link" >
                    <i className="icon-style fa fa-pencil" onClick={() => props.updateCurrentPath("create_menu")}></i>
                </NavLink>
            </li>
            <li className="nav-item">
                <NavLink to="/rankings" className="nav-link" >
                    <i className="icon-style fa fa-signal" onClick={() => props.updateCurrentPath("rankings")}></i>
                </NavLink>
            </li>
            <li className="nav-item">
                <NavLink to="/profile" className="nav-link" >
                    <i className="icon-style fa fa-user" onClick={() => props.updateCurrentPath("profile")}></i>
                </NavLink>
            </li>
        </ul>
    )
}
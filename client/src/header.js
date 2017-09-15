import React from 'react';
import { NavLink } from 'react-router-dom'

export default () => {
    return (
        <ul className="nav justify-content-between header">
            <li className="nav-item">
                <NavLink to="/" className="nav-link">
                    <i className="icon-style fa fa-bars"></i>
                </NavLink>
            </li>
            <li className="nav-item">
                <NavLink to="/home"  className="nav-link">
                    <h3>PuzzleMe</h3>
                </NavLink>
            </li>
            <li className="nav-item">
                <NavLink to="/info" className="nav-link">
                    <i className="icon-style fa fa-info"></i>
                </NavLink>
            </li>
        </ul>
    )
}
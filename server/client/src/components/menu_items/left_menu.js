import React from 'react';
import { NavLink } from 'react-router-dom';

export default (props) => {
    const { width, height, loginStatus, updateCurrentPath, callModal, currentPath } = props;
    return (
        <div className="side-menu-container" style={{width: width, height: height, left: 0}}>
            <div className="side-menu" style={{textAlign: "-webkit-right"}}>
                <div 
                    className="side-menu-header" 
                    onClick={callModal}
                >
                    puzzle<span className="red-text">me</span>&nbsp;
                    <i className="material-icons">help</i>
                </div>
                <NavLink to="/">
                    <button 
                        className={`btn side-menu-button ${loginStatus ? "" : "disabled"}`}
                        style={{backgroundColor: `${currentPath === "home" ? "#1d7d74" : ""}`}}
                        onClick={() => updateCurrentPath(loginStatus ? "home" : "login")}
                    >
                        Home 
                        <i className="material-icons" style={{fontSize: "24px"}}>home</i>
                    </button>
                </NavLink>
                
                <NavLink to={loginStatus ? "/play" : "/"}>
                    <button 
                        className={`btn side-menu-button ${loginStatus ? "" : "disabled"}`}
                        style={{backgroundColor: `${currentPath === "play_menu" ? "#1d7d74" : ""}`}}
                        onClick={() => updateCurrentPath(loginStatus ? "play_menu" : "login")}
                    >
                        Play 
                        <i className="material-icons" style={{fontSize: "24px"}}>play_arrow</i>
                    </button>
                </NavLink>
                <NavLink to={loginStatus ? "/create" : "/"}>
                    <button 
                        className={`btn side-menu-button ${loginStatus ? "" : "disabled"}`}
                        style={{backgroundColor: `${currentPath === "create_menu" ? "#1d7d74" : ""}`}}
                        onClick={() => updateCurrentPath(loginStatus ? "create_menu" : "login")}
                    >
                        Create 
                        <i className="material-icons" style={{fontSize: "24px"}}>create</i>
                    </button>
                </NavLink>
                
                <NavLink to={loginStatus ? "/rankings" : "/"}>
                    <button 
                        className={`btn side-menu-button ${loginStatus ? "" : "disabled"}`}
                        style={{backgroundColor: `${currentPath === "rankings" ? "#1d7d74" : ""}`}}
                        onClick={() => updateCurrentPath(loginStatus ? "rankings" : "login")}
                    >
                        Rankings 
                        <i className="material-icons" style={{fontSize: "24px"}}>fitness_center</i>
                    </button>
                </NavLink>

                <NavLink to={loginStatus ? "/profile/my_profile" : "/"}>
                    <button 
                        className={`btn side-menu-button ${loginStatus ? "" : "disabled"}`}
                        style={{backgroundColor: `${currentPath === "profile" ? "#1d7d74" : ""}`}}
                        onClick={() => updateCurrentPath(loginStatus ? "profile" : "login")}
                    >
                        Profile 
                        <i className="material-icons" style={{fontSize: "24px"}}>person</i>
                    </button>
                </NavLink>
            </div>
        </div>
    )
}




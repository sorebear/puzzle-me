import React from 'react';
import { NavLink } from 'react-router-dom';

export default (props) => {
    const { width, height, loginStatus, updateCurrentPath } = props;
    const styles = {
        sideMenuStyle : {
            position: "absolute",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            width: "80%",
            height: "100%",
        },
        sideMenuContainerStyle : {
            position: "fixed",
            display: "flex",
            justifyContent: "center",
            top: 0,
            left: 0,
            width: width,
            height: height
        }
    }
    return (
        <div style={styles.sideMenuContainerStyle}>
            <div style={styles.sideMenuStyle}>
                <NavLink to="/">
                    <button className="btn btn-block my-2">
                        <i
                            className="icon-style fa fa-home"
                            onClick={() => updateCurrentPath(loginStatus ? "home" : "login")}
                        />
                    </button>
                </NavLink>
                
                <NavLink to={loginStatus ? "/play" : "/"}>
                    <button className="btn btn-block my-2">
                        <i
                            className="icon-style fa fa-play"
                            onClick={() => updateCurrentPath(loginStatus ? "play_menu" : "login")}
                        />
                        </button>
                </NavLink>
                
                <NavLink to={loginStatus ? "/create" : "/"}>
                    <button className="btn btn-block my-2">
                        <i
                            className="icon-style fa fa-pencil"
                            onClick={() => updateCurrentPath(loginStatus ? "create_menu" : "login")}
                        />
                    </button>
                </NavLink>
                
                <NavLink to={loginStatus ? "/rankings" : "/"}>
                    <button className="btn btn-block my-2">
                        <i
                            className="icon-style fa fa-signal"
                            onClick={() => updateCurrentPath(loginStatus ? "rankings" : "login")}
                        />
                    </button>
                </NavLink>

                <NavLink to={loginStatus ? "/profile/my_profile" : "/"}>
                    <button className="btn btn-block my-2">
                        <i
                            className="icon-style fa fa-user"
                            onClick={() => updateCurrentPath(loginStatus ? "profile" : "login")}
                        />
                    
                    </button>
                </NavLink>

            </div>
{/*             
            <ul className="nav justify-content-between align-items-center footer px-3"
                style={{width: "100%", bottom: `${mode === "create" ? menu : "-45px"}`}}
            >
                <i className="icon-style fa fa-arrow-circle-o-right" style={{ color: "#222" }}/>
                <button className="btn btn-outline-secondary" onClick={clickHandlers[0]}>
                    Test Play
                </button>
                <i onClick={this.toggleMenu} className="icon-style fa fa-arrow-circle-o-down" style={{ color: "white" }}/>
            </ul>
            <ul
                className="nav justify-content-between align-items-center footer px-3"
                style={{width: "100%", bottom: `${mode === "testplay" ? menu : "-45px"}`}}
            >
                <i onClick={this.toggleMenu} className="icon-style fa fa-arrow-circle-o-down" style={{ color: "white" }}/>
                <button onClick={clickHandlers[1]} className="btn btn-outline-secondary">
                    Edit
                </button>
                <button onClick={clickHandlers[2]} className="btn btn-outline-secondary">
                    Submit
                </button>
                <i className="icon-style fa fa-arrow-circle-o-down" style={{ color: "#222" }}/>
            </ul>

            <ul
                className="nav justify-content-between align-items-center footer px-3"
                style={{width: "100%", bottom: `${mode === "play" ? menu : "-45px"}`}}
            >
                <i className="icon-style fa fa-arrow-circle-o-right" style={{ color: "#222" }}/>
                <button onClick={clickHandlers[0]} className={`btn ${clickHandlers[0] ? "" : "d-none"}`}>
                    Check Answer
                </button>
                <i onClick={this.toggleMenu} className={`icon-style fa fa-arrow-circle-o-down`} style={{ color: "white" }}/>
            </ul>

            <ul className="nav footer"
                style={{width: "100%", bottom: `${mode === "login" ? "0" : "-45px"}`}}
            >
            </ul> */}
        </div>
    )
}




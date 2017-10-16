import React, { Component } from "react";
import { NavLink } from "react-router-dom";

class Footer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			menu: "0"
		};
		this.toggleMenu = this.toggleMenu.bind(this);
	}
	componentWillMount() {
		this.setState({ menu: "0" });
	}
	componentWillReceiveProps() {
		this.setState({ menu: "0" });
	}
	toggleMenu() {
		if (this.state.menu === "0") {
			this.setState({ menu: "-45px" });
		} else {
			this.setState({ menu: "0" });
		}
	}
	render() {
		const { menu } = this.state;
		const { loginStatus } = this.props;
		return (
			<div>
				<ul className="nav justify-content-around align-items-center footer">
					<li className="nav-item">
						<NavLink to="/" className="nav-link">
							<i
								className="icon-style fa fa-home"
								onClick={() => this.props.updateCurrentPath(loginStatus ? "home" : "login")}
							/>
						</NavLink>
					</li>
					<li className="nav-item">
						<NavLink to={loginStatus ? "/play" : "/"} className="nav-link">
							<i
								className="icon-style fa fa-play"
								onClick={() => this.props.updateCurrentPath(loginStatus ? "play_menu" : "login")}
							/>
						</NavLink>
					</li>
					<li className="nav-item">
						<NavLink to={loginStatus ? "/create" : "/"} className="nav-link">
							<i
								className="icon-style fa fa-pencil"
								onClick={() => this.props.updateCurrentPath(loginStatus ? "create_menu" : "login")}
							/>
						</NavLink>
					</li>
					<li className="nav-item">
						<NavLink to={loginStatus ? "/rankings" : "/"} className="nav-link">
							<i
								className="icon-style fa fa-signal"
								onClick={() =>this.props.updateCurrentPath(loginStatus ? "rankings" : "login")}
							/>
						</NavLink>
					</li>
					<li className="nav-item">
						<NavLink to={loginStatus ? "/profile" : "/"} className="nav-link">
							<i
								className="icon-style fa fa-user"
								onClick={() => this.props.updateCurrentPath(loginStatus ? "profile" : "login")}
							/>
						</NavLink>
					</li>
					<li className={`nav-item ${this.props.mode === "home" ? "d-none" : ""}`}>
						<div className="nav-link">
							<i onClick={this.toggleMenu} className="icon-style fa fa-arrow-circle-o-up" style={{ color: "white" }}/>
						</div>
					</li>
				</ul>
				<ul className="nav justify-content-between align-items-center footer px-3"
					style={{width: "100%", bottom: `${this.props.mode === "create" ? menu : "-45px"}`}}
				>
					<i className="icon-style fa fa-arrow-circle-o-right" style={{ color: "#222" }}/>
					<button className="btn btn-outline-secondary" onClick={this.props.clickHandlers[0]}>
						Test Play
					</button>
					<i onClick={this.toggleMenu} className="icon-style fa fa-arrow-circle-o-down" style={{ color: "white" }}/>
				</ul>
				<ul
					className="nav justify-content-between align-items-center footer px-3"
					style={{width: "100%", bottom: `${this.props.mode === "testplay" ? menu : "-45px"}`}}
				>
					<i onClick={this.toggleMenu} className="icon-style fa fa-arrow-circle-o-down" style={{ color: "white" }}/>
					<button onClick={this.props.clickHandlers[1]} className="btn btn-outline-secondary">
						Edit
					</button>
					<button onClick={this.props.clickHandlers[2]} className="btn btn-outline-secondary">
						Submit
					</button>
					<i className="icon-style fa fa-arrow-circle-o-down" style={{ color: "#222" }}/>
				</ul>

				<ul
					className="nav justify-content-between align-items-center footer px-3"
					style={{width: "100%", bottom: `${this.props.mode === "play" ? menu : "-45px"}`}}
				>
					<i className="icon-style fa fa-arrow-circle-o-right" style={{ color: "#222" }}/>
					<button onClick={this.props.clickHandlers[0]} className={`btn ${this.props.clickHandlers[0] ? "" : "d-none"}`}>
						Check Answer
					</button>
					<i onClick={this.toggleMenu} className={`icon-style fa fa-arrow-circle-o-down`} style={{ color: "white" }}/>
				</ul>
			</div>
		);
	}
}

export default Footer;

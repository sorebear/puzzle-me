import React from "react";
import { NavLink } from "react-router-dom";

export default props => {
	return (
		<ul className="nav header align-items-center">
			<div className="col-3 text-left">
				<li
					className="nav-item align-self-center"
					style={{ zIndex: 2 }}
				>
					<NavLink to="/">
						<div onClick={() => props.updateCurrentPath("home")} style={{ color: "ghostwhite" }}>
							<span className="red-text">puzzle</span>me
						</div>
					</NavLink>
				</li>
			</div>
			<div className="col-6 text-center">
				<li className="nav-item">
					<h5 style={{ color: "white", margin: 0 }}>
						{props.currentTitle}
					</h5>
				</li>
			</div>
			<div className="col-3 text-right">
				<li className="nav-item" style={{ zIndex: 2 }}>
					<i className="icon-style fa fa-question-circle align-items-center" onClick={props.callModal}/>
				</li>
			</div>
		</ul>
	);
};

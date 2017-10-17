import React from "react";
import PageTitle from "./page_title";
import "./login_style.css";


export default (props) => {
	return (
		<div>
			<PageTitle backgroundImg="forestvalley" color="white" text="PUZZLE ME" subText="Please Login"/>
			<div className="container mt-5 text-center">
				<button className="loginBtn loginBtn--facebook" onClick={props.facebookLogin}>
					Login with Facebook
				</button>
			</div>
		</div>
	);
}

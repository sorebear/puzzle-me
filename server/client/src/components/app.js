import React, { Component } from "react";
import { Route, withRouter } from "react-router-dom";
import InfoModal from "./info_modal/info_modal";
import Axios from 'axios';

import Header from "./menu_items/header";
import Footer from "./menu_items/footer";
import Home from "./menu_items/home_menu";
import CreateMenu from "./menu_items/create_menu";
import PlayMenu from "./menu_items/play_menu";
import SpeckleSpackleApp from "./speckle_spackle/speckle_spackle_app";
import SpeckleSpacklePlay from "./speckle_spackle/speckle_spackle_play";
import WordGuessApp from "./word_guessing/word_guessing_app";
import WordGuessPlay from "./word_guessing/word_guessing_play";
import Rankings from "./menu_items/rankings";
import Login from "./menu_items/login_menu";
import Profile from "./menu_items/profile";

const globalInitFunction = function(res) {
	App.init(res);
};

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			showModal: "noModal",
			currentPath: "init",
			currentTitle: "",
			currentHeight: window.innerHeight,
			currentWidth: window.innerWidth,
			currentGameMode: "home",
			clickHandlers: [null, null, null],
			autoInfo: false,
			loggedIn: false,
			newUser: false,
		};
		this.URL_EXT_CHECK = '/checkLoginStatus';
		this.URL_EXT_HOME = "/home";
		this.URL_EXT_LOGIN = "/login";
		this.updateCurrentPath = this.updateCurrentPath.bind(this);
		this.updateDimensions = this.updateDimensions.bind(this);
		this.toggleAutoInfo = this.toggleAutoInfo.bind(this);
		this.facebookLogin = this.facebookLogin.bind(this);
		this.checkLoginStatus = this.checkLoginStatus.bind(this);
	}

	componentWillMount() {
		this.checkLoginStatus();
		window.addEventListener("resize", this.updateDimensions);
	}

	init(res) {
		this.checkLoginStatus();
		if (res.data.action === "created") {
			this.setState({ newUser : true })
		}
	}

	facebookLogin() {
		const user_name = this.state.username;
		FB.login(
			(response) => {
				if (response.status === "connected") {
					response.username = user_name;
					Axios.post("/login", {
						response: response
					}).then(res => this.init(res)).catch(err => {
						console.log("Error Logging In");
					});
				} else {
					console.log("Failed to log in with Facebook");
				}
			},
			{ scope: "user_friends,public_profile,email" }
		);
	}

	checkLoginStatus() {
		Axios.get(this.URL_EXT_CHECK).then((res) => {
			if (res.data.success) {
				this.setState({
					loggedIn: true
				})
			} else {
				this.props.history.push("/");
				this.setState({
					currentPath: "login",
					currentGameMode: "login",
					currentTitle: ""
				})
			}
		}).catch((err) => {
			console.log("ERROR CHECKING LOGIN");
		})
	}

	updateDimensions() {
		this.setState({
			currentHeight: window.innerHeight,
			currentWidth: window.innerWidth
		});
	}

	toggleAutoInfo() {
		if (this.state.autoInfo) {
			this.setState({ autoInfo: false });
		} else {
			this.setState({ autoInfo: true });
		}
	}

	callModal() {
		this.setState({ showModal: "showModal" });
	}

	componentWillReceiveProps() {
		this.setState({ showModal: "noModal" });
	}

	close() {
		this.setState({ showModal: "noModal" });
	}

	updateCurrentPath(
		currentPath,
		currentTitle = "",
		currentGameMode = "home",
		currentClickHandlers = [null, null, null]
	) {
		this.checkLoginStatus();
		this.setState({
			currentPath: currentPath,
			currentTitle: currentTitle,
			currentGameMode: currentGameMode,
			clickHandlers: currentClickHandlers
		});
		if (this.state.autoInfo && (
			currentPath !== "play_menu" &&
			currentPath !== "create_menu" &&
			currentPath !== "profile"
		)) 	
			{
				setTimeout(() => { this.setState({ showModal: "showModal" });
			}, 500);
		}
	}

	render() {
		const {
			currentHeight,
			currentWidth,
			currentPath,
			currentGameMode,
			currentTitle,
			clickHandlers,
			showModal,
			autoInfo,
			loggedIn,
			userInfo
		} = this.state;
		return (
			<div>
				<InfoModal
					toggleAutoInfo={this.toggleAutoInfo}
					autoInfo={autoInfo}
					showModal={showModal}
					closeModal={() => { this.close(); }}
					currentPath={currentPath}
				/>
				<Header
					updateCurrentPath={this.updateCurrentPath}
					currentTitle={currentTitle}
					callModal={() => { this.callModal(); }}
				/>
				<div className="mainViewingWindow" style={
					{
						height: currentHeight - 90,
						width: currentWidth,
					}
				}>
					<Route exact path="/" 
						render={!loggedIn ? 
							() => <Login facebookLogin={this.facebookLogin}/> : 
							(props) => 
							<Home {...props} 
								toggleAutoInfo={this.toggleAutoInfo} 
								autoInfo={autoInfo} 
								updateCurrentPath={this.updateCurrentPath}
								userInfo={userInfo}
							/>
						}
					/>
					<Route exact path="/play" component={PlayMenu} />
					<Route path="/play/word_guess/:game_id" render={
						props => (
							<WordGuessPlay {...props} updateCurrentPath={this.updateCurrentPath}/>
						)
					}/>
					<Route path="/play/speckle_spackle/:game_id" render={
						props => (
							<SpeckleSpacklePlay {...props} updateCurrentPath={this.updateCurrentPath}/>
						)}
					/>
					<Route exact path="/create" component={CreateMenu} />
					<Route path="/create/word_guess" render={
						() => (
							<WordGuessApp updateCurrentPath={this.updateCurrentPath}/>
						)}
					/>
					<Route path="/create/speckle_spackle" render={
						() => (
							<SpeckleSpackleApp updateCurrentPath={this.updateCurrentPath}/>
						)}
					/>
					<Route exact path="/rankings" component={Rankings} />
					<Route path="/profile/:user_id" component={Profile} />
				</div>
				<Footer 
					mode={currentGameMode} 
					clickHandlers={clickHandlers} 
					updateCurrentPath={this.updateCurrentPath}
					loginStatus={loggedIn}
				/>
			</div>
		);
	}
}

export default withRouter(App);

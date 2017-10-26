import React, { Component } from "react";
import { Route, withRouter } from "react-router-dom";
import InfoModal from "./info_modal/info_modal";
import Axios from 'axios';

import Header from "./menu_items/header";
import Footer from "./menu_items/footer";
import LeftMenu from "./menu_items/left_menu";
import RightMenu from "./menu_items/right_menu";
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
			console.log("ERROR CHECKING LOGIN", err);
		})
	}

	init(res) {
		this.checkLoginStatus();
		if (res.data.action === "created") {
			this.setState({ 
				newUser : true,
				autoInfo : true
			})
		}
	}

	generateRandomID(length=6){
		let potentials = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
		let output = '';
		for(let i=0; i<length; i++){
		  output += potentials[( (Math.random() * potentials.length) >> 0 )];
		}
		return output;
	}

	facebookLogin() {
		const user_name = 'user' + this.generateRandomID();
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
			currentPath !== "create_menu" 
		)) 	
			{
				setTimeout(() => { this.setState({ showModal: "showModal" });
			}, 500);
		}
	}

	leftOrBottomMenu() {
		const { currentHeight, currentWidth, currentGameMode, clickHandlers, loggedIn } = this.state;
		if (currentWidth > currentHeight) {
			return (
				<LeftMenu 
					height={currentHeight} 
					width={(currentWidth - currentHeight * .65)/2} 
					mode={currentGameMode}
					clickHandlers={clickHandlers}
					updateCurrentPath={this.updateCurrentPath}
					loginStatus={loggedIn}
					callModal={() => this.callModal()}
				/>
			)
		} else {
			return (
				<Footer 
					mode={currentGameMode} 
					clickHandlers={clickHandlers} 
					updateCurrentPath={this.updateCurrentPath}
					loginStatus={loggedIn}
				/>
			)
		}
	}

	rightOrHeaderMenu() {
		const { 
			currentWidth, 
			currentHeight, 
			currentTitle, 
			currentPath, 
			clickHandlers, 
			currentGameMode 
		} = this.state;
		if (currentWidth > currentHeight) {
			return (
				<RightMenu 
					height={currentHeight} 
					width={(currentWidth - currentHeight * .65)/2} 
					mode={currentGameMode}
					updateCurrentPath={this.updateCurrentPath}
					clickHandlers={clickHandlers}
					currentTitle={currentTitle}
					currentPath={currentPath}
					callModal={() => this.callModal()}
				/>
			)
		} else {
			return (
				<Header
					updateCurrentPath={this.updateCurrentPath}
					currentTitle={currentTitle}
					callModal={() => this.callModal() }
				/>
			)
		}
	}

	render() {
		const {
			currentHeight,
			currentWidth,
			currentPath,
			showModal,
			autoInfo,
			loggedIn,
			userInfo,
			newUser
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
				{this.rightOrHeaderMenu()}
				<div className="mainViewingWindow" style={
					{
						height: currentWidth > currentHeight ? currentHeight : currentHeight - 90,
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
								newUser={newUser}
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
				{this.leftOrBottomMenu()}
			</div>
		);
	}
}

export default withRouter(App);

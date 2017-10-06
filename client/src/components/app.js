import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import InfoModal from './info_modal/info_modal';

import Header from '../header';
import Footer from '../footer';
import Home from './home_menu';
import CreateMenu from './create_menu';
import PlayMenu from './play_menu';
import SpeckleSpackleApp from './speckle_spackle/speckle_spackle_app';
import SpeckleSpacklePlay from './speckle_spackle/speckle_spackle_play';
import UnBlockApp from './unblock_me/un_block_app';
import UnBlockPlay from './unblock_me/un_block_play';
import WordGuessApp from './word_guessing/word_guessing_app';
import WordGuessPlay from './word_guessing/word_guessing_play';
import Rankings from './rankings';
import Login from './login';

import Profile from './profile';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal : "noModal",
            currentPath : "home",
            currentTitle : "",
            currentHeight : window.innerHeight,
            currentWidth : window.innerWidth,
            currentGameMode : 'menu',
            clickHandlers : [null, null, null],
            autoInfo : false
        }
        this.updateCurrentPath = this.updateCurrentPath.bind(this);
        this.updateDimensions = this.updateDimensions.bind(this);
        this.toggleAutoInfo = this.toggleAutoInfo.bind(this);
    }
    componentWillMount() {
        window.addEventListener("resize", this.updateDimensions);
    }
    updateDimensions() {
        // console.log("Window is being resized");
        // console.log("Window height: ", window.innerHeight);
        // console.log("Window width: ", window.innerWidth);
        this.setState({
            currentHeight: window.innerHeight,
            currentWidth : window.innerWidth
        })
    }

    toggleAutoInfo() {
        if (this.state.autoInfo) {
            this.setState({ autoInfo: false })
        } else {
            this.setState({ autoInfo: true })
        }
    }

    callModal() {
        this.setState({ showModal : "showModal" })  
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ showModal: "noModal" })
    }

    close() {
        this.setState({ showModal: "noModal" })
    }

    updateCurrentPath(currentPath, currentTitle = "", currentGameMode = 'home', currentClickHandlers = [null, null, null]) {
        this.setState({
            currentPath : currentPath,
            currentTitle : currentTitle,
            currentGameMode : currentGameMode,
            clickHandlers : currentClickHandlers
        });
        if (this.state.autoInfo && (currentPath !== "play_menu" && currentPath !== "create_menu" && currentPath !== "profile")) {
            setTimeout(() => {
                this.setState({ showModal: "showModal" })
            }, 500)
        }
    }

    render() {
        const { currentHeight, currentWidth, currentPath, currentGameMode, currentTitle, clickHandlers, showModal, autoInfo } = this.state;
        return (
            <div>
                <InfoModal toggleAutoInfo={this.toggleAutoInfo} autoInfo={autoInfo} showModal={showModal} closeModal={() => {this.close()}} currentPath={currentPath} />
                <Header updateCurrentPath={this.updateCurrentPath} currentTitle={currentTitle} callModal={() => {this.callModal()}}/>
                    <div className="mainViewingWindow" style={{height: currentHeight-100, width: currentWidth, position: "relative"}}>
                        <Route exact path="/" render={(props) => <Home {...props} toggleAutoInfo={this.toggleAutoInfo} autoInfo={autoInfo} updateCurrentPath={this.updateCurrentPath} />} />
                        <Route path="/home" render={(props) => <Home {...props} toggleAutoInfo={this.toggleAutoInfo} autoInfo={autoInfo} updateCurrentPath={this.updateCurrentPath} />} />
            
                        <Route exact path="/play" component={PlayMenu} />
                        <Route path="/play/word_guess/:game_id" render={(props) => <WordGuessPlay {...props} updateCurrentPath={this.updateCurrentPath} />} />
                        <Route path="/play/speckle_spackle/:game_id" render={(props) => <SpeckleSpacklePlay {...props} updateCurrentPath={this.updateCurrentPath} />} />
                        <Route path="/play/unblock_me/:game_id" render={(props) => <UnBlockPlay {...props} updateCurrentPath={this.updateCurrentPath} />} />
            
                        <Route exact path="/create" component={CreateMenu} />
                        <Route path="/create/word_guess" render={() => <WordGuessApp updateCurrentPath={this.updateCurrentPath} />} />
                        <Route path="/create/speckle_spackle" render={() => <SpeckleSpackleApp updateCurrentPath={this.updateCurrentPath} />} />
                        <Route path="/create/unblock_me" render={() => <UnBlockApp updateCurrentPath={this.updateCurrentPath} />} />
            
                        <Route exact path="/rankings" component={Rankings} />
            
                        <Route path="/login" component={Login} />
                        <Route path="/profile" component={Profile} />
                    </div>
                <Footer mode={currentGameMode} clickHandlers={clickHandlers} updateCurrentPath={this.updateCurrentPath}/>
            </div>
        );
    }
} 

export default App;

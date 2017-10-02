import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import InfoModal from './info_modal/info_modal';

import Header from '../header';
import Footer from '../footer';
import Home from './home';
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


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal : "noModal",
            currentPath : "home"
        }
        this.updateCurrentPath = this.updateCurrentPath.bind(this);
    }
    callModal() {
        this.setState({
            showModal : "showModal"
        })  
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            showModal: "noModal"
        })
    }

    close() {
        this.setState({
            showModal: "noModal"
        })
    }

    updateCurrentPath(currentPath) {
        this.setState({
            currentPath : currentPath
        })
    }

    render() {
        return (
            <div>
                <InfoModal showModal={this.state.showModal} closeModal={() => {this.close()}} currentPath={this.state.currentPath} />
                <Header callModal={() => {this.callModal()}}/>
                <Route exact path="/" component={Home} />
                <Route path="/home" component={Home} />
    
                <Route exact path="/play" component={PlayMenu} />
                <Route path="/play/word_guess" render={(props) => <WordGuessPlay {...props} updateCurrentPath={this.updateCurrentPath} />} />
                <Route path="/play/speckle_spackle" render={(props) => <SpeckleSpacklePlay {...props} updateCurrentPath={this.updateCurrentPath} />} />
                <Route path="/play/unblock_me" render={(props) => <UnBlockPlay {...props} updateCurrentPath={this.updateCurrentPath} />} />
    
                <Route exact path="/create" component={CreateMenu} />
                <Route path="/create/word_guess" render={() => <WordGuessApp updateCurrentPath={this.updateCurrentPath} />} />
                <Route path="/create/speckle_spackle" render={() => <SpeckleSpackleApp updateCurrentPath={this.updateCurrentPath} />} />
                <Route path="/create/unblock_me" render={() => <UnBlockApp updateCurrentPath={this.updateCurrentPath} />} />
    
                <Route exact path="/rankings" component={Rankings} />
    
                <Route path="/login" component={Login} />
                <Route path="/profile" component={Login} />
                <Footer updateCurrentPath={this.updateCurrentPath}/>
            </div>
        );
    }
} 

export default App;

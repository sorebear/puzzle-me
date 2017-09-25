import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import InfoModal from './info_modal';

import Header from '../header';
import Footer from '../footer';
import Home from './home';
import CreateMenu from './create_menu';
import PlayMenu from './play_menu';
import SpeckleSpackleApp from './speckle_spackle/speckle_spackle_app';
import SpeckleSpacklePlay from './speckle_spackle/speckle_spackle_play'
import WordGuessingApp from './word_guessing/word_guessing_app'
import WordGuessPlay from './word_guessing/word_guessing_play'
import Rankings from './rankings';
import Login from './login';

import UnBlockApp from './unblock_me/un_block_app'


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal : "noModal",
        }
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

    render() {
        return (
            <Router>
                <div>
                    <InfoModal showModal={this.state.showModal} closeModal={() => {this.close()}}  />
                    <Header callModal={() => {this.callModal()}}/>
                    <Route exact path="/" component={Home} />
                    <Route path="/home" component={Home} />
        
                    <Route exact path="/play" component={PlayMenu} />
                    <Route path="/play/word_guess" component={WordGuessPlay} />
                    <Route path="/play/speckle_spackle" component={SpeckleSpacklePlay} />
        
                    <Route exact path="/create" component={CreateMenu} />
                    <Route path="/create/word_guess" component={WordGuessingApp} />
                    <Route path="/create/speckle_spackle" component={SpeckleSpackleApp} />
                    <Route path="/create/unblock_me" component={UnBlockApp}/>
        
                    <Route exact path="/rankings" component={Rankings} />
        
                    <Route exact path="/gladiator" component={Home} />
        
                    <Route path="/login" component={Login} />
                    <Route path="/profile" component={Login} />
                    <Footer />
                </div>
            </Router>
        );
    }
} 

export default App;

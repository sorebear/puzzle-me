import React, { Component } from 'react';
import SpeckleSpackleApp from './speckle_spackle/speckle_spackle_app';
import WordGuessingApp from './word_guessing/word_guessing_app'
import WordGuessPlay from './word_guessing/word_guessing_play'
import Footer from '../footer';
import Header from '../header';
import Home from './home';
import CreateMenu from './create_menu';
import PlayMenu from './play_menu';
import Login from './login';
import InfoModal from './info_modal';
import Rankings from './rankings';

import {BrowserRouter as Router, Route} from 'react-router-dom';

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
                    <Route path="/play/word_guessing" render={() => <WordGuessPlay gameInfo={null} />} />
        
                    <Route exact path="/create" component={CreateMenu} />
                    <Route path="/create/word_guessing" component={WordGuessingApp} />
                    <Route path="/create/speckle_spackle" component={SpeckleSpackleApp} />
        
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

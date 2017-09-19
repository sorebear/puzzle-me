import React from 'react';
import SpeckleSpackleApp from './speckle_spackle/speckle_spackle_app';
import WordGuessingApp from './word_guessing/word_guessing_app'
import WordGuessPlay from './word_guessing/word_guessing_play'
import Footer from '../footer';
import Header from '../header';
import Home from './home';
import Create from './create';
import Play from './play';
import Login from './login';

import {BrowserRouter as Router, Route} from 'react-router-dom';

const App = () => (
    <Router>
        <div>
            <Header />
            <Route exact path="/" component={Home} />

            <Route exact path="/play" component={Play} />
            <Route path="/play/word_guess" render={() => <WordGuessPlay gameInfo={null} />} />

            <Route exact path="/create" component={Create} />
            <Route path="/create/word_guessing" component={WordGuessingApp} />
            <Route path="/create/speckle_spackle" component={SpeckleSpackleApp} />

            <Route exact path="/rankings" component={Home} />

            <Route exact path="/gladiator" component={Home} />

            <Route path="/login" component={Login} />
            <Route path="/profile" component={Login} />
            <Footer />
        </div>
    </Router>
);

export default App;

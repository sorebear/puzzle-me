import React from 'react';
import ReactDOM from 'react-dom';
import SudoSudokuApp from './components/sudosudoku/sudo_sudoku_app';
import WordGuessingApp from './components/word_guessing/word_guessing_app';
import Footer from './footer';
import Header from './header';
import Home from './components/home'
import {BrowserRouter as Router, Route} from 'react-router-dom';

import App from './components/app';

ReactDOM.render(
    <Router>
        <div>
            <Header />
            <Route exact path="/" component={Home} />
            <Route path="/play" component={WordGuessingApp} />
            <Route path="/create" component={Home} />
            <Route path="/rankings" component={Home} />
            <Route path="/profile" component={Home} />
            <Footer />
        </div>
    </Router>,
    document.getElementById('root')
);

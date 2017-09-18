import React from 'react';
import ReactDOM from 'react-dom';
import SudoSudokuApp from './components/sudosudoku/sudo_sudoku_app';
import WordGuessingApp from './components/word_guessing/word_guessing_app'
import Footer from './footer';
import Header from './header';
import Home from './components/home';
import Create from './components/create';
import Play from './components/play';
import Login from './components/login';

import {BrowserRouter as Router, Route} from 'react-router-dom';

ReactDOM.render(
    <Router>
        <div>
            <Header />
            <Route exact path="/" component={Home} />
            <Route path="/play" component={Play} />
            <Route path="/create" component={Create} />
            <Route path="/word_guessing" component={WordGuessingApp} />
            <Route path="/profile" component={Home} />
            <Route path="/login" component={Login}/>
            <Footer />
        </div>
    </Router>,
    document.getElementById('root')
);

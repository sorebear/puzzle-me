import React, { Component } from 'react';
import Axios from 'axios';

class WordGuessPlay extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            guess : "",
            guessHistory : null
        }
        this.puzzle_name = null;
        this.hiddenWord = null
        this.numOfStartingWords = null

        this.URL_EXT = '/puzzles';
        this.QUERY_KEY = 'url_ext';
        this.QUERY_VAL = props.location.pathname.substr(17);
        this.updateData = this.updateData.bind(this);
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillMount() {
        this.getData();
        this.props.updateCurrentPath("word_guessing_play");
    }

    getData() {
        Axios.get(this.URL_EXT + '?' + this.QUERY_KEY + '=' + this.QUERY_VAL).then(this.updateData).catch(err => {
            console.log("Error Loading Puzzle: ", err);
        });
    }

    updateData(response){
        const receivedData = response.data.data[0];
        console.log("Received Data: ", receivedData);
        const gameInfo = JSON.parse(receivedData.puzzle_object);
        gameInfo.startingWords.shift();
        this.hiddenWord = gameInfo.hiddenWord
        this.numOfStartingWords = gameInfo.startingWords.length;
        this.puzzle_name = receivedData.puzzle_name;
        this.setState({
            guessHistory : gameInfo.startingWords
        });
    }

    onChangeHandler(event) {
        this.setState({
            guess: event.target.value.toUpperCase()
        })
    }

    resetInput() {
        this.setState({
            guess: ""
        })
    }

    wrongLength() {
        console.log(`${this.state.guess} Is Not ${this.hiddenWord.length}-Letters Long`);
        this.resetInput();
    }

    handleSubmit(event) {
        event.preventDefault();
        if (this.state.guess.length !== this.hiddenWord.length) {
            this.wrongLength();
        } else {
            this.evaluateGuess();
        }
    }

    handleWin(numOfGuesses) {
        console.log(`You Won in ${numOfGuesses - this.numOfStartingWords} Moves`)
    }

    evaluateGuess() {
        let hiddenWordArr = this.hiddenWord.split('');
        let guessArr = this.state.guess.split('');
        let correctLetter = 0
        let correctPosition = 0
        for (let i = 0; i < hiddenWordArr.length; i++) {
            if (hiddenWordArr[i] === guessArr[i]) {
                correctLetter++
                correctPosition++
                hiddenWordArr.splice(i, 1, " ");
                guessArr.splice(i, 1, " ");
            } 
        }
        for (let i = 0; i < hiddenWordArr.length; i++) {
            if (guessArr[i] === " ") {

            } else if (hiddenWordArr.indexOf(guessArr[i]) !== -1) {
                correctLetter++
                hiddenWordArr.splice(hiddenWordArr.indexOf(guessArr[i]), 1, " ")
            }
        }
        this.displayResult(correctLetter, correctPosition)
    }

    displayResult(correctLetter, correctPosition) {
        let { guessHistory } = this.state;
        guessHistory.unshift({
            guess : this.state.guess,
            correctLetter : correctLetter,
            correctPosition : correctPosition
        })
        if (correctPosition === this.hiddenWord.length) {
            this.handleWin(guessHistory.length);
        }
        this.setState({
            guess : "",
            guessHistory : [...guessHistory]
        })
    }

    render() {
        const { guessHistory } = this.state;
        if (guessHistory === null) {
            return <h1>Loading...</h1>
        }
        const switchPoint = guessHistory.length - this.numOfStartingWords;
        const guessHistoryList = guessHistory.map((item, index) => {
            if (index < switchPoint) {
                return <li key={index} className="list-group-item justify-content-between">
                    {item.guess} : {item.correctLetter} - {item.correctPosition}
                    <span style={{color : "lightgrey"}}>{switchPoint - index}</span>
                </li>
            } else {
                return <li key={index} className="list-group-item list-group-item-info">{
                    item.guess} : {item.correctLetter} - {item.correctPosition}
                    
                </li>
            }
        })
        return (
            <div>
                <h2 className="puzzle_name">{this.puzzle_name}</h2>
                <div className="container mt-4">
                    <h3 className="text-center p-2">Guess This {this.hiddenWord.length}-Letter Word</h3>
                    <form onSubmit={this.handleSubmit}>
                        <input onChange={this.onChangeHandler} maxLength={this.hiddenWord.length} value={this.state.guess} className="form-control"/>
                        <div className="text-center">
                            <button className="btn btn-outline-danger m-2">Guess</button>
                            <ul className="list-group">{guessHistoryList}</ul>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default WordGuessPlay;



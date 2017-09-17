import React, { Component } from 'react';
import dummyData from './word_guessing_dummy_data';

class WordGuessingCreate extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            hiddenWord : "",
            startingWords : props.gameInfo.startingWords
        }
        this.hiddenWord = props.gameInfo.hiddenWord;
        this.hiddenWordChangeHandler = this.hiddenWordChangeHandler.bind(this); 
        this.clueChangeHandler = this.clueChangeHandler.bind(this);
        this.addClue = this.addClue.bind(this);
    }

    passUpGameInfo () {
        this.props.gameInfoCallback(this.state);
    }

    hiddenWordChangeHandler(event) {
        this.setState({
            hiddenWord: event.target.value.toUpperCase()
        })
    }

    clueChangeHandler(event) {
        const { startingWords } = this.state;
        startingWords[0] = event.target.value.toUpperCase();
        this.setState({
            startingWords : startingWords
        })
    }

    addClue(event) {
        event.preventDefault();
        const { startingWords, hiddenWord } = this.state;
        if (startingWords[0].length !== hiddenWord.length) {return}
        startingWords[0] = {
            guess : startingWords[0],
            correctLetter : null,
            correctPosition : null
        }
        startingWords.unshift("");
        this.evaluateClues(startingWords)
    }

    // wrongLength() {
    //     console.log(`${this.state.guess} Is Not ${this.hiddenWord.length}-Letters Long`);
    // }

    // handleSubmit(event) {
    //     event.preventDefault();
    //     if (this.state.guess.length !== this.hiddenWord.length) {
    //         this.wrongLength();
    //     } else {
    //         this.evaluateClues();
    //     }
    // }

    evaluateClues(startingWords) {
        const updatedStartingWords = startingWords.map((word, index) => {
            if (index === 0) { return "" }
            let hiddenWordArr = this.state.hiddenWord.split('');
            let guessArr = word.guess.split('');
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
            return ({
                guess : word.guess,
                correctLetter : correctLetter,
                correctPosition : correctPosition
            })
        })
        this.setState({
            startingWords : updatedStartingWords
        })
        this.passUpGameInfo();
    }

    // displayResult(correctLetter, correctPosition) {
    //     let { guessHistory } = this.state;
    //     guessHistory.unshift({
    //         guess : this.state.guess,
    //         correctLetter : correctLetter,
    //         correctPosition : correctPosition
    //     })
    //     this.setState({
    //         guess : "",
    //         guessHistory : guessHistory
    //     })
    //     if (correctPosition === this.hiddenWord.length) {
    //         this.handleWin(guessHistory.length);
    //     }
    // }

    render() {
        console.log(this.state)
        const { startingWords } = this.state;
        const startingWordsList = startingWords.map((item, index) => {
            if (index === 0) {return} 
            return (
                <li key={index} className="list-group-item list-group-item-info">
                    {item.guess} : {item.correctLetter} - {item.correctPosition}
                </li>
            )
        })
        return (
            <div className="container">
                <h3 className="text-center p-2">Pick a 4-6-Letter Word</h3>
                <input 
                    onChange={this.hiddenWordChangeHandler}
                    onBlur={this.addClue}
                    maxLength={6}
                    value={this.state.hiddenWord} 
                    className="form-control" 
                    placeholder="...Pick Your Hidden Number"
                />
                <br/>
                <form onSubmit={this.addClue}>
                    <div className="text-center">
                    <ul className="list-group">
                            <input
                                onChange={this.clueChangeHandler}
                                onBlur={this.addClue}
                                className="form-control"
                                value={startingWords[0]} 
                                placeholder="...Give A Clue">
                            </input>
                        </ul>
                        <ul className="list-group">{startingWordsList}</ul>
                    </div>
                </form>
            </div>
        )
    }
}

export default WordGuessingCreate



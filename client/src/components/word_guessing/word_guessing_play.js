import React, {Component} from 'react';

class WordGuessingPlay extends Component {
    constructor(props) {
        super(props);
        this.hiddenWord = props.hiddenWord;
        this.state = {
            guess: "",
            guessHistory: props.prelimGuesses
        }
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
    evaluateGuess(event) {
        event.preventDefault();
        if (this.state.guess.length !== this.hiddenWord.length) {
            this.wrongLength();
            return;
        }
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
        console.log(`${this.state.guess}: ${correctLetter} letters are correct. ${correctPosition} are also in the right position`);
        
        var guessHistoryArray = this.state.guessHistory;

        guessHistoryArray.unshift({
            guess : this.state.guess,
            correctLetter : correctLetter,
            correctPosition : correctPosition
        })

        this.setState({
            guess : "",
            guessHistory : guessHistoryArray
        })
    }
    render() {
        const { guessHistory } = this.state;
        const guessHistoryList = guessHistory.map((item, index) => {
            console.log(index, item)
            return <li key={index} className="list-group-item text-center">{item.guess} : {item.correctLetter} - {item.correctPosition}</li>
        })
        return (
            <div className="container">
                <h3 className="text-center p-2">Guess This {this.hiddenWord.length}-Letter Word</h3>
                <form onSubmit={this.evaluateGuess}>
                    <input onChange={this.onChangeHandler} maxLength={this.hiddenWord.length} value={this.state.guess} className="form-control"/>
                    <div className="text-center">
                        <button className="btn btn-outline-danger m-2">Submit Guess</button>
                        <ul className="list-group">{guessHistoryList}</ul>
                    </div>
                </form>
            </div>
        )
    }
}


export default WordGuessingPlay;
//Import the necessary modules
import React, { Component } from 'react';
import Axios from 'axios';

class WordGuessPlay extends Component {
    constructor(props) {
        super(props);
        //Initializing the majority of variables and state as null, to be set by the results of an Axios server request
        this.state = { 
            guess : "",
            guessHistory : null
        }
        this.puzzle_name = null;
        this.hiddenWord = null;
        this.numOfStartingWords = null;

        //Information needed to make an Axios Call to the Server
        this.URL_EXT = '/puzzles';
        this.QUERY_KEY = 'url_ext';
        this.QUERY_VAL = props.location.pathname.substr(17);

        //Bound Methods to preserve the meaning of "THIS" to refer to the class WordGuessPlay
        this.updateData = this.updateData.bind(this);
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    //When the Component Mounts Call The getData method and notify the Parent Component through the passed callback function
    componentWillMount() {
        this.getData();
        this.props.updateCurrentPath("word_guess_play");
    }

    //Make an Axios call to retrieve all the information for the puzzle whose URL_EXT matches the QUERY_VAL
    getData() {
        Axios.get(this.URL_EXT + '?' + this.QUERY_KEY + '=' + this.QUERY_VAL)
        .then(this.updateData).catch(err => {
            console.log("Error Loading Puzzle: ", err);
        });
    }

    //If the Axios call is successful, update this Classes variables and state with the retrieved information
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

    //When a user types something into the input, update the state with the new input value and make it all capital letters
    onChangeHandler(event) {
        this.setState({
            guess: event.target.value.toUpperCase()
        })
    }

    //Resets the input to empty
    resetInput() {
        this.setState({
            guess: ""
        })
    }

    //When a user submits a guess, check if the submitted word is the same length as the hidden word
    handleSubmit(event) {
        event.preventDefault();
        //If the length of the submitted word does not match the hidden word execute wrongLength()
        if (this.state.guess.length !== this.hiddenWord.length) {
            this.wrongLength();
        //If the length of the submitted word does match the hidden word, evaluate that guess
        } else {
            this.evaluateGuess();
        }
    }

    //Reset the Input after an invalid guess
    wrongLength() {
        console.log(`${this.state.guess} Is Not ${this.hiddenWord.length}-Letters Long`);
        this.resetInput();
    }

    //Compares the user's guessed word with the hidden word
    evaluateGuess() {
        //Make Arrays from the hidden word string and the guessed word string
        let hiddenWordArr = this.hiddenWord.split('');
        let guessArr = this.state.guess.split('');
        //Initialize counters for number of correct letters and number of those also in the correct position
        let correctLetter = 0
        let correctPosition = 0
        //Iterate through the whole array
        for (let i = 0; i < hiddenWordArr.length; i++) {
            //If the letter and position is the same in both words: increase both counters and splice the letter out of each array
            if (hiddenWordArr[i] === guessArr[i]) {
                correctLetter++
                correctPosition++
                hiddenWordArr.splice(i, 1, " ");
                guessArr.splice(i, 1, " ");
            } 
        }
        //Iterate through the array again
        for (let i = 0; i < hiddenWordArr.length; i++) {
            //If the guess array at the current position was previously spliced, do nothing
            if (guessArr[i] === " ") { } 
            //If the current letter of guess array is somewhere in the hidden array, increase the correct letter counter and splice the letter out of the hidden word array
            else if (hiddenWordArr.indexOf(guessArr[i]) !== -1) {
                correctLetter++
                hiddenWordArr.splice(hiddenWordArr.indexOf(guessArr[i]), 1, " ")
            }
        }
        //Call the updateGuessHistory() Method with the final values of each counter as arguments
        this.updateGuessHistory(correctLetter, correctPosition)
    }

    //
    updateGuessHistory(correctLetter, correctPosition) {
        let { guessHistory } = this.state;
        //Add a new object to the beginning of the guessHistory array with information about the current guess
        guessHistory.unshift({
            guess : this.state.guess,
            correctLetter : correctLetter,
            correctPosition : correctPosition
        })
        //If the user got every letter correct and in the correct position, trigger the win condition
        if (correctPosition === this.hiddenWord.length) {
            this.handleWin(guessHistory.length);
        }
        //Otherwise set the state to the updated guessHistory array and reset the guess input
        this.setState({
            guess : "",
            guessHistory : [...guessHistory]
        })
    }

    //Notify the user they have correctly guessed the hidden word and the number of guesses it took them
    handleWin(numOfGuesses) {
        console.log(`You Won in ${numOfGuesses - this.numOfStartingWords} Moves`)
    }

    render() {
        const { guessHistory } = this.state;
        //Before guessHistory is defined from the result of the Axios request, display "Loading..." on the page
        if (guessHistory === null) {
            return <h1>Loading...</h1>
        }
        //Differentiate which portion of the Guess History was pre-supplied and which was user guesses
        const switchPoint = guessHistory.length - this.numOfStartingWords;
        //Map through all the objects in the Guess History Array and return JSX list items for each one
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
        //Return the Title, Guess Input, Submit Button, and all GuessHistory List Items to the DOM
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

//Export the WordGuessPlay Component
export default WordGuessPlay;



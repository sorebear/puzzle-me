//This is the primary component for a Word Guess Game, in which the user is trying to guess a hidden word.
//The user is given feedback after every guess about how accurate or inaccurate their guess was.

//Import the necessary modules
import React, { Component } from 'react';
import Axios from 'axios';
//Import the Modal which will be displayed when the user wins the game
import WinModal from './win_modal';

Axios.defaults.headers.common['Access-Control-Allow-Origin'] = 'http://localhost:4000';
Axios.defaults.withCredentials = true;
class WordGuessPlay extends Component {
    constructor(props) {
        super(props);
        //Initializing the majority of variables and state as null, to be set by the results of an Axios server request
        this.state = { 
            guess : "",
            guessHistory : null,
            showWinModal: "noModal",
            error_handler: null
        }
        this.queryID = null;
        this.hiddenWord = null;
        this.numOfStartingWords = null;

        //Information needed to make an Axios Call to the Server
        this.GET_URL_EXT = '/puzzles';
        this.QUERY_KEY = 'url_ext';
        this.QUERY_VAL = props.match.params.game_id; //retrieves the URL_EXT by pulling off the end of the current path
        this.POST_URL_EXT = '/puzzleComplete';

        //Bound Methods - to preserve the meaning of "THIS" to refer to the class WordGuessPlay
        this.updateData = this.updateData.bind(this);
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.handleGuess = this.handleGuess.bind(this);
        this.successfulSubmit = this.successfulSubmit.bind(this);
        this.failedSubmit = this.failedSubmit.bind(this);
    }

    //When Component Mounts call the getData() method and notify the Parent Component through the passed callback function
    componentWillMount() {
        this.getData();
    }

    //Make an Axios call to retrieve all the information for the puzzle whose URL_EXT matches the QUERY_VAL
    getData() {
        Axios.get(this.GET_URL_EXT + '?' + this.QUERY_KEY + '=' + this.QUERY_VAL).then(this.updateData).catch(this.failedRetrieval);
    }

    //If the Axios call is successful, update this Classes variables and state with the retrieved information
    updateData(response){
        const receivedData = response.data.data[0];
        const gameInfo = JSON.parse(receivedData.puzzle_object);
        gameInfo.startingWords.shift();
        this.hiddenWord = gameInfo.hiddenWord
        this.numOfStartingWords = gameInfo.startingWords.length;
        this.queryID = receivedData.url_ext;
        this.props.updateCurrentPath("word_guess_play", receivedData.puzzle_name, 'play');
        this.setState({
            guessHistory : gameInfo.startingWords
        });
    }

    //If the axios call fails, update the state of error_handler with an error message. 
    failedRetrieval() {
        this.setState({
            error_handler : "We were not able to load this puzzle. Please try another puzzle or try again later"
        })
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
    handleGuess(event) {
        event.preventDefault();
        //If the length of the submitted word and the hidden word does not match, reset the guess input
        if (this.state.guess.length !== this.hiddenWord.length) {
            this.resetInput();
        //If the length of the submitted word and the hidden word match, evaluate that guess
        } else {
            this.evaluateGuess();
        }
    }

    //Compares the guessed word with the hidden word
    evaluateGuess() {
        //Make Arrays from the hidden word string and the guessed word string
        let hiddenWordArr = this.hiddenWord.split('');
        let guessArr = this.state.guess.split('');
        //Initialize counters for number of correct letters and number of corret letters also in the correct position
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
            //If the current letter of guess array exists in hidden array, increase the correct letter counter and splice the letter out of the hidden word array
            else if (hiddenWordArr.indexOf(guessArr[i]) !== -1) {
                correctLetter++
                hiddenWordArr.splice(hiddenWordArr.indexOf(guessArr[i]), 1, " ")
            }
        }
        //Call the updateGuessHistory() Method with the final values of each counter as arguments
        this.updateGuessHistory(correctLetter, correctPosition)
    }

    //Add the current user to the composite guess history
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
            this.submitCompletion();
        }
        //Otherwise set the state to the updated guessHistory array and reset the guess input
        this.setState({
            guess : "",
            guessHistory : [...guessHistory]
        })
    }

    //When the puzzle is completed, update the database with the user's completion time.
    submitCompletion(req, res) {
        Axios.post(this.POST_URL_EXT, {
            //Calculate the completion time by the number of user guesses x 10
            completionTime : (this.state.guessHistory.length - this.numOfStartingWords) * 10,
            queryID : this.queryID,
        }).then(this.successfulSubmit).catch(this.failedSubmit);
    }

    //On successful submit, open the WinModal to notify the user of their win, of their score, and of successful submittal
    successfulSubmit() {
        this.setState({
            showWinModal : "showModal"
        })
    }

    //On failed submit, open the WinModal to notify the user they won and notify them there was an issue submitting their score
    failedSubmit() {
        this.setState({
            error_handler : "Unfortunately, there was an issue submitting your score.",
            showWinModal : "showModal"
        })
    }

    //A function to close the WinModal, which will be passed to the modal and applied as a click handler
    closeModal() {
        this.setState({
            showWinModal: "noModal"
        })
    }

    render() {
        const { guessHistory, error_handler } = this.state;
        //Check if guessHistory has been defined from the result of the Axios request
        if (guessHistory === null) {
            //If there are no errors, display "Loading...", if there are erros, display the errors
            if (error_handler === null) {
                return <h1>Loading...</h1>
            }
            return (
                <div className="text-center">
                    <h1 className="my-5">Error</h1>
                    <p>{error_handler}</p>
                </div>
            )
        }
        //Differentiate which portion of the Guess History was pre-supplied and which was user guesses
        const switchPoint = guessHistory.length - this.numOfStartingWords;
        //Map through all the objects in the Guess History Array and return JSX list items for each one
        const guessHistoryList = guessHistory.map((item, index) => {
            return (
                //If the item was one of the pre-supplied words, give it a light blue coloring, if it's a user guess leave it default
                //If the item is a user guess, also give it a displayed index to show what guess it was
                <li key={index} className={`list-group-item justify-content-between ${index < switchPoint ? '' : 'list-group-item-info'}`}>
                    {item.guess} : {item.correctLetter} - {item.correctPosition}
                    <span style={{color : "lightgrey"}}>{index < switchPoint ? switchPoint - index : ''}</span>
                </li>
            )
        })
        //Return the Title, Guess Input, Submit Button, and all GuessHistory List Items to the DOM
        //Also return the modal, though it will only be displayed when called upon.
        return (
            <div>
                <WinModal error={error_handler} score={switchPoint} showModal={this.state.showWinModal} closeModal={() => {this.closeModal()}} />
                <div className="container mt-4">
                    <h3 className="text-center p-2">Guess This {this.hiddenWord.length}-Letter Word</h3>
                    <form onSubmit={this.handleGuess}>
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
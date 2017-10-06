import React, { Component } from 'react';
import WordGuessingCreate from './word_guessing_create';
import WordGuessingTestPlay from './word_guessing_testplay';
import CreateCheckModal from './create_check_modal';
import SubmitModal from '../common_components/submit_modal';
import Axios from 'axios';

Axios.defaults.headers.common['Access-Control-Allow-Origin'] = 'http://localhost:4000'
Axios.defaults.withCredentials = true;
class WordGuessingApp extends Component {
    constructor (props) {
        super(props);
        this.state = {
            showSubmitModal : "noModal",
            showModal : "noModal",
            modalInfo : null,
            dataRequested : false,
            puzzle_name : "Test Puzzle",
            submitted: false,
            testStyle : {
                display : "block"
            },
            createStyle : {
                display : "none"
            },
            gameInfo : {
                hiddenWord : "",
                startingWords : [""],
                size : 0,
                title : "Test Title"
            }
        }
        this.URL_EXT = '/savepuzzle';

        this.changeVisibility = this.changeVisibility.bind(this);
        this.close = this.close.bind(this);
        this.testPlay = this.testPlay.bind(this);
        this.submitPuzzle = this.submitPuzzle.bind(this);
        this.successfulSubmit = this.successfulSubmit.bind(this);
        this.submitConfirmation = this.submitConfirmation.bind(this);
        this.updatePuzzleName = this.updatePuzzleName.bind(this);
    }

    componentWillMount() {
        this.props.updateCurrentPath("word_guess_create", '', 'create', [this.testPlay, this.changeVisibility, this.submitPuzzle]);
    }

    submitPuzzle(req, res) {
        Axios.post(SERVER_BASE_ADDRESS + this.URL_EXT, {
            puzzle_name : this.state.puzzle_name,
            type : "word_guess",
            size : `${this.state.gameInfo.hiddenWord.length}-Letter`,
            puzzle_object : this.state.gameInfo,
            headers: {
                'Access-Control-Allow-Origin': 'http://localhost:4000'
            }
        }).then(this.successfulSubmit).catch(err => {
            console.log("Error Submitting Puzzle: ", err);
        });
    }

    successfulSubmit() {
        console.log("Puzzle Submitted!");
        this.setState({
            submitted: true
        })
    }

    updatePuzzleName(responseFromModal) {
        console.log("Receiving New Name:", responseFromModal)
        this.setState({
            puzzle_name : responseFromModal
        })
    }

    submitConfirmation() {
        this.setState({
            showSubmitModal : "showModal",
        })
    }

    testPlay() {
        this.setState({
            dataRequested: true
        })
    }

    close() {
        this.setState({
            showModal: "noModal",
            showSubmitModal : "noModal"
        })
    }

    changeVisibility() {
        if (this.state.testStyle.display === "block") {
            this.props.updateCurrentPath("word_guess_create", '', 'testplay', [this.testPlay, this.changeVisibility, this.submitPuzzle]);
            this.setState({
                showModal : "noModal",
                createStyle : { display : "block" },
                testStyle : { display : "none" }
            })
        } else {
            this.props.updateCurrentPath("word_guess_create", '', 'create', [this.testPlay, this.changeVisibility, this.submitPuzzle]);
            this.setState({
                showModal : "noModal",
                createStyle : { display : "none"},
                testStyle : { display : "block" }
            })
        }
    }

    gameInfoCallback = (gameInfoFromChild) => {
        const wordLength = this.testWordLength(gameInfoFromChild.hiddenWord);
        const clueLength = this.testClueLength(gameInfoFromChild.startingWords ,gameInfoFromChild.hiddenWord);
        this.setState({
            dataRequested : false,
            showModal : "showModal",
            modalInfo : [wordLength, clueLength],
            gameInfo: {
                hiddenWord : gameInfoFromChild.hiddenWord,
                startingWords : [...gameInfoFromChild.startingWords],
                size : `${gameInfoFromChild.hiddenWord.length}-Letter Word`,
                title : this.state.title
            },
        })
    }

    testClueLength(startingWords, hiddenWord) {
        let counter = 0;
        for (let i = 1; i < startingWords.length; i++) {
            if (startingWords[i].guess.length !== hiddenWord.length) {
                counter++;
            }
        }
        if (counter !== 0) {
            return `${counter} of your word(s) are different lengths from your hidden word`
        } else {
            return null;
        }
    }

    testWordLength(hiddenWord) {
        if (hiddenWord.length < 4) {
            return "Your word is shorter than 4 letters"
        } else if (hiddenWord.length > 6) {
            return "Your word is longer than 6 letters"
        } else {
            return null;
        }
    }

    render() {
        const { testStyle, createStyle, gameInfo, dataRequested, submitted } = this.state
        if (this.state.createStyle.display === "none") {
            return (
                <div>
                    <CreateCheckModal info={this.state.modalInfo} play={() => this.changeVisibility()} showModal={this.state.showModal} closeModal={() => {this.close()}} />
                    <WordGuessingCreate gameInfo={gameInfo} dataRequested={dataRequested} gameInfoCallback={this.gameInfoCallback} />    
                </div>
            )
        } else {
            return (
                <div>
                    <SubmitModal showModal={this.state.showSubmitModal} updatePuzzleName={this.updatePuzzleName} isSubmitted={submitted} submit={this.submitPuzzle} closeModal={() => {this.close()}} />
                    <WordGuessingTestPlay gameInfo={gameInfo}/>    
                </div>
            )
        }
    }
}

export default WordGuessingApp;
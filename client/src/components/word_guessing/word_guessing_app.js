import React, { Component } from 'react';
import WordGuessingCreate from './word_guessing_create';
import WordGuessingTestPlay from './word_guessing_testplay';
import CreateCheckModal from './create_check_modal';


class WordGuessingApp extends Component {
    constructor (props) {
        super(props);
        this.changeVisibility = this.changeVisibility.bind(this);
        this.testPlay = this.testPlay.bind(this);
        this.state = {
            showModal : "noModal",
            modalInfo : null,
            dataRequested : false,
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
        this.BASE_URL = '/puzzles';
        this.QUERY_KEY = 'retrieve';
        this.QUERY_VAL = 'recent10';
    }

    testPlay() {
        this.setState({
            dataRequested: true
        })
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

    close() {
        this.setState({
            showModal: "noModal"
        })
    }

    changeVisibility() {
        if (this.state.testStyle.display === "block") {
            this.setState({
                showModal : "noModal",
                createStyle : {
                    display : "block"
                },
                testStyle : {
                    display : "none"
                }
            })
        } else {
            this.setState({
                showModal : "noModal",
                createStyle : {
                    display : "none"
                },
                testStyle : {
                    display : "block"
                }
            })
        }
    }

    render() {
        const { testStyle, createStyle, gameInfo, dataRequested } = this.state
        if (this.state.createStyle.display === "none") {
            return (
                <div>
                    <CreateCheckModal info={this.state.modalInfo} play={() => this.changeVisibility()} showModal={this.state.showModal} closeModal={() => {this.close()}} />
                    <WordGuessingCreate gameInfo={gameInfo} dataRequested={dataRequested} gameInfoCallback={this.gameInfoCallback} />    
                    <div className="play-test">
                        <button className="btn btn-outline-primary m-2" onClick={this.testPlay} style={testStyle}>Test Play</button>
                    </div>
                </div>
            )
        } else {
            return (
                <div>
                    <WordGuessingTestPlay gameInfo={gameInfo}/>    
                    <div className="play-test">
                        <button className="btn btn-outline-primary m-2" onClick={this.changeVisibility} style={createStyle}>Back To Edit</button>
                        <button className="btn btn-outline-danger m-2" style={createStyle}>Submit Puzzle</button>
                    </div>
                </div>
            )
        }
    }
}

export default WordGuessingApp;
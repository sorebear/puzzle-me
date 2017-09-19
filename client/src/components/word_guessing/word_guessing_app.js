import React, { Component } from 'react';
import WordGuessingCreate from './word_guessing_create';
import WordGuessingPlay from './word_guessing_play';


class WordGuessingApp extends Component {
    constructor (props) {
        super(props);
        this.changeVisibility = this.changeVisibility.bind(this);
        this.state = {
            testStyle : {
                display : "block"
            },
            createStyle : {
                display : "none"
            },
            gameInfo : {
                hiddenWord : "",
                startingWords : [""]
            }
        }
    }
    changeVisibility() {
        if (this.state.testStyle.display === "block") {
            this.setState({
                createStyle : {
                    display : "block"
                },
                testStyle : {
                    display : "none"
                }
            })
        } else {
            this.setState({
                createStyle : {
                    display : "none"
                },
                testStyle : {
                    display : "block"
                }
            })
        }
    }
    gameInfoCallback = (gameInfoFromChild) => {
        console.log("I received game information from my child", gameInfoFromChild);
        this.setState({
            gameInfo: {
                hiddenWord : gameInfoFromChild.hiddenWord,
                startingWords : [...gameInfoFromChild.startingWords]
            },
        })
    }
    render() {
        console.log("App State", this.state)
        const { testStyle, createStyle, gameInfo } = this.state
        if (this.state.createStyle.display === "none") {
            return (
                <div>
                    <WordGuessingCreate gameInfo={gameInfo} gameInfoCallback={this.gameInfoCallback} />    
                    <div className="play-test">
                        <button className="btn btn-outline-primary" onClick={this.changeVisibility} style={testStyle}>Test Play</button>
                    </div>
                </div>
            )
        } else {
            return (
                <div>
                    <WordGuessingPlay gameInfo={gameInfo}/>    
                    <div className="play-test">
                        <button className="btn btn-outline-primary" onClick={this.changeVisibility} style={createStyle}>Back To Edit</button>
                        <button className="btn btn-outline-danger" style={createStyle}>Submit</button>
                    </div>
                </div>
            )
        }
    }
}

export default WordGuessingApp;
import React, {Component} from 'react';
import ColorPicker from './color_picker';
import GameGrid from './game_grid';
import './sudoku_style.css';
import CheckValidity from './check_validity.js';
import SpeckleSpackleCreate from './speckle_spackle_create';
import SpeckleSpacklePlay from './speckle_spackle_play';

class SpeckleSpackleApp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            createStyle : {
                display : "none"
            },
            testStyle : {
                display : "block"
            },
            gameInfo : {
                color1 : [132,0,0],
                color2 : [0,105,113],
                color3 : [130,137,72],
                gridSize : 5,
                gameGrid : []
            }
        }
        this.changeVisibility = this.changeVisibility.bind(this);
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

    selectedColorCallback = (selectedColor) => {
        console.log(selectedColor + " has been selected")
        this.setState({
            currentlySelected : selectedColor
        })
        this.passUpGameInfo();
    }

    gameInfoCallback = (gameInfoFromChild) => {
        console.log("I received the following Game Info from my child", gameInfoFromChild);
        this.setState({
            gameInfo : {...gameInfoFromChild}
        })
    }


    render() {
        const { testStyle, createStyle, gameInfo } = this.state;
        if (createStyle['display'] === "none") {
            return (
                <div>
                    <SpeckleSpackleCreate gameInfo={gameInfo} gameInfoCallback={this.gameInfoCallback} />    
                    <div className="play-test">
                        <button className="btn btn-outline-primary m-2" onClick={this.changeVisibility} style={testStyle}>Test Play</button>
                    </div>
                </div>
            )
        } else {
            return (
                <div>
                    <SpeckleSpacklePlay gameInfo={gameInfo}/>    
                    <div className="play-test">
                        <button className="btn btn-outline-primary m-2" onClick={this.changeVisibility} style={createStyle}>Back To Edit</button>
                        <button className="btn btn-outline-danger m-2" style={createStyle}>Submit</button>
                    </div>
                </div>
            )
        }
    }
}

export default SpeckleSpackleApp;
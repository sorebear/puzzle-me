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
        this.testPlay = this.testPlay.bind(this)
    }

    testPlay() {
        console.log(this.state.gameInfo)
        this.changeVisibility();
        this.checkPuzzleValidty();
    }
    
    changeVisibility() {
        console.log(this.state.testStyle)
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

    checkPuzzleValidty() {
        const {color1, color2, color3} = this.state.gameInfo;
        console.log('Checking If Your Puzzle is Valid');
        this.areSelectedColorsDifferent(color1, color2, color3);
        this.isEachColorInEveryRowOnce(color1, color2, color3);
        this.isEachColorInEveryColumnOnce(color1, color2, color3);
    }
    areSelectedColorsDifferent(color1, color2, color3) {
        console.log("CHECKING COLORS");
        if (color1 === color2 || color1 === color3 || color2 === color3) {
            console.log('Sorry, two or more of your colors are the same');
        } 
    }
    isEachColorInEveryRowOnce() {
        console.log("CHECKING ROWS");
        const {gridSize} = this.state.gameInfo;
        for (let i = 1; i <= gridSize; i++) {
            let colorArray = Array.from(arguments);
            let currentRow = Array.from(document.getElementsByClassName(`row${i}`));
            for (let k = 1; k <= gridSize; k++) {
                if (currentRow[k].style.backgroundColor !== "rgb(255, 255, 255)") {
                    const indexOfColor = colorArray.indexOf(currentRow[k].style.backgroundColor)
                    if (indexOfColor === -1) {
                        console.log(`There was a duplicate of ${currentRow[k].style.backgroundColor} in Row ${i}`);
                    } else {
                        colorArray.splice(indexOfColor, 1);
                    }
                }
            }
            if (colorArray.length > 0) {
                console.log(`In Row ${i}, you are missing ${colorArray.length} colors: ${colorArray}`)
            }
        }
    }
    
    isEachColorInEveryColumnOnce() {
        console.log("CHECKING COLUMNS");
        const {gridSize} = this.state;
        for (let i = 1; i <= gridSize; i++) {
            let colorArray = Array.from(arguments);
            let currentColumn = Array.from(document.getElementsByClassName(`column${i}`));
            for (let k = 1; k <= gridSize; k++) {
                if (currentColumn[k].style.backgroundColor !== "rgb(255, 255, 255)") {
                    const indexOfColor = colorArray.indexOf(currentColumn[k].style.backgroundColor)
                    if (indexOfColor === -1) {
                        console.log(`There was a duplicate of ${currentColumn[k].style.backgroundColor} in Column ${i}`);
                    } else {
                        colorArray.splice(indexOfColor, 1);
                    }
                }
            }
            if (colorArray.length > 0) {
                console.log(`In Column ${i}, you are missing ${colorArray.length} colors: ${colorArray}`)
            }
        }
    }

    // selectedColorCallback = (selectedColor) => {
    //     console.log(selectedColor + " has been selected")
    //     this.setState({
    //         currentlySelected : selectedColor
    //     })
    //     this.passUpGameInfo();
    // }

    gameInfoCallback = (gameInfoFromChild) => {
        console.log("I received the following Game Info from my child", gameInfoFromChild);
        this.setState({
            gameInfo : {...gameInfoFromChild}
        })
    }


    render() {
        console.log("App State at Render", this.state)
        const { testStyle, createStyle, gameInfo } = this.state;
        if (createStyle['display'] === "none") {
            return (
                <div>
                    <SpeckleSpackleCreate gameInfo={{...gameInfo}} gameInfoCallback={this.gameInfoCallback} />    
                    <div className="play-test">
                        <button className="btn btn-outline-primary m-2" onClick={this.testPlay} style={testStyle}>Test Play</button>
                    </div>
                </div>
            )
        } else {
            return (
                <div>
                    {/* <SpeckleSpacklePlay gameInfo={gameInfo}/>     */}
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
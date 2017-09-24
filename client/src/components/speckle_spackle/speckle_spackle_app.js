import React, {Component} from 'react';
import GameGrid from './game_grid';
import SpeckleSpackleCreate from './speckle_spackle_create';
import SpeckleSpackleTestPlay from './speckle_spackle_testplay';
import CreateCheckModal from './create_check_modal';
import './sudoku_style.css';

class SpeckleSpackleApp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataRequested : false,
            modalInfo : null,
            showModal : "noModal",
            createStyle : {
                display : "none"
            },
            testStyle : {
                display : "block"
            },
            gameInfo : {
                color0 : [255, 255, 255],
                color1 : [132,0,0],
                color2 : [0,105,113],
                color3 : [130,137,72],
                gridSize : 4,
                gameGrid : []
            }
        }
        this.changeVisibility = this.changeVisibility.bind(this);
        this.checkPuzzleValidty = this.checkPuzzleValidty.bind(this);
        this.testPlay = this.testPlay.bind(this)
    }

    testPlay() {
        this.setState({
            dataRequested : true,
        })
    }

    close() {
        this.setState({
            showModal: "noModal"
        })
    }
    
    changeVisibility() {
        console.log("Test Game Called");
        if (this.state.testStyle.display === "block") {
            this.setState({
                createStyle : {display : "block"},
                testStyle : {display : "none"},
                showModal : "noModal"
            })
        } else {
            this.setState({
                createStyle : {display : "none"}, 
                testStyle : {display : "block"},
                showModal : "noModal"
            })
        }
    }

    checkPuzzleValidty(newGameInfo) {
        console.log('Checking If Your Puzzle is Valid');
        const rowLog = this.isEachColorInEveryRowOnce({...newGameInfo}, ['color1', 'color2', 'color3']);
        const columnLog = this.isEachColorInEveryColumnOnce({...newGameInfo}, ['color1', 'color2', 'color3']);
        this.setState({
            showModal : "showModal",
            modalInfo : [rowLog, columnLog]
        })
    }

    isEachColorInEveryRowOnce(gameInfo, colorArr) {
        let rowLog = [];
        const { gameGrid, gridSize } = gameInfo;
        for (let i = 1; i <= gridSize; i++) {
            let colorArray = [...colorArr];
            for (let k = i * (gridSize + 2) + 1; k <= i * (gridSize + 2) + gridSize; k++) {
                if (gameGrid[k].colorNum !== "color0") {
                    const indexOfColor = colorArray.indexOf(gameGrid[k].colorNum)
                    if (indexOfColor === -1) {
                        rowLog.push(`In Row ${i} there was a duplicate of ${gameGrid[k].colorNum}`)
                    } else {
                        colorArray.splice(indexOfColor, 1);
                    }
                }
            }
            if (colorArray.length > 0) {
                rowLog.push(`In Row ${i}, you are missing ${colorArray.length} color(s)`)
            } 
        }
        return rowLog;
    }
    
    isEachColorInEveryColumnOnce(gameInfo, colorArr) {
        let columnLog = [];
        const { gameGrid, gridSize } = gameInfo;
        const outerGrid = gridSize + 2;
        for (let i = 1; i <= gridSize; i++) {
            let colorArray = [...colorArr]
            for (let k = i + outerGrid; k <= i + (gridSize * outerGrid); k += outerGrid) {
                if (gameGrid[k].colorNum !== "color0") {
                    const indexOfColor = colorArray.indexOf(gameGrid[k].colorNum)
                    if (indexOfColor === -1) {
                        columnLog.push(`In Column ${i} there was a duplicate of ${gameGrid[k].colorNum}`)
                    } else {
                        colorArray.splice(indexOfColor, 1);
                    }
                }
            }
            if (colorArray.length > 0) {
                columnLog.push(`In Column ${i}, you are missing ${colorArray.length} color(s)`)
            } 
        }
        return columnLog;
    }

    gameInfoCallback = (gameInfoFromChild) => {
        this.setState({
            dataRequested : false,
            gameInfo : {...gameInfoFromChild}
        })
        this.checkPuzzleValidty({...gameInfoFromChild});
    }

    render() {
        console.log("Something in the App Changed", this.state);
        const { testStyle, createStyle, gameInfo, dataRequested } = this.state;
        if (createStyle['display'] === "none") {
            return (
                <div>
                    <CreateCheckModal info={this.state.modalInfo} play={() => this.changeVisibility()} showModal={this.state.showModal} closeModal={() => {this.close()}} />
                    <SpeckleSpackleCreate gameInfo={{...gameInfo}} gameInfoCallback={this.gameInfoCallback} dataRequested={dataRequested} />    
                    <div className="play-test">
                        <button className="btn btn-outline-primary m-2" onClick={this.testPlay} style={testStyle}>Test Play</button>
                    </div>
                </div>
            )
        } else {
            return (
                <div>
                    <SpeckleSpackleTestPlay gameInfo={JSON.parse(JSON.stringify(gameInfo))}/>    
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
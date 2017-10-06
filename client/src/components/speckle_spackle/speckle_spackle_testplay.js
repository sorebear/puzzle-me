import React, {Component} from 'react';
import GameGridPlay from './game_grid_play';
import PlayCheckModal from './play_check_modal';
import './speckle_spackle_style.css';

class SpeckleSpackleTestPlay extends Component {
    constructor(props) {
        console.log("Props at Load", JSON.stringify({
            puzzle_name : "Puzz Puzz",
            size : `${props.gameInfo.gridSize}x${props.gameInfo.gridSize}`,
            type : 'speckle_spackle',
            puzzle_object : props.gameInfo
        }));
        super(props);
        this.timeInt = null;
        this.state = {
            modalInfo : null,
            showModal : "noModal",
            timer : 0,
            gameInfo : {
                color0 : props.gameInfo.color0,
                color1 : props.gameInfo.color1,
                color2 : props.gameInfo.color2,
                color3 : props.gameInfo.color3,
                currentlySelected : props.gameInfo.currentlySelected,
                numOfColors : props.gameInfo.numOfColors,
                gridSize : props.gameInfo.gridSize,
                gameGrid : props.gameInfo.gameGrid
            }
        }
        this.mainDisplayStyle = {
            display: "flex",
            justifyContent: "middle",
            alignItems: "middle",
            height: '100vh',
            width: '70vw',
            overflow: 'hidden'
        }

        this.gridIndexCallback = this.gridIndexCallback.bind(this);
        this.updateTimer = this.updateTimer.bind(this);
        this.evaluateAnswer = this.evaluateAnswer.bind(this);
        this.close = this.close.bind(this);
    }

    changeVisibility() {
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

    updateTimer() {
        const newTime = this.state.timer + 1;
        this.setState({
            timer: newTime
        })
    }

    componentWillMount() {
        this.resetSquares()
        this.timeInt = setInterval(this.updateTimer, 1000)
    }

    componentWillUnmount() {
        clearInterval(this.timeInt);
    }

    close() {
        setTimeout(()=> this.removeErrors(), 1800);
        this.setState({
            showModal: "noModal",
        })
    }

    resetSquares() {
        const { gameInfo } = this.state
        const newGrid = gameInfo.gameGrid.slice();
        for (let i = 0; i < newGrid.length; i++) {
            if (newGrid[i].name === "square") {
                newGrid[i].colorNum = "color0";
            }
        }
        gameInfo["gameGrid"] = newGrid;
        this.setState({
            gameInfo :  {...gameInfo}
        })
    }

    gridIndexCallback(index) {
        const { gameInfo } = this.state
        let newNum = parseInt(gameInfo.gameGrid[index].colorNum.substr(5)) + 1;
        if (newNum > gameInfo.numOfColors) {
            newNum = 0;
        }
        gameInfo.gameGrid[index].colorNum = `color${newNum}`;
        this.setState({
            gameInfo : {...gameInfo}
        })
    }

    evaluateAnswer() {
        const { gameInfo } = this.state;
        const outerGridSize = gameInfo.gridSize + 2;
        const rowLog = this.isEachColorInEveryRowOnce();
        const columnLog = this.isEachColorInEveryColumnOnce();
        const leftLog = this.checkLeftClues(gameInfo, outerGridSize);
        const rightLog = this.checkRightClues(gameInfo, outerGridSize);
        const topLog = this.checkTopClues(gameInfo, outerGridSize);
        const bottomLog = this.checkBottomClues(gameInfo, outerGridSize);
        if (rowLog.length !== 0 || columnLog.length !== 0 || leftLog.length !== 0 || rightLog.length !== 0 || topLog.length !== 0 || bottomLog.length !== 0) {
            let duplicate = false;
            let missing = false;
            let clue = false;
            const arrayOfArrays = rowLog.concat(columnLog, leftLog, rightLog, topLog, bottomLog);
            console.log(arrayOfArrays)
            for (let i = 0; i < arrayOfArrays.length; i++) {
                switch (arrayOfArrays[i].errorType) {
                    case 'clue':
                        clue = 'Not all clue conditions are met';
                        break;
                    case 'duplicate':
                        duplicate = 'You have duplicate colors in rows or columns';
                        console.log(document.getElementsByClassName(arrayOfArrays[i].location));
                        const duplicateColors = document.getElementsByClassName(arrayOfArrays[i].location);
                        for (let k = 1; k < duplicateColors.length-1; k++) {
                            duplicateColors[k].style.borderColor = "red"
                        }
                        break;
                    case 'missing':
                        missing = 'You are missing colors in rows or columns';
                        const missingColors = document.getElementsByClassName(arrayOfArrays[i].location);
                        for (let k = 1; k < missingColors.length-1; k++) {
                            missingColors[k].style.borderColor = "red"
                        }
                        break;
                }
            }
            this.setState({
                showModal : "showModal",
                modalInfo : [duplicate, missing, clue]
            })
        } else {
            this.winConditionMet();
        }
    }

    winConditionMet() {
        this.setState({
            showModal : "showModal",
            modalInfo : [this.state.timer]
        })
    }

    removeErrors() {
        const { gameInfo } = this.state;
        for (let i = 0; i < gameInfo.gameGrid.length; i++) {
            gameInfo.gameGrid[i].error = false;
        }
        this.setState({
            gameInfo : {...gameInfo}
        })
        const allSquares = document.querySelectorAll('div[name=square]')
        for (let i = 0; i < allSquares.length; i++) {
            allSquares[i].style.borderColor = 'lightgrey'
        }
        const allClues = document.querySelectorAll('div[name=clue]')
        for (let i = 0; i < allClues.length; i++) {
            allClues[i].style.borderColor = 'lightgrey'
        }
    }

    checkLeftClues(gameInfo, outerGridSize) {
        let leftLog = [];
        for (let i = outerGridSize, row = 1; i < (gameInfo.gameGrid.length - outerGridSize); i += outerGridSize, row++) {
            if (gameInfo.gameGrid[i]["opacity"] === 1) {
                let clueColor = gameInfo.gameGrid[i]["colorNum"];
                let k = i + 1;
                while (gameInfo.gameGrid[k]["colorNum"] === "color0" && k < i + gameInfo.gridSize) {
                    k++
                }
                if (gameInfo.gameGrid[i]["colorNum"] !== gameInfo.gameGrid[k]["colorNum"]) {
                    leftLog.push({errorType:'clue', location: `row${row}`})
                    gameInfo.gameGrid[i].error = true;
                    // gameInfo.gameGrid[k].error = true;
                } 
            }
        }
        return leftLog;
    }

    checkRightClues(gameInfo, outerGridSize) {
        let rightLog = [];
        for (let i = outerGridSize * 2 - 1, row = 1; i < (gameInfo.gameGrid.length - 2); i += outerGridSize, row++) {
            if (gameInfo.gameGrid[i]["opacity"] === 1) {
                let clueColor = gameInfo.gameGrid[i]["colorNum"];
                let k = i - 1;
                while (gameInfo.gameGrid[k]["colorNum"] === "color0" && k < i + gameInfo.gridSize) {
                    k--
                }
                if (gameInfo.gameGrid[i]["colorNum"] !== gameInfo.gameGrid[k]["colorNum"]) {
                    rightLog.push({errorType:'clue', location: `row${row}`});
                    gameInfo.gameGrid[i].error = true;
                    // gameInfo.gameGrid[k].error = true;
                } 
            }
        }
        return rightLog;
    }

    checkTopClues(gameInfo, outerGridSize) {
        let topLog = [];
        for (let i = 1; i <= gameInfo.gridSize; i++) {
            if (gameInfo.gameGrid[i]["opacity"] === 1) {
                let clueColor = gameInfo.gameGrid[i]["colorNum"];
                let k = i + outerGridSize;
                while (gameInfo.gameGrid[k]["colorNum"] === "color0" && k < gameInfo.gameGrid.length - outerGridSize) {
                    k += outerGridSize;
                }
                if (gameInfo.gameGrid[i]["colorNum"] !== gameInfo.gameGrid[k]["colorNum"]) {
                    topLog.push({errorType:'clue', location: `column${i}`})
                    gameInfo.gameGrid[i].error = true;
                    // gameInfo.gameGrid[k].error = true;
                } 
            }
        }
        return topLog;
    }

    checkBottomClues(gameInfo, outerGridSize) {
        let bottomLog = [];
        const gridLength = gameInfo.gameGrid.length;
        for (let i = gridLength - gameInfo.gridSize - 1, column = 1; i < gridLength-1; i++, column++) {
            if (gameInfo.gameGrid[i]["opacity"] === 1) {
                let clueColor = gameInfo.gameGrid[i]["colorNum"];
                let k = i - outerGridSize;
                while (gameInfo.gameGrid[k]["colorNum"] === "color0" && k > outerGridSize) {
                    k -= outerGridSize;
                }
                if (gameInfo.gameGrid[i]["colorNum"] !== gameInfo.gameGrid[k]["colorNum"]) {
                    bottomLog.push({errorType:'clue', location: `column${column}`})
                    gameInfo.gameGrid[i].error = true;
                    // gameInfo.gameGrid[k].error = true;
                } 
            }
        }
        return bottomLog;
    }

    isEachColorInEveryRowOnce() {
        let rowLog = [];
        const { gameGrid, gridSize } = this.state.gameInfo;
        for (let i = 1; i <= gridSize; i++) {
            let colorArray = ["color1", "color2", "color3"];
            for (let k = i * (gridSize + 2) + 1; k <= i * (gridSize + 2) + gridSize; k++) {
                if (gameGrid[k].colorNum !== "color0") {
                    const indexOfColor = colorArray.indexOf(gameGrid[k].colorNum)
                    if (indexOfColor === -1) {
                        rowLog.push({errorType:'duplicate', location: `row${i}`})
                    } else {
                        colorArray.splice(indexOfColor, 1);
                    }
                }
            }
            if (colorArray.length > 0) {
                rowLog.push({errorType:'missing', location: `row${i}`})
            } 
        }
        return rowLog;
    }
    
    isEachColorInEveryColumnOnce() {
        let columnLog = [];
        const { gameGrid, gridSize } = this.state.gameInfo;
        const outerGrid = gridSize + 2;
        for (let i = 1; i <= gridSize; i++) {
            let colorArray = ["color1","color2","color3"]
            for (let k = i + outerGrid; k <= i + (gridSize * outerGrid); k += outerGrid) {
                if (gameGrid[k].colorNum !== "color0") {
                    const indexOfColor = colorArray.indexOf(gameGrid[k].colorNum)
                    if (indexOfColor === -1) {
                        columnLog.push({errorType:'duplicate', location: `column${i}`})
                    } else {
                        colorArray.splice(indexOfColor, 1);
                    }
                }
            }
            if (colorArray.length > 0) {
                columnLog.push({errorType:'missing', location: `column${i}`})
            } 
        }
        return columnLog;
    }


    render() {
        const { timer, gameInfo } = this.state
        return (
            <div className="pageContainer">
                <PlayCheckModal info={this.state.modalInfo} showModal={this.state.showModal} closeModal={() => {this.close()}} />
                <div className="gutter align-items-center justify-content-center text-center">
                    <i className="fa fa-clock-o swatch" style={{color: "white"}}></i>
                    <h3 style={{fontSize: "2rem", position:"absolute", opacity:".8"}}>{timer}</h3>
                </div>
                <div className="mainDisplay">
                    <GameGridPlay gameInfo={{...gameInfo}} callback={this.gridIndexCallback} />
                </div>
                <div className="gutter">
                    <div>
                        {/* <button onClick={this.evaluateAnswer} className="btn btn-outline-primary justify-content-center align-items-center">Check</button> */}
                    </div>
                </div>
            </div>
        )
    }
}

export default SpeckleSpackleTestPlay;
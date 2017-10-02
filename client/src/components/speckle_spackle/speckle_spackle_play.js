import React, {Component} from 'react';
import GameGridPlay from './game_grid_play';
import PlayCheckModal from './play_check_modal';
import axios from 'axios';
import './speckle_spackle_style.css';

class SpeckleSpacklePlay extends Component {
    constructor(props) {
        super(props);
        this.timeInt = null;
        this.puzzle_name = null;
        this.state = {
            modalInfo : null,
            showModal : "noModal",
            timer : 0,
            gameInfo : null
        }
        this.mainDisplayStyle = {
            display: "flex",
            justifyContent: "middle",
            alignItems: "middle",
            height: '100vh',
            width: '70vw',
            overflow: 'hidden'
        }

        this.URL_EXT = '/puzzles';
        this.QUERY_KEY = 'url_ext';
        this.QUERY_VAL = props.location.pathname.substr(22);

        this.gridIndexCallback = this.gridIndexCallback.bind(this);
        this.updateData = this.updateData.bind(this);
        this.updateTimer = this.updateTimer.bind(this);
        this.evaluateAnswer = this.evaluateAnswer.bind(this);
        this.close = this.close.bind(this);
    }

    componentWillMount() {
        this.getData();
        this.props.updateCurrentPath("speckle_spackle_play");
        this.timeInt = setInterval(this.updateTimer, 1000)
    }

    getData() {
        axios.get(this.URL_EXT + '?' + this.QUERY_KEY + '=' + this.QUERY_VAL).then(this.updateData).catch(err => {
            console.log("Error Loading Puzzle: ", err);
        });
    }

    updateData(response){
        const receivedData = response.data.data[0];
        console.log("Received Data: ", receivedData)
        const receivedGameInfo = JSON.parse(receivedData.puzzle_object);
        this.puzzle_name = receivedData.puzzle_name;
        receivedGameInfo.gameGrid = this.resetSquares([...receivedGameInfo.gameGrid])
        this.setState({
            gameInfo : receivedGameInfo
        });
    }

    resetSquares(gameGrid) {
        const newGrid = gameGrid.slice();
        for (let i = 0; i < newGrid.length; i++) {
            if (newGrid[i].name === "square") {
                newGrid[i].colorNum = "color0";
            }
        }
        return newGrid;
    }

    componentWillUnmount() {
        clearInterval(this.timeInt);
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

    close() {
        this.setState({
            showModal: "noModal"
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
            this.setState({
                showModal : "showModal",
                modalInfo : [rowLog, columnLog, topLog, rightLog, bottomLog, leftLog]
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
        clearInterval(this.timeInt);
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
                    leftLog.push(`A clue condition in row ${row} is not met.`)
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
                    rightLog.push(`A clue condition in row ${row} is not met.`)
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
                    topLog.push(`A clue condition in column ${i} is not met.`)
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
                    bottomLog.push(`A clue condition in column ${column} is not met.`)
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


    render() {
        if (this.state.gameInfo === null) {
            return <h1>Loading...</h1>
        }
        const { gameInfo, timer } = this.state
        return (
            <div className="pageContainer">
                <PlayCheckModal info={this.state.modalInfo} showModal={this.state.showModal} closeModal={() => {this.close()}} />
                <h2 className="puzzle_name">{this.puzzle_name}</h2>
                <div className="gutter align-items-center justify-content-center text-center">
                    <i className="fa fa-clock-o swatch m-1" style={{color: "white"}}></i>
                    <h3 style={{fontSize: "2rem", position:"absolute", opacity:".8"}}>{timer}</h3>
                </div>
                <div className="mainDisplay">
                    <GameGridPlay gameInfo={{...gameInfo}} callback={this.gridIndexCallback} />
                </div>
                <div className="gutter align-items-center">
                    <div>
                        <button onClick={this.evaluateAnswer} className="btn btn-outline-primary justify-content-center align-items-center">Check</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default SpeckleSpacklePlay;
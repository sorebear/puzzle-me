import React, {Component} from 'react';
import GameGridPlay from './game_grid_play';
import PlayCheckModal from './play_check_modal';
import Axios from 'axios';
import './speckle_spackle_style.css';

Axios.defaults.headers.common['Access-Control-Allow-Origin'] = 'http://localhost:4000'
Axios.defaults.withCredentials = true;

class SpeckleSpacklePlay extends Component {
    constructor(props) {
        super(props);
        this.timeInt = null;
        this.state = {
            modalInfo : null,
            showModal : "noModal",
            error_handler : null,
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
        this.QUERY_VAL = props.match.params.game_id;
        this.POST_URL_EXT = '/puzzleComplete';
        this.queryID = null;

        this.gridIndexCallback = this.gridIndexCallback.bind(this);
        this.updateData = this.updateData.bind(this);
        this.updateTimer = this.updateTimer.bind(this);
        this.evaluateAnswer = this.evaluateAnswer.bind(this);
        this.close = this.close.bind(this);
        this.successfulSubmit = this.successfulSubmit.bind(this);
        this.failedSubmit = this.failedSubmit.bind(this);
    }

    componentWillMount() {
        this.getData();
        this.timeInt = setInterval(this.updateTimer, 1000)
    }

    getData() {
        Axios.get(this.URL_EXT + '?' + this.QUERY_KEY + '=' + this.QUERY_VAL).then(this.updateData).catch(err => {
            console.log("Error Loading Puzzle: ", err);
        });
    }

    updateData(response){
        const receivedData = response.data.data[0];
        const receivedGameInfo = JSON.parse(receivedData.puzzle_object);
        this.queryID = receivedData.url_ext
        receivedGameInfo.gameGrid = this.resetSquares([...receivedGameInfo.gameGrid])
        this.props.updateCurrentPath("speckle_spackle_play", receivedData.puzzle_name, 'play', [this.evaluateAnswer]);
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
        setTimeout(()=> this.removeErrors(), 1800)
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
            this.submitCompletion();
        }
    }

    winConditionMet() {
        this.setState({
            showModal : "showModal",
            modalInfo : [this.state.timer]
        })
        clearInterval(this.timeInt);
    }

    submitCompletion(req, res) {
        Axios.post(this.POST_URL_EXT, {
            //Calculate the completion time by the number of user guesses x 10
            completionTime : this.state.timer,
            queryID : this.queryID,
        }).then(this.successfulSubmit).catch(this.failedSubmit);
    }

    //On successful submit, open the WinModal to notify the user of their win, of their score, and of successful submittal
    successfulSubmit() {
        this.setState({
            showModal : "showModal",
            modalInfo : [this.state.timer],
            headers: {
                'Access-Control-Allow-Origin': 'http://localhost:4000'
            }
        })
        clearInterval(this.timeInt);
    }

    //On failed submit, open the WinModal to notify the user they won and notify them there was an issue submitting their score
    failedSubmit() {
        this.setState({
            error_handler : "Unfortunately, there was an issue submitting your score.",
            modalInfo : [this.state.timer],
            showModal : "showModal",
            headers: {
                'Access-Control-Allow-Origin': 'http://localhost:4000'
            }
        })
        clearInterval(this.timeInt);
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
        if (this.state.gameInfo === null) {
            return <h1>Loading...</h1>
        }
        const { gameInfo, timer, error_handler } = this.state
        return (
            <div className="pageContainer">
                <PlayCheckModal error={error_handler} info={this.state.modalInfo} showModal={this.state.showModal} closeModal={() => {this.close()}} />
                <div className="gutter align-items-center justify-content-center text-center">
                    <i className="fa fa-clock-o swatch m-1" style={{color: "white"}}></i>
                    <h3 style={{fontSize: "2rem", position:"absolute", opacity:".8"}}>{timer}</h3>
                </div>
                <div className="mainDisplay">
                    <GameGridPlay gameInfo={{...gameInfo}} callback={this.gridIndexCallback} />
                </div>
                <div className="gutter align-items-center">
                </div>
            </div>
        )
    }
}

export default SpeckleSpacklePlay;
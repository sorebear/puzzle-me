import React, {Component} from 'react';
import ColorSwatch from './color_swatch';
import GameGrid from './game_grid';
import './speckle_spackle_style.css';
import grid4 from '../imgs/grid4.png'
import grid5 from '../imgs/grid5.png'
import grid6 from '../imgs/grid6.png'

class SpeckleSpackleCreate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            gameInfo : {
                color0 : props.gameInfo.color0,
                color1 : props.gameInfo.color1,
                color2 : props.gameInfo.color2,
                color3 : props.gameInfo.color3,
                gridSize : props.gameInfo.gridSize,
                numOfColors : props.gameInfo.numOfColors,
                currentlySelected : "color1",
                gameGrid : props.gameInfo.gameGrid
            }
        }
        this.gridIndexCallback = this.gridIndexCallback.bind(this);
        this.clueIndexCallback = this.clueIndexCallback.bind(this);
        this.chooseRandomColor = this.chooseRandomColor.bind(this);
    }

    componentDidMount() {
        const { gameInfo } = this.state
        if (gameInfo.gameGrid.length === 0) {
            this.createGrid(gameInfo.gridSize);
        } 
    }

    createGrid(createSize) {
        const innerGridSize = createSize;
        const outerGridSize = createSize + 2;
        const border = innerGridSize + 1;
        let gridArray = [];
        for (let rowCounter = 0; rowCounter < outerGridSize; rowCounter++) {
            for (let columnCounter = 0; columnCounter < outerGridSize; columnCounter++) {
                let newObj = {};
                if (rowCounter === 0 || columnCounter === 0 || rowCounter === border || columnCounter === border) {
                    if (rowCounter === columnCounter || (rowCounter === 0 && columnCounter === border) || (rowCounter === border && columnCounter === 0)) {
                        newObj = {
                            index : (rowCounter * outerGridSize) + columnCounter,
                            name : 'corner',
                            className : `row${rowCounter} column${columnCounter}`,
                            colorNum : 'color0',
                            opacity : 1
                        }
                    } else {
                        newObj = {
                            index : (rowCounter * outerGridSize) + columnCounter,
                            name : 'clue',
                            className : `row${rowCounter} column${columnCounter}`,
                            colorNum : 'color0',
                            error : false,
                            opacity : 1
                        }
                    }
                } else {
                    newObj = {
                        index : (rowCounter * outerGridSize) + columnCounter,
                        name : 'square',
                        className : `row${rowCounter} column${columnCounter}`, 
                        colorNum : 'color0',
                        error : false,
                        opacity : 1
                    }
                }
                gridArray.push(newObj);
            }
        }
        const { gameInfo } = this.state
        gameInfo["gameGrid"] = gridArray;
        gameInfo["gridSize"] = createSize;
        this.setState({
            gameInfo : {...gameInfo}
        })
    }

    componentWillReceiveProps(nextProps) {
        const { gameInfo } = this.state;
        if (nextProps.dataRequested) {
            nextProps.gameInfoCallback({...gameInfo})
        }
    }

    passUpGameInfo() {
        const { color1, color2, color3, gridSize, gameGrid} = this.state.gameInfo;
        const updatedGameInfo = {
            color1 : color1,
            color2 : color2,
            color3 : color3,
            gridSize : gridSize,
            gameGrid : gameGrid
        }
        this.props.gameInfoCallback({...updatedGameInfo});
    }

    chooseRandomColor(colorNum) {
        const { gameInfo } = this.state
        const red = Math.floor(Math.random() * 256);
        const green = Math.floor(Math.random() * 256);
        const blue = Math.floor(Math.random() * 256);
        gameInfo[colorNum] = [red, green, blue];
        this.setState({
            gameInfo : {...gameInfo}
        })
    }

    selectedColorCallback = (selectedColor) => {
        const { gameInfo } = this.state;
        gameInfo['currentlySelected'] = selectedColor;
        this.setState({
            gameInfo : {...gameInfo}
        })
    }

    updateLeft(index) {
        const { gameInfo } = this.state
        const outerGridSize = gameInfo.gridSize + 2
        index = Math.ceil(index /  outerGridSize) * outerGridSize - 2;
        let clueColor = gameInfo.gameGrid[index]["colorNum"];
        while (gameInfo.gameGrid[index]["name"] !== "clue") {
            if (gameInfo.gameGrid[index]["colorNum"] !== "color0") {
                clueColor = gameInfo.gameGrid[index]["colorNum"]
            }
            index--
        }
        gameInfo.gameGrid[index]["colorNum"] = clueColor;
        this.setState({
            gameInfo : {...gameInfo}
        })
    }

    updateRight(index) {
        const { gameInfo } = this.state
        const outerGridSize = gameInfo.gridSize + 2
        index = Math.floor(index /  outerGridSize) * outerGridSize + 1;
        let clueColor = gameInfo.gameGrid[index]["colorNum"];
        while (gameInfo.gameGrid[index]["name"] !== "clue") {
            if (gameInfo.gameGrid[index]["colorNum"] !== "color0") {
                clueColor = gameInfo.gameGrid[index]["colorNum"]
            }
            index++
        }
        gameInfo.gameGrid[index]["colorNum"] = clueColor;
        this.setState({
            gameInfo : {...gameInfo}
        })
    }

    updateTop(index) {
        const { gameInfo } = this.state
        const outerGridSize = gameInfo.gridSize + 2
        index = gameInfo.gameGrid.length - (outerGridSize * 2) + (index % outerGridSize)
        let clueColor = gameInfo.gameGrid[index]["colorNum"];
        while (gameInfo.gameGrid[index]["name"] !== "clue") {
            if (gameInfo.gameGrid[index]["colorNum"] !== "color0") {
                clueColor = gameInfo.gameGrid[index]["colorNum"]
            }
            index -= outerGridSize;
        }
        gameInfo.gameGrid[index]["colorNum"] = clueColor;
        this.setState({
            gameInfo : {...gameInfo}
        })
    }

    updateBottom(index) {
        const { gameInfo } = this.state
        const outerGridSize = gameInfo.gridSize + 2;
        index = (index % outerGridSize) + outerGridSize;
        let clueColor = gameInfo.gameGrid[index]["colorNum"];
        while (gameInfo.gameGrid[index]["name"] !== "clue") {
            if (gameInfo.gameGrid[index]["colorNum"] !== "color0") {
                clueColor = gameInfo.gameGrid[index]["colorNum"]
            }
            index += outerGridSize;
        }
        gameInfo.gameGrid[index]["colorNum"] = clueColor;
        this.setState({
            gameInfo : {...gameInfo}
        })
    }
    
    updateClues(index) {
        this.updateLeft(index);
        this.updateRight(index);
        this.updateTop(index);
        this.updateBottom(index);
    }

    gridIndexCallback(index) {
        const { gameInfo } = this.state
        if (gameInfo.gameGrid[index].colorNum === "color0") {
            gameInfo.gameGrid[index].colorNum = gameInfo.currentlySelected;
            this.updateClues(index);
        } else {
            gameInfo.gameGrid[index].colorNum = "color0";
            this.updateClues(index);
        }
        this.setState({
            gameInfo : {...gameInfo}
        })
    }

    clueIndexCallback(index) {
        const { gameInfo } = this.state
        if (gameInfo.gameGrid[index].opacity === 1) {
            gameInfo.gameGrid[index].opacity = 0;
        } else {
            gameInfo.gameGrid[index].opacity = 1;
        }
        this.setState({
            gameInfo : {...gameInfo}
        })
    }

    render() {
        const {color1, color2, color3, currentlySelected, gridSize, gameGrid} = this.state.gameInfo
        const { gameInfo } = this.state;
        return (
            <div className="pageContainer">
                <div className="gutter">
                    <ColorSwatch name="color1" currentlySelected={currentlySelected} color={color1} randomColorCallback={this.chooseRandomColor} selectedCallback={this.selectedColorCallback} />
                    <ColorSwatch name="color2" currentlySelected={currentlySelected} color={color2} randomColorCallback={this.chooseRandomColor} selectedCallback={this.selectedColorCallback} />
                    <ColorSwatch name="color3" currentlySelected={currentlySelected} color={color3} randomColorCallback={this.chooseRandomColor} selectedCallback={this.selectedColorCallback} />
                </div>
                <div className="mainDisplay">
                    <GameGrid gameInfo={{...gameInfo}} gridIndexCallback={this.gridIndexCallback} clueIndexCallback={this.clueIndexCallback}/>
                    {/* <button className="btn btn-outline-primary m-5">Test Play</button> */}
                </div>
                <div className="gutter">
                        <img className="m-1 gridSizeIcon" onClick={() => this.createGrid(4)} src={grid4} />
                        <img className="m-1 gridSizeIcon" onClick={() => this.createGrid(5)} src={grid5} />
                        <img className="m-1 gridSizeIcon" onClick={() => this.createGrid(6)} src={grid6} />
                </div>
            </div>
        )
    }
}

export default SpeckleSpackleCreate;
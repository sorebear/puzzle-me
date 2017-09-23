import React, {Component} from 'react';
import ColorPicker from './color_picker';
import ColorSwatchNew from './color_swatch_new';
import GameGrid from './game_grid';
import './sudoku_style.css';
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
                currentlySelected : "color1",
                gameGrid : props.gameInfo.gameGrid
            }
        }
        this.gridIndexCallback = this.gridIndexCallback.bind(this);
        this.clueIndexCallback = this.clueIndexCallback.bind(this);
        this.chooseRandomColor = this.chooseRandomColor.bind(this);
        this.gutterStyle = {
            display: "flex",
            flexFlow: "column",
            justifyContent: "space-around",
            height: '100vh',
            width: '15vw',
            overflow: 'hidden'
        }
        this.mainDisplayStyle = {
            display: "flex",
            justifyContent: "middle",
            alignItems: "middle",
            height: '100vh',
            width: '70vw',
            overflow: 'hidden'
        }
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
                            opacity : 1
                        }
                    }
                } else {
                    newObj = {
                        index : (rowCounter * outerGridSize) + columnCounter,
                        name : 'square',
                        className : `row${rowCounter} column${columnCounter}`, 
                        colorNum : 'color0',
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
        console.log("Receiving New Props")
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
                    <ColorSwatchNew name="color1" currentlySelected={currentlySelected} color={color1} randomColorCallback={this.chooseRandomColor} selectedCallback={this.selectedColorCallback} />
                    <ColorSwatchNew name="color2" currentlySelected={currentlySelected} color={color2} randomColorCallback={this.chooseRandomColor} selectedCallback={this.selectedColorCallback} />
                    <ColorSwatchNew name="color3" currentlySelected={currentlySelected} color={color3} randomColorCallback={this.chooseRandomColor} selectedCallback={this.selectedColorCallback} />
                </div>
                <div className="mainDisplay">
                    <GameGrid gameInfo={{...gameInfo}} gridIndexCallback={this.gridIndexCallback} clueIndexCallback={this.clueIndexCallback}/>
                    {/* <button className="btn btn-outline-primary m-5">Test Play</button> */}
                </div>
                <div className="gutter">
                    <div className="p-1">
                        <img onClick={() => this.createGrid(4)} style={{width:"100%"}} src={grid4} />
                    </div>
                    <div className="p-1">
                        <img onClick={() => this.createGrid(5)} style={{width:"100%"}} src={grid5} />
                    </div>
                    <div className="p-1">
                        <img onClick={() => this.createGrid(6)} style={{width:"100%"}} src={grid6} />
                    </div>
                </div>
            </div>
        )
    }
}

export default SpeckleSpackleCreate;
import React, {Component} from 'react';
import ColorPicker from './color_picker';
import ColorSwatchNew from './color_swatch_new';
import GameGrid from './game_grid';
import './sudoku_style.css';

class SpeckleSpackleCreate extends Component {
    constructor(props) {
        super(props);
        this.innerGridSize = props.gameInfo.gridSize;
        this.outerGridSize = props.gameInfo.gridSize + 2;
        this.state = {
            gameInfo : {
                color0 : [255, 255, 255],
                color1 : props.gameInfo.color1,
                color2 : props.gameInfo.color2,
                color3 : props.gameInfo.color3,
                currentlySelected : "color1",
                gridSize : props.gameInfo.gridSize,
                gameGrid : props.gameInfo.gameGrid
            }
        }
        this.gridIndexCallback = this.gridIndexCallback.bind(this);
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
            const newGrid = this.createGrid();
            gameInfo["gameGrid"] = newGrid
            this.setState({
                gameInfo : {...gameInfo}
            })
        } 
    }

    createGrid() {
        const innerGridSize = this.innerGridSize;
        const outerGridSize = this.outerGridSize;
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
                            colorNum : 'color0'
                        }
                    } else {
                        newObj = {
                            index : (rowCounter * outerGridSize) + columnCounter,
                            name : 'clue',
                            className : `row${rowCounter} column${columnCounter}`,
                            colorNum : 'color0'
                        }
                    }
                } else {
                    newObj = {
                        index : (rowCounter * outerGridSize) + columnCounter,
                        name : 'square',
                        className : `row${rowCounter} column${columnCounter}`, 
                        colorNum : 'color0'
                    }
                }
                gridArray.push(newObj);
            }
        }
        return gridArray;
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

    new5x5Game() {
        const { gameInfo } = this.state;
        gameInfo['gridSize'] = 5
        this.setState({
            gameInfo : {...gameInfo}
        })
    }

    chooseRandomColor(colorNum) {
        console.log('Button Clicked');
        const { gameInfo } = this.state
        const red = Math.floor(Math.random() * 256);
        const green = Math.floor(Math.random() * 256);
        const blue = Math.floor(Math.random() * 256);
        gameInfo[colorNum] = [red, green, blue];
        this.setState({
            gameInfo : {...gameInfo}
        })
    }

    // colorCallback1 = (colorFromChild, colorNum) => {
    //     const { gameInfo } = this.state;
    //     gameInfo['color1'] = colorFromChild;
    //     this.setState({
    //         gameInfo : {...gameInfo}
    //     })
    // }
    // colorCallback2 = (colorFromChild) => {
    //     const { gameInfo } = this.state;
    //     gameInfo['color2'] = colorFromChild;
    //     this.setState({
    //         gameInfo : {...gameInfo}
    //     })
    // }
    // colorCallback3 = (colorFromChild) => {
    //     const { gameInfo } = this.state;
    //     gameInfo['color3'] = colorFromChild;
    //     this.setState({
    //         gameInfo : {...gameInfo}
    //     })
    // }

    selectedColorCallback = (selectedColor) => {
        console.log("I've received the following value: ", selectedColor)
        const { gameInfo } = this.state;
        gameInfo['currentlySelected'] = selectedColor;
        this.setState({
            gameInfo : {...gameInfo}
        })
    }

    gridIndexCallback(index) {
        const { gameInfo } = this.state
        if (gameInfo.gameGrid[index].colorNum === "color0") {
            gameInfo.gameGrid[index].colorNum = gameInfo.currentlySelected
        } else {
            gameInfo.gameGrid[index].colorNum = "color0"
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
                    {/* <ColorPicker name="color1" currentlySelected={currentlySelected} color={color1} colorCallbackFromParent={this.colorCallback1} selectedCallbackFromParent={this.selectedColorCallback}/> */}
                    {/* <ColorPicker name="color2" currentlySelected={currentlySelected} color={color2} colorCallbackFromParent={this.colorCallback2} selectedCallbackFromParent={this.selectedColorCallback}/> */}
                    {/* <ColorPicker name="color3" currentlySelected={currentlySelected} color={color3} colorCallbackFromParent={this.colorCallback3} selectedCallbackFromParent={this.selectedColorCallback}/> */}
                </div>
                <div className="mainDisplay">
                    <GameGrid gameInfo={{...gameInfo}} gridIndexCallback={this.gridIndexCallback}/>
                </div>
                <div className="gutter">

                </div>
            </div>
        )
    }
}

export default SpeckleSpackleCreate;
import React, {Component} from 'react';
import ColorPicker from './color_picker';
import GameGrid from './game_grid';
import './sudoku_style.css';
import CheckValidity from './check_validity.js';

class SudoSudokuApp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            gameInfo : {
                color1 : props.gameInfo.color1,
                color2 : props.gameInfo.color2,
                color3 : props.gameInfo.color3,
                currentlySelected : null,
                gridSize : props.gameInfo.gridSize,
                gameGrid : props.gameInfo.gameGrid
            }
        }
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
        console.log('buttonClicked');
        const { gameInfo } = this.state;
        gameInfo['gridSize'] = 5
        this.setState({
            gameInfo : {...gameInfo}
        })
    }
    colorCallback1 = (colorFromChild) => {
        console.log("I'm Color 1 in the App componenet, I got the following from my child", colorFromChild);
        const { gameInfo } = this.state;
        gameInfo['color1'] = colorFromChild;
        this.setState({
            gameInfo : {...gameInfo}
        })
    }
    colorCallback2 = (colorFromChild) => {
        console.log("I'm Color 2 in the App componenet, I got the following from my child", colorFromChild);
        const { gameInfo } = this.state;
        gameInfo['color2'] = colorFromChild;
        this.setState({
            gameInfo : {...gameInfo}
        })
    }
    colorCallback3 = (colorFromChild) => {
        console.log("I'm Color 3 in the App componenet, I got the following from my child", colorFromChild);
        const { gameInfo } = this.state;
        gameInfo['color3'] = colorFromChild;
        this.setState({
            gameInfo : {...gameInfo}
        })
    }
    selectedColorCallback = (selectedColor) => {
        console.log(selectedColor + " has been selected")
        const { gameInfo } = this.state;
        gameInfo['currentlySelected'] = selectedColor;
        this.setState({
            gameInfo : {...gameInfo}
        })
    }
    gameGridCallback = (newGameGrid, gridLocation, newColor) => {
        const rgbValues = this.state.gameInfo[newColor];
        newGameGrid[gridLocation].colorNum = newColor;
        const { gameInfo } = this.state
        gameInfo['gameGrid'] = newGameGrid
        this.setState({
            gameInfo : {...gameInfo}
        })
        this.passUpGameInfo();
    }
    render() {
        const {color1, color2, color3, currentlySelected, gridSize, gameGrid} = this.state.gameInfo
        const { gameInfo } = this.state;
        return (
            <div className="pageContainer">
                <div className="gutter">
                    <ColorPicker name="color1" color={color1} colorCallbackFromParent={this.colorCallback1} selectedCallbackFromParent={this.selectedColorCallback}/>
                    <ColorPicker name="color2" color={color2} colorCallbackFromParent={this.colorCallback2} selectedCallbackFromParent={this.selectedColorCallback}/>
                    <ColorPicker name="color3" color={color3} colorCallbackFromParent={this.colorCallback3} selectedCallbackFromParent={this.selectedColorCallback}/>
                </div>
                <div className="mainDisplay">
                    <GameGrid gameInfo={{...gameInfo}} gameGridCallback={this.gameGridCallback}/>
                    <CheckValidity color1={color1} color2={color2} color3={color3} gridSize={gridSize}/>
                </div>
                <div style={this.gutterStyle}>
                    {/* <button onClick={this.new5x5Game}>New 5x5 Game</button> */}
                </div>
            </div>
        )
    }
}

export default SudoSudokuApp;
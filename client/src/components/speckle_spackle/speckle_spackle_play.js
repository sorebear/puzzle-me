import React, {Component} from 'react';
import ColorPicker from './color_picker';
import GameGrid from './game_grid';
import './sudoku_style.css';
import CheckValidity from './check_validity.js';

class SudoSudokuApp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            color1 : props.gameInfo.color1,
            color2 : props.gameInfo.color2,
            color3 : props.gameInfo.color3,
            currentlySelected : null,
            gridSize : props.gameInfo.gridSize
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
        this.new5x5Game = this.new5x5Game.bind(this);
    }
    new5x5Game() {
        console.log('buttonClicked');
        this.setState({
            gridSize : 5
        })
    }
    colorCallback1 = (colorFromChild) => {
        console.log("I'm Color 1 in the App componenet, I got the following from my child", colorFromChild);
        this.setState({
            color1 : colorFromChild
        })
    }
    colorCallback2 = (colorFromChild) => {
        console.log("I'm Color 2 in the App componenet, I got the following from my child", colorFromChild);
        this.setState({
            color2 : colorFromChild
        })
    }
    colorCallback3 = (colorFromChild) => {
        console.log("I'm Color 3 in the App componenet, I got the following from my child", colorFromChild);
        this.setState({
            color3 : colorFromChild
        })
    }
    selectedColorCallback = (selectedColor) => {
        console.log(selectedColor + " has been selected")
        this.setState({
            currentlySelected : selectedColor
        })
    }
    render() {
        const {color1, color2, color3, currentlySelected, gridSize} = this.state
        return (
            <div className="pageContainer">
                <div className="gutter">
                    <ColorPicker name="color1" colorCallbackFromParent={this.colorCallback1} selectedCallbackFromParent={this.selectedColorCallback}/>
                    <ColorPicker name="color2" colorCallbackFromParent={this.colorCallback2} selectedCallbackFromParent={this.selectedColorCallback}/>
                    <ColorPicker name="color3" colorCallbackFromParent={this.colorCallback3} selectedCallbackFromParent={this.selectedColorCallback}/>
                </div>
                <div className="mainDisplay">
                    <GameGrid innerGridSize={gridSize} outerGridSize={gridSize + 2} color1={color1} color2={color2} color3={color3} currentlySelected={currentlySelected}/>
                    <CheckValidity color1={color1} color2={color2} color3={color3} gridSize={gridSize}/>
                </div>
                <div style={this.gutterStyle}>
                    <button onClick={this.new5x5Game}>New 5x5 Game</button>
                </div>
            </div>
        )
    }
}

export default SudoSudokuApp;
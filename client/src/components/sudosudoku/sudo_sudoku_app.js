import React, {Component} from 'react';
import ColorPicker from './color_picker';
import GameGrid from './game_grid';
import './sudoku_style.css';

class SudoSudokuApp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            color1 : null,
            color2 : null,
            color3 : null,
            currentlySelected : null
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
        const {color1, color2, color3, currentlySelected} = this.state
        return (
            <div className="pageContainer">
                <div className="gutter">
                    <ColorPicker name="color1" colorCallbackFromParent={this.colorCallback1} selectedCallbackFromParent={this.selectedColorCallback}/>
                    <ColorPicker name="color2" colorCallbackFromParent={this.colorCallback2} selectedCallbackFromParent={this.selectedColorCallback}/>
                    <ColorPicker name="color3" colorCallbackFromParent={this.colorCallback3} selectedCallbackFromParent={this.selectedColorCallback}/>
                </div>
                <div className="mainDisplay">
                    <GameGrid gridSize={4} color1={color1} color2={color2} color3={color3} currentlySelected={currentlySelected}/>
                </div>
                <div style={this.gutterStyle}></div>
            </div>
        )
    }
}

export default SudoSudokuApp;
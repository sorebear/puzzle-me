import React, {Component} from 'react';
import ColorPicker from './color_picker';
import GameGridPlay from './game_grid_play';
import './sudoku_style.css';
import CheckValidity from './check_validity.js';
import dummy_grid from './dummy_grid'

class SpeckleSpackleTestPlay extends Component {
    constructor(props) {
        super(props);
        this.state = {
            gameInfo : {
                color0 : props.gameInfo.color0,
                color1 : props.gameInfo.color1,
                color2 : props.gameInfo.color2,
                color3 : props.gameInfo.color3,
                currentlySelected : props.gameInfo.currentlySelected,
                numOfColors : 3,
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
    }

    componentWillMount() {
        this.resetSquares()
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
    render() {
        const { gameInfo } = this.state
        return (
            <div className="pageContainer">
                <div className="gutter"></div>
                <div className="mainDisplay">
                    <GameGridPlay gameInfo={{...gameInfo}} callback={this.gridIndexCallback} />
                </div>
                <div className="gutter"></div>
            </div>
        )
    }
}

export default SpeckleSpackleTestPlay;
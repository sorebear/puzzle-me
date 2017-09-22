import React, {Component} from 'react';
import ColorPicker from './color_picker';
import GameGridPlay from './game_grid_play';
import './sudoku_style.css';
import CheckValidity from './check_validity.js';
import dummy_grid from './dummy_grid'

class SpeckleSpackleTestPlay extends Component {
    constructor(props) {
        super(props);
        console.log("Here is Dummy Grid", dummy_grid)
        this.state = {
            gameInfo : {
                color0 : dummy_grid.color0,
                color1 : dummy_grid.color1,
                color2 : dummy_grid.color2,
                color3 : dummy_grid.color3,
                currentlySelected : dummy_grid.currentlySelected,
                numOfColors : 3,
                gridSize : dummy_grid.gridSize,
                gameGrid : dummy_grid.gameGrid
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
                <div className="mainDisplay">
                    <GameGridPlay gameInfo={{...gameInfo}} callback={this.gridIndexCallback} />
                    <CheckValidity color1={gameInfo.color1} color2={gameInfo.color2} color3={gameInfo.color3} gridSize={gameInfo.gridSize}/>
                </div>
            </div>
        )
    }
}

export default SpeckleSpackleTestPlay;
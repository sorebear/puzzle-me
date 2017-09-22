import React, {Component} from 'react';
import GridSquare from './grid_square';

class GameGrid extends Component {
    constructor(props) {
        super(props);
        this.innerGridSize = props.gameInfo.gridSize;
        this.outerGridSize = props.gameInfo.gridSize + 2;
        this.squareWidth = Math.floor(100 / this.outerGridSize)
        this.state = {
            gameInfo : {
                color0 : props.gameInfo.color0,
                color1 : props.gameInfo.color1,
                color2 : props.gameInfo.color2,
                color3 : props.gameInfo.color3,
                currentlySelected : props.gameInfo.currentlySelected,
                gameGrid : props.gameInfo.gameGrid
            }
        }
    }

    componentWillReceiveProps(nextProps) {
        const { gameInfo } = nextProps
        this.setState({
            gameInfo : {...gameInfo}
        })
    }


    render() {
        const {gameGrid} = this.state.gameInfo;
        const grid = gameGrid.map((item, index) => {
            return ( 
                <GridSquare 
                    callback={this.props.gridIndexCallback} 
                    key={index} 
                    index={index} 
                    bgColor={this.state.gameInfo[item.colorNum]} 
                    name={item.name} 
                    className={item.className} 
                    width={this.squareWidth} 
                    gameGrid = {[...gameGrid]}
                />
            )
        })
        return (
            <div className="grid-style">{grid}</div>
        )
    }
}

export default GameGrid;
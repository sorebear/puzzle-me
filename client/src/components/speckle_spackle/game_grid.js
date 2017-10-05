import React, {Component} from 'react';
import GridSquare from './grid_square';

class GameGrid extends Component {
    constructor(props) {
        super(props);
        this.squareWidth = Math.floor(100 / (props.gameInfo.gridSize + 2))
        this.state = {
            gameInfo : {
                color0 : props.gameInfo.color0,
                color1 : props.gameInfo.color1,
                color2 : props.gameInfo.color2,
                color3 : props.gameInfo.color3,
                currentlySelected : props.gameInfo.currentlySelected,
                gridSize : props.gameInfo.gridSize,
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
        const {gameGrid, gridSize} = this.state.gameInfo;
        const grid = gameGrid.map((item, index) => {
            return ( 
                <GridSquare 
                    callback={this.props.gridIndexCallback}
                    clueCallback={this.props.clueIndexCallback}
                    key={index} 
                    index={index} 
                    bgColor={this.state.gameInfo[item.colorNum]} 
                    name={item.name} 
                    className={item.className} 
                    width={Math.floor(100 / (gridSize + 2))} 
                    gameGrid = {[...gameGrid]}
                    error={item.error}
                    opacity={item.opacity}
                />
            )
        })
        return (
            <div className="grid-style">{grid}</div>
        )
    }
}

export default GameGrid;
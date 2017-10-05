import React, {Component} from 'react';
import GridSquarePlay from './grid_square_play';

class GameGrid extends Component {
    constructor(props) {
        super(props);
        this.state = {
            gameGrid : props.gameInfo.gameGrid
        }
        this.color0 = props.gameInfo.color0;
        this.color1 = props.gameInfo.color1;
        this.color2 = props.gameInfo.color2;
        this.color3 = props.gameInfo.color3;
        this.colorArray = [this.color0, this.color1, this.color2, this.color3];
        this.squareWidth = Math.floor(100 / (props.gameInfo.gridSize + 2));
    }

    render() {
        const { gameGrid } = this.state;
        const grid = gameGrid.map((item, index) => {
            return ( 
                <GridSquarePlay 
                    callback={this.props.callback} 
                    key={index} 
                    index={index} 
                    color0={this.color0} 
                    bgColor={this[item.colorNum]} 
                    name={item.name} 
                    className={item.className} 
                    width={this.squareWidth}
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
import React, {Component} from 'react';
import GridSquare from './grid_square';

class GameGrid extends Component {
    constructor(props) {
        super(props);
        this.innerGridSize = props.gridSize;
        this.outerGridSize = props.gridSize + 2;
        this.squareStyle = {
            width : `${Math.floor(100 / this.outerGridSize)}%`,
            backgroundColor : '#FFFFFF',
            boxSizing: 'border-box',
            display: 'inline-block'
        }
        this.clueStyle = {
            width : `${Math.floor(100 / this.outerGridSize)}%`,
            backgroundColor : '#FFFFFF',
            border: '1px dotted grey',
            boxSizing: 'border-box',
            borderRadius: '100%',
            display: 'inline-block'
        }
        this.gridStyle = {
            width : "65vmax",
            height : "65vmax",
            maxHeight: "95vmin",
            maxWidth: "95vmin",
            display : "flex",
            flexFlow : "wrap"
        }
        this.state = {
            color0 : 'FFFFFF',
            color1 : props.color1,
            color2 : props.color2,
            color3 : props.color3,
            currentlySelected : props.currentlySelected
        }
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            color0 : 'FFFFFF',
            color1 : nextProps.color1,
            color2 : nextProps.color2,
            color3 : nextProps.color3,
            currentlySelected : nextProps.currentlySelected
        })
    }
    createGrid() {
        const border = this.innerGridSize + 1;
        let gridArray = [];
        for (let rowCounter = 0; rowCounter < this.outerGridSize; rowCounter++) {
            for (let columnCounter = 0; columnCounter < this.outerGridSize; columnCounter++) {
                let newObj = {};
                if (rowCounter === 0 || columnCounter === 0 || rowCounter === border || columnCounter === border) {
                    newObj = {
                        name : 'clue',
                        className :  `${rowCounter}x${columnCounter}`,
                        style : this.clueStyle,
                        createOnClick : this.sqaureClickHandlerCreate,
                        playOnClick : this.sqaureClickHandlerPlay
                    }
                } else {
                    newObj = {
                        name : 'square',
                        className : `${rowCounter}x${columnCounter}`, 
                        style : this.squareStyle,
                        createOnClick : null,
                        playOnClick : null
                    }
                }
                gridArray.push(newObj);
            }
        }
        return gridArray;
    }
    render() {
        const {color0, color1, color2, color3, currentlySelected} = this.state;
        const gridArray = this.createGrid();
        const grid = gridArray.map((item, index) => {
            return ( 
                <GridSquare 
                    key={index} 
                    name={item.name} 
                    className={item.className} 
                    style={item.style} 
                    onClick={item.createOnClick}
                    color0={color0}
                    color1={color1}
                    color2={color2}
                    color3={color3}
                    currentlySelected={currentlySelected}
                    endingEdge={this.innerGridSize + 1}
                />
            )
        })
        return (
            <div style={this.gridStyle} className={this.props.className}>{grid}</div>
        )
    }
}

export default GameGrid;
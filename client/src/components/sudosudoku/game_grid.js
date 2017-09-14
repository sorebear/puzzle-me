import React, {Component} from 'react';
import GridSquare from './grid_square';

class GameGrid extends Component {
    constructor(props) {
        super(props);
        this.innerGridSize = props.gridSize;
        this.outerGridSize = props.gridSize + 2;
        this.squareStyle = {
            width : null,
            backgroundColor : 'rgb(255, 255, 255)',
        }
        this.clueStyle = {
            width : null,
            backgroundColor : 'rgb(255, 255, 255)',
            opacity: '0'
        }
        this.cornerStyle = {
            width : null,
            backgroundColor : 'transparent',
            boxSizing: 'border-box',
            display: 'inline-block'
        }
        this.state = {
            color0 : 'rgb(255, 255, 255)',
            color1 : props.color1,
            color2 : props.color2,
            color3 : props.color3,
            currentlySelected : props.currentlySelected,
            augmentGuide : [
                {position: 17, newColorNum: 'color2'}, 
                {position: 15, newColorNum: 'color1'} ]
        }
    }
    componentWillReceiveProps(nextProps) {
        if (this.props.gridSize !== nextProps.gridSize) {
            this.createGrid();
        }
        this.setState({
            color0 : 'rgb(255, 255, 255)',
            color1 : nextProps.color1,
            color2 : nextProps.color2,
            color3 : nextProps.color3,
            currentlySelected : nextProps.currentlySelected
        })
    }
    createGrid() {
        const {innerGridSize, outerGridSize} = this.props
        const border = innerGridSize + 1;
        this.squareStyle.width = `${Math.floor(100 / outerGridSize)}%`;
        this.clueStyle.width = `${Math.floor(100 / outerGridSize)}%`;
        this.cornerStyle.width = `${Math.floor(100 / outerGridSize)}%`;
        let gridArray = [];
        for (let rowCounter = 0; rowCounter < outerGridSize; rowCounter++) {
            for (let columnCounter = 0; columnCounter < outerGridSize; columnCounter++) {
                let newObj = {};
                if (rowCounter === 0 || columnCounter === 0 || rowCounter === border || columnCounter === border) {
                    if (rowCounter === columnCounter || (rowCounter === 0 && columnCounter === border) || (rowCounter === border && columnCounter === 0)) {
                        newObj = {
                            name : 'corner',
                            className : `row${rowCounter} column${columnCounter}`,
                            style : this.cornerStyle,
                        }
                    } else {
                        newObj = {
                            name : 'clue',
                            className : `row${rowCounter} column${columnCounter}`,
                            style : this.clueStyle,
                            createOnClick : this.sqaureClickHandlerCreate,
                            playOnClick : this.sqaureClickHandlerPlay,
                            colorNum : 'color0'
                        }
                    }
                } else {
                    newObj = {
                        name : 'square',
                        className : `row${rowCounter} column${columnCounter}`, 
                        style : this.squareStyle,
                        createOnClick : null,
                        playOnClick : null,
                        colorNum : 'color0'
                    }
                }
                gridArray.push(newObj);
            }
        }
        return gridArray;
    }
    augmentGrid(gridArray) {
        const { augmentGuide } = this.state
        for (let i = 0; i < augmentGuide.length; i++) {
            console.log(augmentGuide);
            console.log(gridArray);
            gridArray[augmentGuide[i].position].colorNum = augmentGuide[i].newColorNum;
        }
        return gridArray;
    }
    render() {
        const {color0, color1, color2, color3, currentlySelected} = this.state;
        let gridArray = this.createGrid();
        gridArray = this.augmentGrid(gridArray);
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
                    colorNum={item.colorNum}
                    currentlySelected={currentlySelected}
                    endingEdge={this.props.innerGridSize + 1}
                />
            )
        })
        return (
            <div className="grid-style">{grid}</div>
        )
    }
}

export default GameGrid;
import React, {Component} from 'react';
import GridSquare from './grid_square';

class GameGrid extends Component {
    constructor(props) {
        super(props);
        this.innerGridSize = props.gameInfo.gridSize;
        this.outerGridSize = props.gameInfo.gridSize + 2;
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
            backgroundColor : 'rgb(255, 255, 255)',
            width : null,
        }

        this.state = {
            color0 : [255, 255, 255],
            color1 : props.gameInfo.color1,
            color2 : props.gameInfo.color2,
            color3 : props.gameInfo.color3,
            currentlySelected : props.gameInfo.currentlySelected,
            gameGrid : props.gameInfo.gameGrid
        }
    }

    componentDidMount() {
        if (this.props.gameGrid === undefined) {
            const newGrid = this.createGrid();
            this.setState({
                gameGrid : [...newGrid]
            })
        } else {
            const newGrid = this.props.gameInfo.gameGrid;
            this.setState({
                gameGrid : [...newGrid]
            })
        }
    }

    componentWillReceiveProps(nextProps) {
        console.log("Game Grid is Receiving New Props", nextProps)
        let newGrid = null;
        if (this.innerGridSize !== nextProps.gameInfo.gridSize) {
            console.log("I'm making a new grid");
            newGrid = this.createGrid();
        } else {
            console.log("I'm sticking with my currentGrid")
            newGrid = nextProps.gameInfo.gameGrid
        }
        this.setState({
            color0 : [255, 255, 255],
            color1 : nextProps.gameInfo.color1,
            color2 : nextProps.gameInfo.color2,
            color3 : nextProps.gameInfo.color3,
            currentlySelected : nextProps.gameInfo.currentlySelected,
            // gameGrid : [...newGrid]
        })
    }
    createGrid() {
        const innerGridSize = this.innerGridSize;
        const outerGridSize = this.outerGridSize;
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
                            index : (rowCounter * outerGridSize) + columnCounter,
                            name : 'corner',
                            className : `row${rowCounter} column${columnCounter}`,
                            style : this.cornerStyle,
                            colorNum : 'color0'
                        }
                    } else {
                        newObj = {
                            index : (rowCounter * outerGridSize) + columnCounter,
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
                        index : (rowCounter * outerGridSize) + columnCounter,
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

    render() {
        const {color0, color1, color2, color3, currentlySelected, gameGrid} = this.state;
        const grid = gameGrid.map((item, index) => {
            return ( 
                <GridSquare 
                    key={index}
                    index={index}
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
                    gameGridCallback={this.props.gameGridCallback}
                    gameGrid={gameGrid}
                />
            )
        })
        return (
            <div className="grid-style">{grid}</div>
        )
    }
}

export default GameGrid;
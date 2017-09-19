import React, { Component } from 'react';
import GameGrid from './game_grid';
import ClueSquare from './clue_square';

class GridSquare extends Component {
    constructor(props) {
        super(props);
        this.state = {
            color0 : props.color0,
            color1 : props.color1,
            color2 : props.color2,
            color3 : props.color3,
            colorNum : props.colorNum,
            currentlySelected : props.currentlySelected,
            squareStyle : props.style,
            gameGrid : props.gameGrid
        }
    }

    componentDidMount() {
        const {squareStyle, colorNum} = this.props;
        const currentColor = this.state[colorNum]
        squareStyle['backgroundColor'] = `rgb(${currentColor[0]},${currentColor[1]},${currentColor[2]})`;
        this.setState({
            squareStyle : {...squareStyle}
        })
    }

    componentWillReceiveProps(nextProps) {
        const {squareStyle} = this.state;
        const {colorNum} = nextProps;
        squareStyle['backgroundColor'] = `rgb(${nextProps[colorNum][0]},${nextProps[colorNum][1]},${nextProps[colorNum][2]})`;
        this.setState({
            color0 : nextProps.color0,
            color1 : nextProps.color1,
            color2 : nextProps.color2,
            color3 : nextProps.color3,
            currentlySelected : nextProps.currentlySelected,
            squareStyle : {...squareStyle}
        })
    }
    
    getKeyByValue(object, value) {
        return Object.keys(object).find(key => object[key] === value);
    }

    passUpGridLocation(square, newColor) {
        const { gameGrid } = this.state;
        this.props.gameGridCallback([...gameGrid], square, newColor);
    }

    squareClickHandler(event) {
        console.log("Current ColorNum", this.state.colorNum)
        const { squareStyle, currentlySelected, colorNum, color0 } = this.state;
        const currentColor = this.state[colorNum]
        console.log("Logging Current color", currentColor)
        if (colorNum === "color0") {
            squareStyle['backgroundColor'] = `rgb(${currentColor[0]},${currentColor[1]},${currentColor[2]})`;
            console.log("Passing Up", event.target.id, this.state.currentlySelected)
            this.setState({
                colorNum : currentlySelected,
                squareStyle : {...squareStyle}
            })
            this.passUpGridLocation(event.target.id, this.state.currentlySelected)
        } else {
            squareStyle['backgroundColor'] = `rgb(${color0[0]},${color0[1]},${color0[2]})`;
            console.log("Passing Up", event.target.id, "color0")
            this.setState({
                colorNum : "color0",
                squareStyle : {...squareStyle}
            })
            this.passUpGridLocation(event.target.id, "color0")
        }
    }

    render() {
        if (this.props.name === "square") {
            return (
                <div name={this.props.name} id={this.props.index} className={this.props.className} style={{...this.state.squareStyle}} onClick={(e) => this.squareClickHandler(e)}/>
            )
        } else if (this.props.name === "clue") {
            return (
                <ClueSquare name={this.props.name} index={this.props.index} endingEdge={this.props.endingEdge} colorNum={this.state.colorNum} className={this.props.className} style={{...this.state.squareStyle}} onClick={this.clueClickHandlerCreate}/>
            )
        } else {
            return (
                <div name={this.props.name} id={this.props.index} className={this.props.className} style={{...this.state.squareStyle}}/>
            )
        }
    }
}

export default GridSquare;
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
            style : props.style,
            gameGrid : props.gameGrid
        }
    }

    componentDidMount() {
        console.log("My Props at Mount", this.props)
        const {colorNum, index, gameGrid, style} = this.props;
        const currentColor = this.state[colorNum]
        style["backgroundColor"] = `rgb(${currentColor[0]},${currentColor[1]},${currentColor[2]})`;
        console.log("Component Mounting", gameGrid[index]["style"].backgroundColor)
        gameGrid[index]["style"].backgroundColor = `rgb(${currentColor[0]},${currentColor[1]},${currentColor[2]})`;
        this.setState({
            style : {...style},
            gameGrid : {...gameGrid}
        })
    }

    componentWillReceiveProps(nextProps) {
        const {style} = this.state;
        const {colorNum} = nextProps;
        style['backgroundColor'] = `rgb(${nextProps[colorNum][0]},${nextProps[colorNum][1]},${nextProps[colorNum][2]})`;
        this.setState({
            color0 : nextProps.color0,
            color1 : nextProps.color1,
            color2 : nextProps.color2,
            color3 : nextProps.color3,
            currentlySelected : nextProps.currentlySelected,
            style : {...style}
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
        const { style, currentlySelected, colorNum, color0 } = this.state;
        const currentColor = this.state[colorNum]
        if (colorNum === "color0") {
            style['backgroundColor'] = `rgb(${currentColor[0]},${currentColor[1]},${currentColor[2]})`;
            this.setState({
                colorNum : currentlySelected,
                style : {...style}
            })
            this.passUpGridLocation(event.target.id, this.state.currentlySelected)
        } else {
            style['backgroundColor'] = `rgb(${color0[0]},${color0[1]},${color0[2]})`;
            this.setState({
                colorNum : "color0",
                style : {...style}
            })
            this.passUpGridLocation(event.target.id, "color0")
        }
    }

    render() {
        if (this.props.name === "square") {
            return (
                <div name={this.props.name} id={this.props.index} className={this.props.className} style={{...this.state.style}} onClick={(e) => this.squareClickHandler(e)}/>
            )
        } else if (this.props.name === "clue") {
            return (
                <ClueSquare name={this.props.name} index={this.props.index} endingEdge={this.props.endingEdge} colorNum={this.state.colorNum} className={this.props.className} style={{...this.state.style}} onClick={this.clueClickHandlerCreate}/>
            )
        } else {
            return (
                <div name={this.props.name} id={this.props.index} className={this.props.className} style={{...this.state.style}}/>
            )
        }
    }
}

export default GridSquare;
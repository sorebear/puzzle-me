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
            squareStyle : props.style
        }
        this.squareClickHandlerCreate = this.squareClickHandlerCreate.bind(this);
    }

    componentDidMount() {
        const {squareStyle, color0} = this.state;
        squareStyle['backgroundColor'] = color0;
        this.setState({
            colorNum : 'color0',
            squareStyle : {...squareStyle}
        })
    }

    componentWillReceiveProps(nextProps) {
        const {squareStyle, colorNum} = this.state;
        squareStyle['backgroundColor'] = `${nextProps[colorNum]}`;
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

    squareClickHandlerCreate() {
        const {squareStyle, currentlySelected} = this.state;
        console.log(squareStyle.backgroundColor, this.state[this.state.currentlySelected], this.state.color0);
        if (squareStyle.backgroundColor === this.state[this.state.currentlySelected]) {
            squareStyle['backgroundColor'] = this.state.color0
            this.setState({
                colorNum : 'color0',
                squareStyle : {...squareStyle}
            });
        } else {
            squareStyle['backgroundColor'] = this.state[this.state.currentlySelected]
            this.setState({
                colorNum : currentlySelected,
                squareStyle : {...squareStyle}
            });
        }
    }

    render() {
        if (this.props.name === "square") {
            return (
                <div name={this.props.name} className={this.props.className} style={{...this.state.squareStyle}} onClick={this.squareClickHandlerCreate}/>
            )
        } else if (this.props.name === "clue") {
            return (
                <ClueSquare name={this.props.name} endingEdge={this.props.endingEdge} colorNum={this.state.colorNum} className={this.props.className} style={{...this.state.squareStyle}} onClick={this.clueClickHandlerCreate}/>
            )
        } else {
            return (
                <div name={this.props.name} className={this.props.className} style={{...this.state.squareStyle}}/>
            )
        }
    }
}

export default GridSquare;
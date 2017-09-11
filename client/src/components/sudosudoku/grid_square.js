import React, { Component } from 'react';
import GameGrid from './game_grid';

class GridSquare extends Component {
    constructor(props) {
        super(props);
        this.state = {
            color0 : props.color0,
            color1 : props.color1,
            color2 : props.color2,
            color3 : props.color3,
            colorNum : null,
            currentlySelected : props.currentlySelected,
            squareStyle : props.style
        }
        this.squareClickHandlerCreate = this.squareClickHandlerCreate.bind(this);
        this.clueClickHandlerCreate = this.clueClickHandlerCreate.bind(this);
    }
    componentDidMount() {
        const {squareStyle, color0} = this.state;
        squareStyle.backgroundColor = `#${color0}`;
        this.setState({
            colorNum : 'color0',
            squareStyle : {...squareStyle}
        })
    }
    componentWillReceiveProps(nextProps) {
        const {squareStyle, colorNum} = this.state;
        squareStyle['backgroundColor'] = `#${nextProps[colorNum]}`;
        this.setState({
            color0 : nextProps.color0,
            color1 : nextProps.color1,
            color2 : nextProps.color2,
            color3 : nextProps.color3,
            currentlySelected : nextProps.currentlySelected,
            squareStyle : {...squareStyle}
        })
    }
    clueClickHandlerCreate() {
        const row = parseInt(this.props.className.substr(0,1));
        const column = parseInt(this.props.className.substr(2,1));
        let newColor = this.state[this.state.colorNum];
        if (row === column || (row === this.props.endingEdge && column === 0) || (column === this.props.endingEdge && row === 0)) {
            console.log("This is a corner space")
        } else if (row === 0) {
            for (let i = 1; i < this.props.endingEdge; i++) {
                let nextSquare = document.getElementsByClassName(`${i}x${column}`)[0];
                if (nextSquare.style.backgroundColor !== "rgb(255, 255, 255)") {
                    newColor = nextSquare.style.backgroundColor;
                    break;
                }
            }
        } else if (row === this.props.endingEdge) {
            for (let i = this.props.endingEdge; i > 0; i--) {
                let nextSquare = document.getElementsByClassName(`${i}x${column}`)[0];
                if (nextSquare.style.backgroundColor !== "rgb(255, 255, 255)") {
                    newColor = nextSquare.style.backgroundColor;
                    break;
                }
            }
        } else if (column === 0) {
            for (let i = 1; i < this.props.endingEdge; i++) {
                let nextSquare = document.getElementsByClassName(`${row}x${i}`)[0];
                if (nextSquare.style.backgroundColor !== "rgb(255, 255, 255)") {
                    newColor = nextSquare.style.backgroundColor;
                    break;
                }
            }
        } else {
            for (let i = this.props.endingEdge; i > 0; i--) {
                let nextSquare = document.getElementsByClassName(`${row}x${i}`)[0];
                if (nextSquare.style.backgroundColor !== "rgb(255, 255, 255)") {
                    newColor = nextSquare.style.backgroundColor;
                    break;
                }
            }
        }
        const {squareStyle, colorNum} = this.state;
        squareStyle['backgroundColor'] = newColor
        this.setState({
            squareStyle : {...squareStyle}
        })
    }
    squareClickHandlerCreate() {
        const {squareStyle, currentlySelected} = this.state;
        if (squareStyle.backgroundColor === `#${this.state[this.state.currentlySelected]}`) {
            squareStyle['backgroundColor'] = `#${this.state.color0}`
            this.setState({
                colorNum : 'color0',
                squareStyle : {...squareStyle}
            });
        } else {
            squareStyle['backgroundColor'] = `#${this.state[this.state.currentlySelected]}`
            this.setState({
                colorNum : currentlySelected,
                squareStyle : {...squareStyle}
            });
        }
    }
    render() {
        if (this.props.name === "square") {
            return (
                <div key={this.props.key} name={this.props.name} className={this.props.className} style={this.state.squareStyle} onClick={this.squareClickHandlerCreate}/>
            )
        } else {
            return (
                <div key={this.props.key} name={this.props.name} className={this.props.className} style={this.state.squareStyle} onClick={this.clueClickHandlerCreate}/>
            )
        }
    }
}

export default GridSquare;
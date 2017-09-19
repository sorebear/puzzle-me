import React, { Component } from 'react';

class ClueSquare extends Component {
    constructor(props) {
        super(props)
        this.row = null;
        this.column = null;
        this.startingEdge = props.startingEdge;
        this.endingEdge = props.endingEdge;
        this.state = {
            clueStyle : props.style
        }
        this.clueClickHandler = this.clueClickHandler.bind(this);
    }
    componentDidMount() {
        this.row = this.props.className.substr(this.props.className.indexOf("row"), 4);
        this.column = this.props.className.substr(this.props.className.indexOf("column"), 7);
    }
    componentWillReceiveProps(nextProps) {
        if (this.row === `row0`) {
            this.checkFromTop();
        } else if (this.row === `row${this.endingEdge}`) {
            this.checkFromBottom();
        } else if (this.column === `column${this.endingEdge}`) {
            this.checkFromRight();
        } else {
            this.checkFromLeft();
        }
    }
    checkFromTop() {
        const {clueStyle} = this.state;
        const columnArray = Array.from(document.getElementsByClassName(this.column));
        let newColor = "rgb(255, 255, 255)";
        for (let i = 1; i < this.endingEdge; i++) {
            if (columnArray[i].style.backgroundColor !== "rgb(255, 255, 255)") {
                newColor = columnArray[i].style.backgroundColor;
                break;
            }
        }
        clueStyle['backgroundColor'] = newColor
        this.setState({
            clueStyle : {...clueStyle}
        })
    }
    checkFromBottom() {
        const {clueStyle} = this.state;
        const columnArray = Array.from(document.getElementsByClassName(this.column));
        let newColor = "rgb(255, 255, 255)";
        for (let i = this.endingEdge-1; i > 0; i--) {
            if (columnArray[i].style.backgroundColor !== "rgb(255, 255, 255)") {
                newColor = columnArray[i].style.backgroundColor;
                break;
            }
        }
        clueStyle['backgroundColor'] = newColor
        this.setState({
            clueStyle : {...clueStyle}
        })
    }
    checkFromRight() {
        const {clueStyle} = this.state;
        const rowArray = Array.from(document.getElementsByClassName(this.row));
        let newColor = "rgb(255, 255, 255)";
        for (let i = this.endingEdge-1; i > 0; i--) {
            if (rowArray[i].style.backgroundColor !== "rgb(255, 255, 255)") {
                newColor = rowArray[i].style.backgroundColor;
                break;
            }
        }
        clueStyle['backgroundColor'] = newColor
        this.setState({
            clueStyle : {...clueStyle}
        })
    }
    checkFromLeft() {
        const {clueStyle} = this.state;
        const rowArray = Array.from(document.getElementsByClassName(this.row));
        let newColor = "rgb(255, 255, 255)";
        for (let i = 1; i < this.endingEdge; i++) {
            if (rowArray[i].style.backgroundColor !== "rgb(255, 255, 255)") {
                newColor = rowArray[i].style.backgroundColor;
                break;
            }
        }
        clueStyle['backgroundColor'] = newColor
        this.setState({
            clueStyle : {...clueStyle}
        })
    }
    clueClickHandler() {
        const {clueStyle} = this.state;
        let newOpacity = null;
        if (clueStyle['opacity'] === '1') {
            newOpacity = '0'
        } else {
            newOpacity = '1'
        }
        clueStyle['opacity'] = newOpacity;
        this.setState({
            clueStyle : {...clueStyle}
        })
    }
    render() {
        const {clueStyle} = this.state
        return (
            <div name={this.props.name} id={this.props.index} className={this.props.className} style={{...clueStyle}} onClick={this.clueClickHandler}/>
        )
    }
}

export default ClueSquare;
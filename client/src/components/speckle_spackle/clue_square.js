import React, { Component } from 'react';

class ClueSquare extends Component {
    constructor(props) {
        console.log("Here are the Clue's Props", props)
        super(props)
        this.startingEdge = props.startingEdge;
        this.endingEdge = props.endingEdge;
        this.state = {
            clueStyle : props.style
        }
        this.clueClickHandler = this.clueClickHandler.bind(this);
    }

    componentWillMount() {
        const rowWidth = this.props.gridSize + 2;
        if (props.id < rowWidth) {
            //check from top
        } else if (this.props.id > (props.gameGrid.length - rowWidth)) {
            //check from bottom
        } else if (this.props.id % rowWidth === 0) {
            //check from left
        } else {
            //check from right
        }
    }

    // componentWillReceiveProps(nextProps) {
    //     if (this.row === `row0`) {
    //         this.checkFromTop();
    //     } else if (this.row === `row${this.endingEdge}`) {
    //         this.checkFromBottom();
    //     } else if (this.column === `column${this.endingEdge}`) {
    //         this.checkFromRight();
    //     } else {
    //         this.checkFromLeft();
    //     }
    // }
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
        console.log("Check From Bottom");
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
        console.log("Check From Right");
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
        console.log("Check From Left");
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
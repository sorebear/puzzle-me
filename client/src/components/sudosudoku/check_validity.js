import React, {Component} from 'react';

class CheckValidity extends Component {
    constructor(props) {
        super(props);
        this.state = {
            color1 : props.color1,
            color2 : props.color2,
            color3 : props.color3,
            gridSize: props.gridSize
        }
        this.checkPuzzleValidty = this.checkPuzzleValidty.bind(this);
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            color1 : nextProps.color1,
            color2 : nextProps.color2,
            color3 : nextProps.color3
        })
    }
    checkPuzzleValidty() {
        const {color1, color2, color3} = this.state;
        console.log('Checking If Your Puzzle is Valid');
        this.areSelectedColorsDifferent(color1, color2, color3);
        this.isEachColorInEveryRowOnce(color1, color2, color3);
        this.isEachColorInEveryColumnOnce(color1, color2, color3);
    }
    areSelectedColorsDifferent(color1, color2, color3) {
        console.log("CHECKING COLORS");
        if (color1 === color2 || color1 === color3 || color2 === color3) {
            console.log('Sorry, two or more of your colors are the same');
        } 
    }
    isEachColorInEveryRowOnce() {
        console.log("CHECKING ROWS");
        const {gridSize} = this.state;
        for (let i = 1; i <= gridSize; i++) {
            let colorArray = Array.from(arguments);
            let currentRow = Array.from(document.getElementsByClassName(`row${i}`));
            for (let k = 1; k <= gridSize; k++) {
                if (currentRow[k].style.backgroundColor !== "rgb(255, 255, 255)") {
                    const indexOfColor = colorArray.indexOf(currentRow[k].style.backgroundColor)
                    if (indexOfColor === -1) {
                        console.log(`There was a duplicate of ${currentRow[k].style.backgroundColor} in Row ${i}`);
                    } else {
                        colorArray.splice(indexOfColor, 1);
                    }
                }
            }
            if (colorArray.length > 0) {
                console.log(`In Row ${i}, you are missing ${colorArray.length} colors: ${colorArray}`)
            }
        }
    }
    isEachColorInEveryColumnOnce() {
        console.log("CHECKING COLUMNS");
        const {gridSize} = this.state;
        for (let i = 1; i <= gridSize; i++) {
            let colorArray = Array.from(arguments);
            let currentColumn = Array.from(document.getElementsByClassName(`column${i}`));
            for (let k = 1; k <= gridSize; k++) {
                if (currentColumn[k].style.backgroundColor !== "rgb(255, 255, 255)") {
                    const indexOfColor = colorArray.indexOf(currentColumn[k].style.backgroundColor)
                    if (indexOfColor === -1) {
                        console.log(`There was a duplicate of ${currentColumn[k].style.backgroundColor} in Column ${i}`);
                    } else {
                        colorArray.splice(indexOfColor, 1);
                    }
                }
            }
            if (colorArray.length > 0) {
                console.log(`In Column ${i}, you are missing ${colorArray.length} colors: ${colorArray}`)
            }
        }
    }

    render() {
        return (
            <button onClick={this.checkPuzzleValidty}>Test Play</button>
        )
    }
}

export default CheckValidity;
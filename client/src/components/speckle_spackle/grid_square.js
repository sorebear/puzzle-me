import React from 'react';
import ClueSquare from './clue_square';

function GridSquare(props) {
    const style = {
        backgroundColor : `rgb(${props.bgColor[0]},${props.bgColor[1]},${props.bgColor[2]})`,
        width : `${props.width}%`
    }
    function passUpIndex(event) {
        props.callback(event.target.id);
    }

    // componentWillReceiveProps(nextProps) {}

    if (props.name === "square") {
        return (
            <div onClick={(e) => passUpIndex(e)} name={props.name} id={props.index} className={props.className} style={{...style}} ></div>
        )
    } else if (props.name === "clue") {
        return (
            <ClueSquare name={props.name} id={props.index} className={props.className} gameGrid={[...props.gameGrid]} style={{...style}} />
        )
    } else {
        return (
            <div name={props.name} id={props.index} className={props.className} style={{...style}} ></div>
        )
    }
}

export default GridSquare;
import React from 'react';

function GridSquare(props) {
    const squareStyle = {
        backgroundColor : `rgb(${props.bgColor[0]},${props.bgColor[1]},${props.bgColor[2]})`,
        borderColor : props.error ? 'red' : '',
        width : `${props.width}%`
    }
    const cornerStyle = {
        backgroundColor : "transparent",
        width : `${props.width}%`
    }
    let clueStyle = {
        backgroundColor : `rgb(${props.bgColor[0]},${props.bgColor[1]},${props.bgColor[2]})`,
        width : `${props.width}%`,
        borderColor : props.error ? 'red' : '',
        borderWidth : props.error ? '5px' : '',
        opacity : props.opacity
    }
    function hideClue(event) {
        props.clueCallback(event.target.id);
    }
    function passUpIndex(event) {
        props.callback(event.target.id);
    }

    if (props.name === "square") {
        return (
            <div onClick={(e) => passUpIndex(e)} name={props.name} id={props.index} className={props.className} style={{...squareStyle}} />
        )
    } else if (props.name === "clue") {
        return (
            <div onClick={(e) => hideClue(e)} name={props.name} id={props.index} className={props.className} style={{...clueStyle}} />
        )
    } else {
        return (
            <div name={props.name} id={props.index} className={props.className} style={{...cornerStyle}}/>
        )
    }
}

export default GridSquare;
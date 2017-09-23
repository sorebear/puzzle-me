import React from 'react';

function GridSquare(props) {
    const style = {
        backgroundColor : `rgb(${props.bgColor[0]},${props.bgColor[1]},${props.bgColor[2]})`,
        width : `${props.width}%`
    }
    let clueStyle = {
        backgroundColor : `rgb(${props.bgColor[0]},${props.bgColor[1]},${props.bgColor[2]})`,
        width : `${props.width}%`,
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
            <div onClick={(e) => passUpIndex(e)} name={props.name} id={props.index} className={props.className} style={{...style}} />
        )
    } else if (props.name === "clue") {
        return (
            <div onClick={(e) => hideClue(e)} name={props.name} id={props.index} className={props.className} style={{...clueStyle}} />
        )
    } else {
        return (
            <div name={props.name} id={props.index} className={props.className} style={{...style}}/>
        )
    }
}

export default GridSquare;
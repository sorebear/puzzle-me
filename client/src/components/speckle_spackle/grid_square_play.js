import React from 'react';

function GridSquarePlay(props) {
    const style = {
        backgroundColor : `rgb(${props.bgColor[0]},${props.bgColor[1]},${props.bgColor[2]})`,
        width : `${props.width}%`,
        borderColor : props.error ? 'red' : '',
        opacity: props.opacity
    }
    const cornerStyle = {
        backgroundColor : "transparent",
        width : `${props.width}%`
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
            <div name={props.name} id={props.index} className={props.className} style={{...style}} />
        )
    } else {
        return (
            <div name={props.name} id={props.index} className={props.className} style={{...cornerStyle}}/>
        )
    }
}

export default GridSquarePlay;
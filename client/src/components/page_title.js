import React from 'react';

export default (props) => {
    return (
        <div className="page-title" style={{color : props.color, backgroundColor : props.bgColor}}>
            <h1>{props.text}</h1>
            <p>{props.subText}</p>
        </div>
    )
}
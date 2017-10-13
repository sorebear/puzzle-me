import React from 'react';
import './title_style.css';

export default (props) => {
    if (props.backgroundImg) {
        return (
            <div className={`page-title ${props.backgroundImg}`} style={{color : props.color}}>
                <h3>{props.text}</h3>
                <p>{props.subText}</p>
            </div>
        )
    } else {
        return (
            <div className="page-title" style={{color : props.color, backgroundColor : props.bgColor}}>
                <h3>{props.text}</h3>
                <p>{props.subText}</p>
            </div>
        )
    }
}
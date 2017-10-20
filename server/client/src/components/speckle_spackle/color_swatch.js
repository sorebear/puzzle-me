import React, { Component } from 'react';

function ColorSwatch(props) {
    if (props.name === props.currentlySelected) {
        return (
            <div className="m-1" style={{position: "relative"}}>
                <i 
                    className="swatch fa fa-check-circle" 
                    title={`rgb(${props.color[0]},${props.color[1]},${props.color[2]})`} 
                    onClick={() => {props.selectedCallback(props.name)}} 
                    style={{color : `rgb(${props.color[0]},${props.color[1]},${props.color[2]})`}}
                ></i>
                <i 
                    className="fa fa-refresh" 
                    style={{fontSize: "4vh", position: "absolute", left:"0", bottom:"0"}} 
                    onClick={() => {props.randomColorCallback(props.name)}}
                ></i>
            </div>
        )
    } else {
        return (
            <div className="m-1" style={{position: "relative"}}>
                <i 
                    className="swatch fa fa-circle" 
                    title={`rgb(${props.color[0]},${props.color[1]},${props.color[2]})`} 
                    onClick={() => {props.selectedCallback(props.name)}} 
                    style={{color : `rgb(${props.color[0]},${props.color[1]},${props.color[2]})`}}
                ></i>
                <i 
                    className="fa fa-refresh" 
                    style={{fontSize: "4vh", position: "absolute", left:"0", bottom:"0"}} 
                    onClick={() => {props.randomColorCallback(props.name)}}
                ></i>
            </div>
        )   
    }
}

export default ColorSwatch;
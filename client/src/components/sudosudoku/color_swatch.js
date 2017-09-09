import React, { Component } from 'react';

class ColorSwatch extends Component {
    constructor(props) {
        super(props)
        console.log(props);
        this.swatchStyle = {
            width: '100px',
            height: '100px',
            borderRadius: '100%',
            backgroundColor: `rgb(${props.red},${props.green},${props.blue})`
        }
    }
    componentWillReceiveProps(nextProps) {
        this.swatchStyle.backgroundColor = `rgb(${nextProps.red},${nextProps.green},${nextProps.blue})`
    }
    render() {
        return (
            <div style={this.swatchStyle}></div>
        )   
    }
}

export default ColorSwatch;
import React, { Component } from 'react';

class ColorSwatch extends Component {
    constructor(props) {
        super(props)
        this.state = {
            swatchStyle : {
                backgroundColor: `rgb(${this.props.red}, ${this.props.green}, ${this.props.blue})`
            }
        }
        this.passUpSelectedColor = this.passUpSelectedColor.bind(this)
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            swatchStyle : {
                backgroundColor: `rgb(${nextProps.red},${nextProps.green},${nextProps.blue})`
            }
        });
    }
    passUpSelectedColor() {
        this.props.selectedCallbackFromParent(this.props.name);
    }
    render() {
        const {swatchStyle} = this.state
        return (
            <div className="swatch" style={swatchStyle} onClick={this.passUpSelectedColor}></div>
        )   
    }
}

export default ColorSwatch;
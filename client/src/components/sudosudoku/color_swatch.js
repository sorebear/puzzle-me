import React, { Component } from 'react';

class ColorSwatch extends Component {
    constructor(props) {
        super(props)
        this.state = {
            swatchStyle : {
                width: '100%',
                height: '12vw',
                borderRadius: '100%',
                backgroundColor: `rgb(${this.props.red}, ${this.props.green}, ${this.props.blue})`
            }
        }
        this.passUpSelectedColor = this.passUpSelectedColor.bind(this)
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            swatchStyle : {
                width: '100%',
                paddingTop: '100%',
                borderRadius: '100%',
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
            <div style={swatchStyle} onClick={this.passUpSelectedColor}></div>
        )   
    }
}

export default ColorSwatch;
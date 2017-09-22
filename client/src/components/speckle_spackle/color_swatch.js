import React, { Component } from 'react';

class ColorSwatch extends Component {
    constructor(props) {
        console.log("Color Swatch Props", props)
        super(props)
        this.state = {
            swatchStyle : {
                color: `rgb(${this.props.red}, ${this.props.green}, ${this.props.blue})`,
                boxShadow: "none"
            }
        }
        this.passUpSelectedColor = this.passUpSelectedColor.bind(this)
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.currentlySelected === nextProps.name) {
            this.setState({
                swatchStyle : {
                    color: `rgb(${nextProps.red},${nextProps.green},${nextProps.blue})`,
                    textShadow: '0 0 12px black'
                }
            });
        } else {
            this.setState({
                swatchStyle : {
                    color: `rgb(${nextProps.red},${nextProps.green},${nextProps.blue})`,
                    boxShadow: "none"
                }
            });
        }
    }
    passUpSelectedColor() {
        this.props.selectedCallbackFromParent(this.props.name);
    }
    render() {
        const {swatchStyle} = this.state
        return (
            <div className="p-1" style={{position: "relative"}}>
                <i className="swatch fa fa-circle" style={swatchStyle} onClick={this.passUpSelectedColor}></i>
                <i className="fa fa-refresh m-1" style={{fontSize: "4vw", position: "absolute", left:"0", bottom:"0"}} onClick={() => {console.log("I'm Being Clicked")}}></i>
            </div>
        )   
    }
}

export default ColorSwatch;
import React, { Component } from 'react';
import ColorSwatch from './color_swatch';

class ColorPicker extends Component {
    constructor(props) {
        super(props)
        this.state = {
            color : {
                red: props.color[0],
                green: props.color[1],
                blue: props.color[2]
            }
        }
        this.updateColor = this.updateColor.bind(this);
        this.chooseRandomRgbColor = this.chooseRandomRgbColor.bind(this);
        this.passUpColor = this.passUpColor.bind(this)
        this.inputStyle = {
            width : '35px'
        }
    }
    componentDidMount() {
        const {red, green, blue} = this.state.color
        this.passUpColor([red, green, blue]);
    }
    passUpColor(color) {
        this.props.colorCallbackFromParent(color);
    }
    updateColor(event) {
        const {value, name} = event.target;
        const {red, green, blue} = this.state.color;
        color[name] = value;
        this.setState({
             color : {...color}
        })
        this.passUpColor([red, green, blue]);
    }

    chooseRandomRgbColor() {
        console.log('Button Clicked');
        const red = Math.floor(Math.random() * 256);
        const green = Math.floor(Math.random() * 256);
        const blue = Math.floor(Math.random() * 256);
        const newColorObj = {
            red: red,
            green: green,
            blue: blue
        };
        this.setState({
            color : newColorObj
        })
        this.passUpColor([red, green, blue]);
    }

    render() {
        const {red, green, blue} = this.state.color;
        return (
            <div>
                <ColorSwatch red={red} green={green} blue={blue} currentlySelected={this.props.currentlySelected} selectedCallbackFromParent={this.props.selectedCallbackFromParent} name={this.props.name}/>
                <div className="input-group input-group-sm">
                    <button onClick={this.chooseRandomRgbColor} className="input-group-addon p-1 btn btn-outline-primary">#</button>
                    <input style={this.inputStyle} onChange={this.updateColor} type="value" name="red" min="0" max="255" value={red}/>
                    <input style={this.inputStyle} onChange={this.updateColor} type="value" name="green" min="0" max="255" value={green}/>
                    <input style={this.inputStyle} onChange={this.updateColor} type="value" name="blue" min="0" max="255" value={blue}/>
                    <button onClick={this.chooseRandomRgbColor} className="input-group-addon p-1 btn btn-outline-primary">?</button>
                </div>
                
            </div>
        )
    }
}

export default ColorPicker;
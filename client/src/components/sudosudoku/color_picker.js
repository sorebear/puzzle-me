import React, { Component } from 'react';
import ColorSwatch from './color_swatch';

class ColorPicker extends Component {
    constructor(props) {
        super(props)
        this.state = {
            color : {
                red: 0,
                green: 0,
                blue: 0
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
        this.passUpColor(`rgb(${red}, ${green}, ${blue})`);
    }
    passUpColor(color) {
        this.props.colorCallbackFromParent(color);
    }
    updateColor(event) {
        const {value, name} = event.target;
        const {color} = this.state;
        color[name] = value;
        this.setState({
             color : {...color}
        })
        this.passUpColor(`rgb(${color.red}, ${color.green}, ${color.blue})`);
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
        this.passUpColor(`rgb(${newColorObj.red}, ${newColorObj.green}, ${newColorObj.blue})`)
    }
    // chooseRandomColor() {
    //     console.log('Button Clicked');
    //     const hexArray = ['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F'];
    //     const newColorArr = [];
    //     for (let i = 0; i < 6; i++) {
    //         let newChar = hexArray[Math.floor(Math.random() * 16)];
    //         newColorArr.push(newChar);
    //     }
    //     const newColorStr = newColorArr.join('');
    //     this.setState({
    //         hex : newColorStr
    //     })
    //     this.passUpColor(newColorStr);
    // }
    render() {
        const {red, green, blue} = this.state.color;
        return (
            <div>
                <ColorSwatch red={red} green={green} blue={blue} selectedCallbackFromParent={this.props.selectedCallbackFromParent} name={this.props.name}/>
                <div className="input-group input-group-sm">
                    <label className="input-group-addon p-1">#</label>
                    <input style={this.inputStyle} onChange={this.updateColor} type="value" name="red" min="0" max="255" value={red}/>
                    <input style={this.inputStyle} onChange={this.updateColor} type="value" name="green" min="0" max="255" value={green}/>
                    <input style={this.inputStyle} onChange={this.updateColor} type="value" name="blue" min="0" max="255" value={blue}/>
                    {/* <input onChange={this.updateColor} className="form-control p-1" maxLength="6" type="text" name="hex" value={hex}/> */}
                    <button onClick={this.chooseRandomRgbColor} className="input-group-addon p-1 btn btn-outline-primary">?</button>
                </div>
                
            </div>
        )
    }
}

export default ColorPicker;
import React, { Component } from 'react';
import ColorSwatch from './color_swatch';

class ColorPicker extends Component {
    constructor(props) {
        super(props)
        this.state = {
            hex: '000000'
        }
        this.updateColor = this.updateColor.bind(this);
        this.chooseRandomColor = this.chooseRandomColor.bind(this);
        this.passUpColor = this.passUpColor.bind(this)
    }
    componentDidMount() {
        this.passUpColor(this.state.hex);
    }
    passUpColor(hexColor) {
        this.props.colorCallbackFromParent(hexColor);
    }
    updateColor(event) {
        const {value} = event.target;
        this.setState({
            hex : value
        })
        this.passUpColor(newColorStr);
    }
    chooseRandomColor() {
        const hexArray = ['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F'];
        const newColorArr = [];
        for (let i = 0; i < 6; i++) {
            let newChar = hexArray[Math.floor(Math.random() * 16)];
            newColorArr.push(newChar);
        }
        const newColorStr = newColorArr.join('');
        this.setState({
            hex : newColorStr
        })
        this.passUpColor(newColorStr);
    }
    render() {
        const {hex} = this.state;
        return (
            <div>
                <ColorSwatch hex={hex} selectedCallbackFromParent={this.props.selectedCallbackFromParent} name={this.props.name}/>
                <div className="input-group input-group-sm">
                    <label className="input-group-addon p-1">#</label>
                    <input onChange={this.updateColor} className="form-control p-1" maxLength="6" type="text" name="hex" value={hex}/>
                    <button onClick={this.chooseRandomColor} className="input-group-addon p-1 btn btn-outline-primary">?</button>
                </div>
                {/* <input onChange={this.updateColor} style={this.sliderStyle} type="range" name="green" min="0" max="255" value={green}/>
                <input onChange={this.updateColor} style={this.sliderStyle} type="range" name="blue" min="0" max="255" value={blue}/> */}
            </div>
        )
    }
}

export default ColorPicker;
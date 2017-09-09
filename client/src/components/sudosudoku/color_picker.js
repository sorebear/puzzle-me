import React, { Component } from 'react';
import ColorSwatch from './color_swatch';

class ColorPicker extends Component {
    constructor(props) {
        super(props)
        this.state = {
            color : {
                red : 0,
                green : 0,
                blue : 0
            }
        }
        this.updateColor = this.updateColor.bind(this);
    }
    updateColor(event) {
        const {name, value} = event.target;
        const {color} = this.state;
        color[name] = value;
        console.log('Name:', name);
        console.log('Value:', value);
        console.log('Color Object', color);
        this.setState({
            color : {...color}
        })

    }
    render() {
        const {red, green, blue} = this.state.color;
        return (
            <div>
                <ColorSwatch red={red} green={green} blue={blue}/>
                <input onChange={this.updateColor} type="range" name="red" min="0" max="255" value={red}/>
                <input onChange={this.updateColor} type="range" name="green" min="0" max="255" value={green}/>
                <input onChange={this.updateColor} type="range" name="blue" min="0" max="255" value={blue}/>
            </div>
        )
    }
}

export default ColorPicker;
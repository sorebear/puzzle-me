import React, { Component } from 'react';
import CreationStation from './un_block_create';


export default class extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <CreationStation updateCurrentPath={this.props.updateCurrentPath}/>
        )
    }
}
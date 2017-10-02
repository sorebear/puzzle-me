import React, { Component } from 'react';
import CreationStation from './un_block_create';


export default class extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.props.updateCurrentPath("unblock_me_create")
    }

    render() {
        return (
            <CreationStation />
        )
    }
}
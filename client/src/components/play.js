import React, { Component } from 'react';
import DummyData from './puzzle_dummy_data';
import PlayModal from '../modal';

class Play extends Component {
    constructor(props) {
        super(props)
        this.state = {
            modalInfo : null,
            showModal : "noModal"
        }
    }
    callModal(info) {
        this.setState({
            modalInfo : info,
            showModal : "showModal"
        })
    }
    close() {
        this.setState({
            showModal: "noModal"
        })
    }
    render() {
        console.log(this.state);
        const list = DummyData.map((item, index) => {
            return (
                <tr key={index} onClick={() => {this.callModal(item)}}>
                    <td>{index}</td>
                    <td>{item.name}</td>
                    <td>{item.type}</td>
                    <td>{item.size}</td>
                    <td>
                        <span style={{color: "rgb(92,184,92)"}}>
                            {item.ratingPos} <i className="fa fa-thumbs-o-up"></i> 
                        </span> 
                        &nbsp;
                        <span style={{color: "rgb(217,83,79)"}}>
                            {item.ratingNeg} <i className="fa fa-thumbs-o-down"></i>
                        </span>
                    </td>
                    <td>{item.dateCreated}</td>
                </tr>
            )
        })
        return (
            <div>
                <PlayModal showModal={this.state.showModal} info={this.state.modalInfo}/>
                <table className="table table-inverse table-striped table-hover">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Type</th>
                            <th>Size</th>
                            <th>Rating</th>
                            <th>Created</th>
                        </tr>
                    </thead>
                    <tbody>
                        {list}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default Play;
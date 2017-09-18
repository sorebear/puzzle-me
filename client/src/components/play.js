import React, { Component } from 'react';
import DummyData from './puzzle_dummy_data';
import PlayModal from '../modal';
import PageTitle from './page_title';
import Axios from 'axios';

class Play extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalInfo : null,
            showModal : "noModal",
            data: null
        }
        this.BASE_URL = 'http://localhost:3000/puzzles';
        this.QUERY_KEY = 'retrieve';
        this.QUERY_VAL = 'recent10';
        this.getData();

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
    getData(){
        Axios.get(this.BASE_URL + '?' + this.QUERY_KEY + '=' + this.QUERY_VAL).then(this.updateData).catch(err => {
            console.log("Error getting 10 most recent puzzles: ", err);
        });
    }
    updateData(response){
        console.log("Successfully received puzzle data: ", response);
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
                <PageTitle bgColor="rgb(217,83,79)" color="#222" text="PLAY" subText="choose a game below"/>
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
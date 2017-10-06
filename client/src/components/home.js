import React, { Component } from 'react';
import PageTitle from './page_title';
import Axios from 'axios';
import speckle_spackle from './imgs/speckle_spackle.png';
import word_guess from './imgs/word_guess.png';
import unblock_me from './imgs/unblock_me.png';
import HomeModal from './home_modal';


class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalInfo : null,
            showModal : "noModal",
            data: null
        }
        this.gameTypes = {
            "word_guess" : word_guess,
            "unblock_me" : unblock_me,
            "speckle_spackle" : speckle_spackle
        }
        this.BASE_URL = '/puzzles';
        this.QUERY_KEY = 'retrieve';
        this.QUERY_VAL = 'recent10';
        this.updateData = this.updateData.bind(this);
        this.callModal = this.callModal.bind(this);
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

    componentWillMount() {
        this.getData();
        this.props.updateCurrentPath("home");
    }

    getData() {
        Axios.get(this.BASE_URL + '?' + this.QUERY_KEY + '=' + this.QUERY_VAL).then(this.updateData).catch(err => {
            console.log("Error getting 10 most recent puzzles: ", err);
        });
    }

    updateData(response){
        const receivedData = response.data.data
        receivedData.sort(function(a,b){return a['likes'] - b['likes']})
        this.setState({
            data : receivedData, 
            modalInfo : receivedData[0]
        })
    }

    render() {
        const { data } = this.state;
        if (!data) {
            return (
                <h1>Loading...</h1>
            )
        }
        return (
            <div>
                <HomeModal modalInfo={this.state.modalInfo} showModal={this.state.showModal} closeModal={() => {this.close()}} />
                <PageTitle backgroundImg="sunset" color="white" text="PUZZLE ME" subText=""/>
                <div style={{margin : "auto"}} className="row">
                    <h4 className="m-1 text-center w-100">Today's Top 4</h4>
                        <div className="col-6 text-center">
                            <img onClick={() => {this.callModal(data[0])}} className="m-2" src={this.gameTypes[data[0].type]} style={{maxHeight: "23vh", maxWidth: "40vw"}} />
                            <div>{data[0].puzzle_name}</div>
                        </div>
                        <div className="col-6 text-center">
                            <img onClick={() => {this.callModal(data[1])}} className="m-2" src={this.gameTypes[data[2].type]} style={{maxHeight: "23vh", maxWidth: "40vw"}} />
                            <div>{data[1].puzzle_name}</div>
                        </div>
                        <div className="col-6 text-center">
                            <img onClick={() => {this.callModal(data[2])}} className="m-2" src={this.gameTypes[data[1].type]} style={{maxHeight: "23vh", maxWidth: "40vw"}} />
                            <div>{data[2].puzzle_name}</div>
                        </div>
                        <div className="col-6 text-center">
                            <img onClick={() => {this.callModal(data[3])}} className="m-2" src={this.gameTypes[data[3].type]} style={{maxHeight: "23vh", maxWidth: "40vw"}} />
                            <div>{data[3].puzzle_name}</div>
                        </div>
                </div>
            </div>
        )
    }
}

export default HomePage
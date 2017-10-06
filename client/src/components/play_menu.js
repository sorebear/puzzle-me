import React, { Component } from 'react';
import PlayMenuModal from '../play_menu_modal';
import PageTitle from './page_title';
import speckle_spackle from './imgs/speckle_spackle.png';
import word_guess from './imgs/word_guess.png';
import unblock_me from './imgs/unblock_me.png';
import Axios from 'axios';

Axios.defaults.headers.common['Access-Control-Allow-Origin'] = 'http://localhost:4000'
Axios.defaults.withCredentials = true;
class PlayMenu extends Component {
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
        this.URL_EXT = '/puzzles';
        this.QUERY_KEY = 'retrieve';
        this.QUERY_VAL = 'recent10';
        this.updateData = this.updateData.bind(this);
    }

    componentWillMount() {
        this.getData();
    }

    getData() {
        Axios.get(this.URL_EXT + '?' + this.QUERY_KEY + '=' + this.QUERY_VAL).then(this.updateData).catch(err => {
            console.log("Error getting 10 most recent puzzles: ", err);
        });
    }

    updateData(response){
        const receivedData = response.data.data;
        this.setState({
            data: receivedData
        });
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
        const { data } = this.state
        if (data === null) {
            return <h1>Loading...</h1>
        } else {
            const list = data.map((item, index) => {
                return (
                    <tr key={index} onClick={() => {this.callModal(item)}}>
                        <td className="align-middle">{index + 1}</td>
                        <td className="align-middle">{item.puzzle_name.length > 10 ? `${item.puzzle_name.substr(0,7)}...` : item.puzzle_name}</td>
                        <td><img src={this.gameTypes[item.type]} style={{height: "48px"}} /></td>
                        <td className="align-middle">{item.size}</td>
                        <td className="align-middle">{item.date_created.substr(0, 10)}</td>
                    </tr>
                )
            })
            return (
                <div>
                    <PageTitle backgroundImg="watchtower" color="white" text="PLAY" subText="choose a game below"/>
                    <PlayMenuModal info={this.state.modalInfo} showModal={this.state.showModal} closeModal={() => {this.close()}} />
                    <table className="table table-inverse table-striped table-hover">
                        <thead>
                            <tr>
                                <th></th>
                                <th>Name</th>
                                <th>Type</th>
                                <th>Size</th>
                                <th>Created</th>
                            </tr>
                        </thead>
                        <tbody>
                            {list}
                        </tbody>
                    </table>
                    <div style={{height: "45px", position: "absolute", bottom:"0"}}></div>
                </div>
            )
        }
    }
}

export default PlayMenu;
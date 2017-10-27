import React, { Component } from 'react';
import Axios from 'axios';

import PlayMenuModal from './play_menu_modal';
import PageTitle from './page_title';
import speckle_spackle from '../imgs/speckle_spackle.svg';
import word_guess from '../imgs/word_guess.svg';

Axios.defaults.headers.common['Access-Control-Allow-Origin'] = 'http://localhost:4000'
Axios.defaults.withCredentials = true;

class PlayMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalInfo : null,
            showModal : "noModal",
            facebookId : null,
            data: null
        }
        this.gameTypes = {
            "word_guess" : word_guess,
            "speckle_spackle" : speckle_spackle
        }
        this.URL_EXT = '/puzzles';
        this.QUERY_KEY = 'retrieve';
        this.QUERY_VAL = 'all';
        this.updateData = this.updateData.bind(this);
    }

    componentWillMount() {
        this.getData();
    }

    getData() {
        Axios.get(this.URL_EXT + '?' + this.QUERY_KEY + '=' + this.QUERY_VAL).then(this.updateData).catch(err => {
            console.log("Error getting puzzles");
        });
    }

    updateData(response){
        const receivedData = response.data.data;
        this.setState({
            data : receivedData,
            facebookId : parseInt(response.data.currentUser)
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
        const { data, facebookId } = this.state
        if (data === null) {
            return (
                <div>
                    <PageTitle backgroundImg="desert2" color="white" text="PLAY" subText="choose a game below"/>
                    <h1>Loading...</h1>
                </div>
            )
        } else {
            const list = data.map((item, index) => {
                return (
                    <li onClick={() => this.callModal(item)} className="collection-item avatar" key={index}>
                        <img src={this.gameTypes[item.type]} alt="" className="circle"/>
                        <span className="title">{item.puzzle_name}</span>
                        <p className="grey-text">
                            {item.size} <br/>
                            {`${item.date_created.substr(5, 5)}-${item.date_created.substr(2, 2)}`}
                        </p>
                        <p className="secondary-content red-text">
                            {item.completionTime ? 
                                <i className="material-icons play-list">check</i> : ''}
                            {item.facebook_u_id === facebookId ? 
                                <i className="material-icons play-list">create</i> : ''}
                            {index + 1}
                        </p>
                    </li>
                )
            })
            return (
                <div>
                    <PageTitle backgroundImg="desert2" color="white" text="PLAY" subText="choose a game below"/>
                    <PlayMenuModal info={this.state.modalInfo} type="play" showModal={this.state.showModal} closeModal={() => this.close()} />
                    <ul className="collection my-0">{list}</ul>
                    <div style={{height: "45px", position: "absolute", bottom:"0"}}></div>
                </div>
            )
        }
    }
}

export default PlayMenu;
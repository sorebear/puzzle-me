import React, { Component } from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';

import RankingsModal from './rankings_modal';
import PageTitle from './page_title';
import { avatar_array } from './avatar_array';

// Axios.defaults.headers.common['Access-Control-Allow-Origin'] = 'http://localhost:4000';
// Axios.defaults.withCredentials = true;
class Rankings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalInfo : null,
            showModal : "noModal",
            sortField : null,
            data: null
        }
        this.URL_EXT = '/getRankings';
        this.QUERY_KEY = 'retrieve';
        this.QUERY_VAL = 'user';
        this.updateData = this.updateData.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    callModal(info) {
        this.setState({
            modalInfo : info,
            showModal : "showModal"
        })  
    }

    closeModal() {
        this.setState({
            showModal: "noModal"
        })
    }

    componentWillMount() {
        this.getData();
    }

    getData() {
        Axios.get(this.URL_EXT + '?' + this.QUERY_KEY + '=' + this.QUERY_VAL).then(this.updateData).catch(err => {
            console.log("Error Loading Rankings");
        });
    }

    updateData(response){
        const receivedData = response.data.data;
        this.setState({
            data: receivedData
        });
        this.sortData("composite_solver_ranking")
    }

    sortData(field) {
        if (field === this.state.sortField) {
            this.sortDataReverse(field);
            return;
        }
        const { data } = this.state;
        data.sort(function(a,b) {return a[field] - b[field]});
        this.setState({
            data : [...data],
            sortField : field
        })
    }

    sortDataReverse(field) {
        const { data } = this.state;
        data.sort(function(a,b) {return b[field] - a[field]});
        this.setState({
            data : [...data],
            sortField : field
        })
    }

    render() {
        const { data, showModal, modalInfo } = this.state
        if (data === null) {
            return <h1>Loading...</h1>
        } else {
            const list = data.map((item, index) => {
                const date = item.account_created;
                return (
                    <li className="collection-item avatar" onClick={() => this.callModal(item)} key={index}>
                        <img src={avatar_array[item.profile_pic]} alt="" className="circle"/>
                        <span className="title">{item.username}</span>
                        <p className="grey-text">
                            XP: {item.exp_gained} <br/>
                            User Since: {`${date.substr(5, 2)}/${date.substr(8,2)}/${date.substr(0,4)}`}
                        </p>
                        <p className="secondary-content red-text">{index + 1}</p>
                    </li>
                )
            })
            return (
                <div>
                    <RankingsModal info={modalInfo} showModal={showModal} closeModal={this.closeModal}/>
                    <PageTitle backgroundImg="cityscape" color="white" text="RANKINGS"/>
                    <ul className="collection my-0">{list}</ul>
                </div>
            )
        }
    }
}

export default Rankings
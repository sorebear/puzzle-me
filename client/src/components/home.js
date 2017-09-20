import React, { Component } from 'react';
import coloruko from './imgs/coloruko.png'
import PageTitle from './page_title';
import Axios from 'axios';

class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalInfo : null,
            showModal : "noModal",
            data: null
        }
        this.BASE_URL = 'http://localhost:4000/puzzles';
        this.QUERY_KEY = 'retrieve';
        this.QUERY_VAL = 'recent10';
        this.updateData = this.updateData.bind(this);
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
    }

    getData() {
        Axios.get(this.BASE_URL + '?' + this.QUERY_KEY + '=' + this.QUERY_VAL).then(this.updateData).catch(err => {
            console.log("Error getting 10 most recent puzzles: ", err);
        });
    }

    updateData(response){
        console.log("My Response", response);
        const receivedData = response.data.data
        receivedData.sort(function(a,b){return a['likes'] - b['likes']})
        console.log("My Sorted Data", receivedData)
        this.setState({
            data: receivedData
        })
    }

    render() {
        return (
            <div>
                <PageTitle backgroundImg="forestvalley" color="white" text="PUZZLE ME" subText="today's top 4"/>
            </div>
        )
    }
}

export default HomePage;
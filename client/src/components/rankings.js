import React, { Component } from 'react';
import PlayMenuModal from '../play_menu_modal';
import PageTitle from './page_title';
import Axios from 'axios';
import rankings_dummy_data from './rankings_dummy_data';

class Rankings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalInfo : null,
            showModal : "noModal",
            data: rankings_dummy_data
        }
        this.BASE_URL = 'http://localhost:4000/users';
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
        // this.getData();
        this.sortData("composite_solver_ranking")
    }

    sortData(field) {
        const { data } = this.state;
        console.log("Data", data, "and Field", field)
        data.sort(function(a,b) {return a[field] - b[field]});
        this.setState({
            data : [...data]
        })
    }

    getData() {
        Axios.get(this.BASE_URL + '?' + this.QUERY_KEY + '=' + this.QUERY_VAL).then(this.updateData).catch(err => {
            console.log("Error getting 10 most recent puzzles: ", err);
        });
    }

    updateData(response){
        const receivedData = response.data.data
        this.setState({
            data: receivedData
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
                        <td>{item.username}</td>
                        <td className="text-center">{item.composite_solver_ranking}</td>
                        <td className="text-center">{item.composite_creator_ranking}</td>
                        <td className="text-center">{item.composite_gladiator_ranking}</td>
                    </tr>
                )
            })
            return (
                <div>
                    <PageTitle backgroundImg="cityscape" color="white" text="RANKINGS"/>
                    <table className="table table-inverse table-striped table-hover">
                        <thead>
                            <tr>
                                <th className="text-center">User</th>
                                <th className="text-center" onClick={() => {this.sortData("composite_solver_ranking")}} >Solver Rank</th>
                                <th className="text-center" onClick={() => {this.sortData("composite_creator_ranking")}}>Creator Rank</th>
                                <th className="text-center" onClick={() => {this.sortData("composite_gladiator_ranking")}}>Gladiator Rank</th>
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
}

export default Rankings
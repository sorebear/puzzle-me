import React, { Component } from 'react';
import PlayMenuModal from '../play_menu_modal';
import PageTitle from './page_title';
import axios from 'axios';

class Rankings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalInfo : null,
            showModal : "noModal",
            data: null
        }
        this.URL_EXT = '/getRankings';
        this.QUERY_KEY = 'retrieve';
        this.QUERY_VAL = 'getRankings';
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
        // this.sortData("composite_solver_ranking")
    }

    getData() {
        axios.get(this.URL_EXT + '?' + this.QUERY_KEY + '=' + this.QUERY_VAL).then(this.updateData).catch(err => {
            console.log("Error Loading Rankings: ", err);
        });
    }

    updateData(response){
        console.log(response);
        const receivedData = response.data.data;
        console.log(receivedData);
        this.setState({
            data: receivedData
        });
    }

    sortData(field) {
        const { data } = this.state;
        console.log("Data", data, "and Field", field)
        data.sort(function(a,b) {return b[field] - a[field]});
        this.setState({
            data : [...data]
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
import React, { Component } from 'react';
import PlayMenuModal from '../play_menu_modal';
import PageTitle from './page_title';
import Axios from 'axios';

Axios.defaults.headers.common['Access-Control-Allow-Origin'] = 'http://localhost:4000';
Axios.defaults.withCredentials = true;
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
        console.log("I'm getting Data!")
        Axios.get(this.URL_EXT + '?' + this.QUERY_KEY + '=' + this.QUERY_VAL).then(this.updateData).catch(err => {
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
        const { data, sortField } = this.state
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
                                <th className="text-center" onClick={() => {this.sortData("composite_solver_ranking")}} style={{backgroundColor: (sortField === 'composite_solver_ranking' ? 'grey' : '') }}>Solver Rank</th>
                                <th className="text-center" onClick={() => {this.sortData("composite_creator_ranking")}} style={{backgroundColor: (sortField === 'composite_creator_ranking' ? 'grey' : '') }}>Creator Rank</th>
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
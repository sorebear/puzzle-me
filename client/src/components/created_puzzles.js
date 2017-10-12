import React, {Component} from 'react';
import PageTitle from './page_title';
import './profile_style.css';
import Axios from 'axios';

Axios.defaults.headers.common['Access-Control-Allow-Origin'] = 'http://localhost:4000'
Axios.defaults.withCredentials = true;
export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user_id: props.user_id,
            data: null,
        }

        this.URL_EXT = '/getPuzzlesByUser';

        this.handleData = this.handleData.bind(this);
    }

    componentWillMount() {
        this.getData();
    }

    getData() {

        var userRequest = this.state.user_id ? {'user_id' : this.state.user_id} : {};
        Axios.post(SERVER_BASE_ADDRESS + this.URL_EXT , userRequest).then(this.handleData).catch(err => {
            console.log("Error getting created puzzles: ", err);
        });
    }

    handleData(response) {
        console.log("RESPINSE", response)
        const fetchedData = response
        console.log(fetchedData);
        this.setState({
            data: response.data.data
        })

    }

    render() {
        const {data} = this.state;
        if (data === null) {
            return <h1>Loading...</h1>
        } else {
            const list = data.map((item, index) => {
                console.log(item)
                return (
                    <tr key={index}>
                        <td>{item.puzzle_name}</td>
                        <td className="text-center">{item.type}</td>
                        <td className="text-center">{item.size}</td>
                    </tr>
                )
            });

            const center_theaders = {
                textAlign: 'center'
            };

            return (
                <div>
                    <PageTitle backgroundImg="cityscape" color="white" text="CREATIONS"/>
                    <table className="table table-inverse table-striped table-hover">
                        <thead>
                            <tr>
                                <th style={center_theaders}>Name</th>
                                <th style={center_theaders}>Type</th>
                                <th style={center_theaders}>Size</th>
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
import React, {Component} from 'react';
import PageTitle from './page_title';
import './profile_style.css';
import axios from 'axios';


export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user_id: props.user_id,
            data: null,
        }

        this.URL_EXT = '/getCreatedPuzzles';
        this.QUERY_KEY = 'retrieve';
        this.QUERY_VAL = 'getCreatedPuzzles';
        this.handleData = this.handleData.bind(this);
    }

    componentWillMount() {
        this.getData();
    }

    getData() {
        axios.get(this.URL_EXT + '?' + this.QUERY_KEY + '=' + this.QUERY_VAL).then(this.handleData).catch(err => {
            console.log("Error getting created puzzles: ", err);
        });
    }

    handleData(response) {
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
                return (
                    <tr key={index} onClick={() => {
                        this.callModal(item)
                    }}>
                        <td>{item.puzzle_name}</td>
                        <td className="text-center">{item.type}</td>
                        <td className="text-center">{item.size}</td>
                    </tr>
                )
            })

            return (
                <div>
                    <PageTitle backgroundImg="cityscape" color="white" text="CREATIONS"/>
                    <table className="table table-inverse table-striped table-hover">
                        <thead>
                        <tr>
                            <th>Name</th>
                            <th>Type</th>
                            <th>Size</th>
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
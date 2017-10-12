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
            pData: [],
        }

        this.URL_EXT = '/getPuzzlesByUser';
        this.handleData = this.handleData.bind(this);

        this.URL_EXT_B = '/getPuzzleFromId';
        this.QUERY_VAL_B = 'getPuzzleFromId'
        this.handlePuzzleData = this.handlePuzzleData.bind(this);
    }

    componentWillMount() {
        this.getData();
    }

    getData() {
        var userRequest = this.state.user_id ? {'user_id' : this.state.user_id} : {};
        userRequest.type='solved';
        Axios.post(SERVER_BASE_ADDRESS + this.URL_EXT, userRequest,{}).then(data=>{ console.log("DAN 4",data); this.handleData(data)}).catch(err => {
            console.log("Error getting created puzzles: ", err);
        });
    }

    handleData(response) {
        console.log("DAN: ",response);
        var fetchedData = response.data.data;
        this.setState({
            data: fetchedData
        });

        // fetchedData.map((item, index)=>{
        //     Axios.get(this.URL_EXT_B + '?' + this.QUERY_KEY + '=' + this.QUERY_VAL_B + '&' + 'p_id' + '=' + item.puzzle_id).then(this.handlePuzzleData).catch(err => {
        //         console.log("Error getting created puzzles: ", err);
        //     });
        // })
    }
    handlePuzzleData(response){
        var holder = this.state.pData;
        holder.push(response.data.data)
        this.setState({
            pData: holder
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
                        <td>{item.puzzle_name} - {item.creator_name}</td>
                        <td className="text-center">{item.type}</td>
                        <td className="text-center">{item.size}</td>
                        <td className="text-center">{item.completionTime} - {item.avg_time_to_complete}</td>
                    </tr>
                )
            });

            const center_theaders = {
                textAlign: 'center'
            };

            return (
                <div>
                    <PageTitle backgroundImg="cityscape" color="white" text="COMPLETIONS"/>
                    <table className="table table-inverse table-striped table-hover">
                        <thead>
                            <tr>
                                <th style={center_theaders}>Name - Author</th>
                                <th style={center_theaders}>Type</th>
                                <th style={center_theaders}>Size</th>
                                <th style={center_theaders}>Time / Avg</th>
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
import React, {Component} from 'react';
import PageTitle from './page_title';
import './profile_style.css';
import axios from 'axios';


export default class extends Component{
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //
    //     }
    //
    //     this.URL_EXT = '/';
    //     this.QUERY_KEY = '';
    //     this.QUERY_VAL = '';
    //     this.handleData = this.handleData.bind(this);
    // }
    //
    // componentWillMount() {
    //     this.getData();
    // }
    //
    // getData() {
    //     axios.get(this.URL_EXT + '?' + this.QUERY_KEY + '=' + this.QUERY_VAL).then(this.handleData).catch(err => {
    //         console.log("Error getting 10 most recent puzzles: ", err);
    //     });
    // }
    //
    // handleData(response){
    //     const fetchedData = response.;
    //     console.log(fetchedData);
    //
    // }
    render(){
        // const { data } = this.state
        // if (data === null) {
        //     return <h1>Loading...</h1>
        // } else {
        //     const list = data.map((item, index) => {
        //         return (
        //             <tr key={index} onClick={() => {this.callModal(item)}}>
        //                 <td>{item.username}</td>
        //                 <td className="text-center">{item.composite_solver_ranking}</td>
        //                 <td className="text-center">{item.composite_creator_ranking}</td>
        //             </tr>
        //         )
        //     })

        return(
            <div>
                <PageTitle backgroundImg="cityscape" color="white" text="CREATIONS"/>
                <table className="table table-inverse table-striped table-hover">
                    <thead>
                    <tr>
                        <th></th>
                        <th>Name</th>
                        <th>Type</th>
                        <th>Size</th>
                        {/*<th>Created</th>*/}
                    </tr>
                    </thead>
                    <tbody>
                    {/*{list}*/}
                    </tbody>
                </table>
            </div>
        )
    }
}
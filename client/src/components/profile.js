import React, {Component} from 'react';
import PageTitle from './page_title';
import './profile_style.css';
import axios from 'axios';
import CreatePuzzles from './created_puzzles';
import CompletedPuzzles from './completed_puzzles';

export default class extends Component{
    constructor(props) {
        super(props);
        this.state = {
            data: null,

            username: null,
            exp_gained: null,
            creator_rank: null,
            solver_rank: null,
            user_id: null,

            page: 'profile',
        }
        this.URL_EXT = 'http://localhost:4000/getProfile';
        this.QUERY_KEY = 'retrieve';
        this.QUERY_VAL = 'getProfile';
        this.updateData = this.updateData.bind(this);

        this.getData = this.getData.bind(this);
        this.parseData = this.parseData.bind(this);
    }

    componentWillMount(){
        this.getData();
    }

    getData() {
        axios.get(this.URL_EXT + '?' + this.QUERY_KEY + '=' + this.QUERY_VAL + '&' + 'user_id' + '=' + '4').then(this.updateData).catch(err => {
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

         this.parseData(receivedData)
    }
    parseData(data){
        var user = null;
        data.map((item, index)=>{
            if(item.username === 'wheres_waldo') {
                this.setState({
                    username: item.username,
                    solver_rank: item.composite_solver_ranking,
                    creator_rank: item.composite_creator_ranking,
                    exp_gained: item.composite_gladiator_ranking,
                    user_id: item.u_id,
                })

            }
        })

    }


    render(){
        if(this.state.page === 'profile') {
            return (
                <div>
                    <PageTitle backgroundImg="forestvalley" color="white" text="PROFILE"/>
                    <table className="table table-inverse table-striped table-hover">
                        <thead>
                        <tr>
                            <th className="text-center"><h4 className="mt-2 text-success">{this.state.username}</h4>
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr className="text-primary">
                            <td className="text-center"><h5>Exp Gained: {this.state.exp_gained}</h5></td>
                        </tr>
                        <tr className="text-info">
                            <td className="text-center"><h5>Creator Rank: {this.state.creator_rank}</h5></td>
                        </tr>
                        <tr className="text-info">
                            <td className="text-center"><h5>Solver Rank: {this.state.solver_rank}</h5></td>
                        </tr>
                        </tbody>
                    </table>
                    <div className="text-center container">
                        <button onClick={()=>{this.setState({page: 'created'})}} className="btn-md btn-outline-danger bg-inverse active text-center w-5 mb-1 w-75">
                            Created Puzzles
                        </button>
                    </div>
                    <div className="text-center container">
                        <button onClick={()=>{this.setState({page: 'completed'})}} className="btn-md btn-outline-danger bg-inverse active text-center w-75">Completed
                            Puzzles
                        </button>
                    </div>
                </div>
            )
        } else if(this.state.page === 'created'){
            return(
                <CreatePuzzles user_id={this.state.user_id}/>
            )
        } else if(this.state.page === 'completed'){
            return(
                <CompletedPuzzles/>
            )
        }
    }
}
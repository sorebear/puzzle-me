import React, {Component} from 'react';
import PageTitle from './page_title';
import './profile_style.css';
import axios from 'axios';

export default class extends Component{


    render(){
        return(
            <div>
                <PageTitle backgroundImg="forestvalley" color="white" text="PROFILE"/>
                <table className="table table-inverse table-striped table-hover">
                    <thead>
                        <tr>
                            <th className="text-center"><h4 className="mt-2 text-success">ColdSteve</h4></th>
                        </tr>
                    </thead>
                    <tbody>
                    <tr className="text-primary">
                        <td className="text-center"><h5>Exp Gained: 5,627</h5></td>
                    </tr>
                    <tr className="text-info">
                        <td className="text-center"><h5>Creator Rank: 423</h5></td>
                    </tr>
                    <tr className="text-info">
                        <td className="text-center"><h5>Solver Rank: 2</h5></td>
                    </tr>
                    </tbody>
                </table>
                <div className="text-center container">
                    <button className="btn-md btn-outline-danger bg-inverse active text-center w-5 mb-1 w-75">Created Puzzles</button>
                </div>
                <div className="text-center container">
                    <button className="btn-md btn-outline-danger bg-inverse active text-center w-75">Completed Puzzles</button>
                </div>
            </div>
        )
    }
}
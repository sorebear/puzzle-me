import React, {Component} from 'react';
import Axios from 'axios';

import word_guess from '../imgs/word_guess.png';
import speckle_spackle from '../imgs/speckle_spackle.png';
import PageTitle from './page_title';
import user from '../imgs/user.png'

Axios.defaults.headers.common['Access-Control-Allow-Origin'] = 'http://localhost:4000'
Axios.defaults.withCredentials = true;

export default class extends Component{
    constructor(props) {
        super(props);
        this.state = {
            createdPuzzles : null,
            solvedPuzzles : null,
            username : null,
            exp_gained : null
        }
        this.gameTypes = {
            "word_guess" : word_guess,
            "speckle_spackle" : speckle_spackle
        }
        this.URL_EXT_PROFILE = '/getProfile';
        this.URL_EXT_PUZZLES = '/getUserPuzzles';
        this.QUERY_KEY_PUZZLE = 'retrieve';
        this.QUERY_VAL_CREATE = 'getCreatedPuzzles';
        this.QUERY_VAL_SOLVE = 'getSolvedPuzzles';
        this.QUERY_KEY_UID = 'user_id'
    }

    componentWillMount(){
        this.getData();
    }

    getData() {
        //Axios Call To Get Information About User
        Axios.get(this.URL_EXT_PROFILE).then((res) => {
            const userInfo = res.data.data[0];
            this.setState({
                username: userInfo.username,
                exp_gained : userInfo.exp_gained
            });
            //Axios Call To Get User's Created Puzzles
            Axios.get(
                this.URL_EXT_PUZZLES + "?" +
                this.QUERY_KEY_PUZZLE + "=" +
                this.QUERY_VAL_CREATE + "&" +
                this.QUERY_KEY_UID + "=" +
                userInfo.u_id
            ).then((res) => {
                console.log("CREATED PUZZLE RESPONSE: ", res);
                this.setState({
                    createdPuzzles : res.data.data
                });
            }).catch(err => {
                console.log("Error Loading Created Puzzles: ", err);
            });
            //Axios Call To Get User's Solved Puzzles
            Axios.get(
                this.URL_EXT_PUZZLES + "?" +
                this.QUERY_KEY_PUZZLE + "=" +
                this.QUERY_VAL_SOLVE + "&" +
                this.QUERY_KEY_UID + "=" +
                userInfo.u_id
            ).then((res) => {
                console.log("SOLVED PUZZLE RESPONSE: ", res);
                this.setState({
                    solvedPuzzles : res.data.data
                });
            }).catch(err => {
                console.log("Error Loading Created Puzzles: ", err);
            })
        }).catch(err => {
            console.log("Error Loading Profile: ", err);
        });
    }
    render(){
        const { createdPuzzles, solvedPuzzles, username, exp_gained } = this.state;
        let createdList = <li className="text-center py-3">No Created Puzzles</li>;
        let solvedList = <li className="text-center py-3">No Solved Puzzles</li>;
        if (createdPuzzles) {
            createdList = createdPuzzles.map((item, index) => {
                return (
                    <li className="collection-item avatar pr-2" key={index}>
                        <img style={{left: "10px"}} src={this.gameTypes[item.type]} alt="" className="circle"/>
                        <span className="title">{item.puzzle_name}</span>
                        <p className="grey-text">
                            {item.size} <br/>
                            {item.date_created.substr(0, 10)}
                        </p>
                    </li>
                )
            });
        }
        if (solvedPuzzles) {
            solvedList = solvedPuzzles.map((item, index) => {
                return (
                    <li className="collection-item avatar pr-2" style={{paddingRight:"67px"}} key={index}>
                        <img style={{left: "10px"}} src={this.gameTypes[item.type]} alt="" className="circle"/>
                        <span className="title">{item.puzzle_name}</span>
                        <p className="grey-text">
                            {item.size} <br/>
                            {item.date_created.substr(0, 10)}
                        </p>
                    </li>
                )
            })
        }
        return (
            <div>
                <PageTitle backgroundImg="forestvalley" color="white" text="PROFILE"/>
                <div className="row mt-4 mb-0">
                    <div className="col-4">
                        <img className="circle align-text-top" style={{width:"100%"}} src={user}/>
                    </div>
                    <div className="col-8 d-flex flex-column justify-content-center">
                        <blockquote>
                            <h3 className="m-0">{username}</h3>
                            <p className="m-0">EXP POINTS: {exp_gained}</p>
                        </blockquote>
                    </div>
                    <div className="col-6 p-0 mt-4">
                        <h6 className="text-center red-text">CREATED PUZZLES</h6>
                        <ul className="collection my-0">{createdList}</ul>
                    </div>
                    <div className="col-6 p-0 mt-4">
                        <strong><h6 className="text-center red-text">SOLVED PUZZLES</h6></strong>
                        <ul className="collection my-0">{solvedList}</ul>
                    </div>
                </div>
            </div>
        )
    }
}
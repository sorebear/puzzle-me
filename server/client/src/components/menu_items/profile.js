import React, {Component} from 'react';
import Axios from 'axios';

import ProfileModal from './profile_modal';
import PlayModal from './play_menu_modal';
import PageTitle from './page_title';
import word_guess from '../imgs/word_guess.svg';
import speckle_spackle from '../imgs/speckle_spackle.svg';
import { avatar_array } from './avatar_array';

Axios.defaults.headers.common['Access-Control-Allow-Origin'] = 'http://localhost:4000'
Axios.defaults.withCredentials = true;

export default class extends Component{
    constructor(props) {
        super(props);
        this.state = {
            createdPuzzles : [],
            solvedPuzzles : [],
            username : "",
            exp_gained : null,
            profilePicNum : null,
            showProfileModal : "noModal",
            showPlayModal : "noModal",
            modalInfo : null,
        }
        this.gameTypes = {
            "word_guess" : word_guess,
            "speckle_spackle" : speckle_spackle
        }
        this.closeModal = this.closeModal.bind(this);
        this.callProfileModal = this.callProfileModal.bind(this);
        this.getData = this.getData.bind(this);
        this.URL_EXT_PROFILE = '/getProfile';
        this.URL_EXT_PUZZLES = '/getUserPuzzles';
        this.QUERY_KEY_U_ID = 'user_id'
    }

    componentWillMount(){
        this.getData();
    }

    componentWillReceiveProps() {
        this.getData();
    }

    callPlayModal(info) {
        this.setState({
            modalInfo : info,
            showPlayModal : "showModal"
        })  
    }

    callProfileModal() {
        this.setState({
            showProfileModal : "showModal"
        })
    }

    closeModal() {
        this.setState({
            showProfileModal: "noModal",
            showPlayModal: "noModal"
        })
    }

    getData() {
        //Axios Call To Get Information About User
        Axios.get(
            `${this.URL_EXT_PROFILE}?${this.QUERY_KEY_U_ID}=${this.props.match.params.user_id}`
        ).then((res) => {
            const userInfo = res.data.data[0];
            this.setState({
                u_id : userInfo.u_id,
                username: userInfo.username,
                exp_gained : userInfo.exp_gained,
                profilePicNum : userInfo.profile_pic
            });
            //Axios Call To Get User's Created And Solved Puzzles
            Axios.get(
                this.URL_EXT_PUZZLES + "?" +
                this.QUERY_KEY_U_ID + "=" +
                userInfo.u_id
            ).then((res) => {
                this.setState({
                    createdPuzzles : res.data.createdData,
                    solvedPuzzles : res.data.solvedData
                });
            }).catch(err => {
                console.log("Error Loading Created And Solved Puzzles");
            });
        }).catch(err => {
            console.log("Error Loading Profile");
        });
    }
    render(){
        const { 
            createdPuzzles, 
            solvedPuzzles, 
            username, 
            exp_gained, 
            profilePicNum,
            showPlayModal,
            modalInfo
        } = this.state;
        let createdList = <li className="text-center py-3 white grey-text">No Created Puzzles</li>;
        let solvedList = <li className="text-center py-3 white grey-text">No Solved Puzzles</li>;
        if (createdPuzzles.length > 0) {
            createdList = createdPuzzles.map((item, index) => {
                return (
                    <li onClick={() => this.callPlayModal(item)} className="collection-item avatar pr-2" key={index}>
                        <img 
                            style={{left: "10px"}} 
                            src={this.gameTypes[item.type]} alt="" 
                            className="circle"
                        />
                        <span className="title">{item.puzzle_name}</span>
                        <p className="grey-text">
                            Avg: { item.avg_time_to_complete === 0 ? '--' :
                                item.type === "word_guess" ? 
                                Math.round(item.avg_time_to_complete/10) + " guesses" : 
                                Math.round(item.avg_time_to_complete) + " seconds"
                            } 
                            <br/>
                            Plays: {item.total_plays}
                        </p>
                    </li>
                )
            });
        }
        if (solvedPuzzles.length > 0) {
            solvedList = solvedPuzzles.map((item, index) => {
                return (
                    <li 
                        onClick={() => this.callPlayModal(item)} 
                        className="collection-item avatar pr-2" 
                        style={{paddingRight:"67px"}} 
                        key={index}
                    >
                        <img 
                            style={{left: "10px"}} 
                            src={this.gameTypes[item.type]} 
                            className="circle"
                        />
                        <span className="title">{item.puzzle_name}</span>
                        <p className="grey-text">
                            {
                                item.type === "word_guess" ? item.completionTime/10 + " guesses" : 
                                item.completionTime + " seconds"
                            }
                            <br/>
                            {
                                item.completionRegistered.substr(5,5) + "-" + 
                                item.completionRegistered.substr(2,2)
                            }
                        </p>
                    </li>
                )
            })
        }
        return (
            <div>
                <ProfileModal getData={this.getData} closeModal={this.closeModal} info={this.state}/>
                <PlayModal info={modalInfo} type="created/solved" showModal={showPlayModal} closeModal={() => this.closeModal()} />
                <PageTitle backgroundImg="forestvalley" color="white" text="PROFILE"/>
                <div className="row mt-4 mb-0">
                    <div 
                        onClick={this.props.match.params.user_id === "my_profile" ? this.callProfileModal : null} 
                        className="col-4 d-flex align-items-center"
                    >
                        <img className="circle" style={{width:"100%"}} src={avatar_array[profilePicNum]}/>
                    </div>
                    <div className="col-8 d-flex flex-column justify-content-center">
                        <blockquote>
                            <h3 
                                className="m-0" 
                                onClick={this.props.match.params.user_id === "my_profile" ? this.callProfileModal : null} 
                                style={{overflowWrap: "break-word"}}
                            >
                                {username}
                            </h3>
                            <p className="m-0">EXP POINTS: {exp_gained}</p>
                        </blockquote>
                    </div>
                    <div className="col-6 p-0 mt-4">
                        <h6 className="text-center red-text">CREATED PUZZLES</h6>
                        <ul className="collection my-0">{createdList}</ul>
                    </div>
                    <div className="col-6 p-0 mt-4">
                        <h6 className="text-center red-text">SOLVED PUZZLES</h6>
                        <ul className="collection my-0">{solvedList}</ul>
                    </div>
                </div>
            </div>
        )
    }
}
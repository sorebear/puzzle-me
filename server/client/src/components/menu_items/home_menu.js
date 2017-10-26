import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';

import PageTitle from './page_title';
import HomeMenuModal from './home_menu_modal';
import { avatar_array } from './avatar_array';


class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalInfo : 'home',
            showModal : "noModal",
            username: null,
            exp_gained : null,
            profilePicNum : null
        }
        this.callModal = this.callModal.bind(this);
        this.URL_EXT_PROFILE = '/getProfile';
        this.URL_EXT_RANDOM = './getOneRandom';
        this.QUERY_KEY_U_ID = 'user_id';
        this.QUERY_KEY_DB = 'database';
        this.QUERY_KEY_COL = 'column';
    }

    callModal() {
        this.setState({
            showModal : "showModal"
        })  
    }

    close() {
        this.setState({
            showModal: "noModal"
        })
    }

    componentWillMount() {
        this.props.updateCurrentPath("home");
        this.getUserData();
    }

    getUserData() {
        //Axios Call To Get Information About User
        Axios.get(
            `${this.URL_EXT_PROFILE}?${this.QUERY_KEY_U_ID}=my_profile`
        ).then((res) => {
            const userInfo = res.data.data[0];
            this.setState({
                username: userInfo.username,
                exp_gained : userInfo.exp_gained,
                profilePicNum : userInfo.profile_pic
            });
        }).catch(err => {
            console.log("Error Loading Profile");
        });
    }

    getRandomCreate() {
        const gameArray = ["speckle_spackle", "word_guess"];
        this.props.history.push(
            `/create/${gameArray[Math.floor(Math.random() * gameArray.length)]}`
        );
    }

    getRandom(db, col) {
        Axios.get(
            this.URL_EXT_RANDOM + "?" + this.QUERY_KEY_DB + "=" + db + "&" +
            this.QUERY_KEY_COL + "=" + col
        ).then(res => {
            const randomRes = res.data.data[0];
            if (randomRes.url_ext) {
                this.props.history.push(`/play/${randomRes.type}/${randomRes.url_ext}`)
            } else {
                this.props.history.push(`/profile/${randomRes.facebook_u_id}`)
            }
        }).catch(err => {
            console.log("ERROR LOADING RANDOM ITEM");
        })
    }

    render() {
        const { showModal, modalInfo, username, profilePicNum, exp_gained } = this.state;
        return (
            <div>
                <HomeMenuModal toggleAutoInfo={this.props.toggleAutoInfo} autoInfo={this.props.autoInfo} showModal={showModal} closeModal={() => {this.close()}} currentPath={modalInfo} />
                <PageTitle backgroundImg="mountains" color="white" text="PUZZLE ME" subText="start puzzling"/>
                <div className="row justify-content-center mb-0">
                    <div onClick={() =>this.props.updateCurrentPath("profile")} className="text-center col-5 mt-5">
                        <Link to="/profile/my_profile">
                            <img src={avatar_array[profilePicNum]} className="circle mb-1"/>
                            EXP POINTS: {exp_gained}
                        </Link>
                    </div>
                    <div className="col-7 col-sm-6 mt-5 justify-content-around align-items-center flex-column d-flex">
                        <button 
                            onClick={() => this.getRandom('puzzles', 'url_ext, type')}
                            className="btn btn-block my-1"
                        >
                            Random 
                            <i className="material-icons large right">play_arrow</i>
                        </button>
                        <button 
                            onClick={() => this.getRandomCreate()}
                            className="btn btn-block my-1"
                        >
                            Random 
                            <i className="material-icons large right">create</i>
                        </button>
                        <button 
                            onClick={() => {
                                this.getRandom('users', 'facebook_u_id')
                                this.props.updateCurrentPath("profile");
                            }} 
                            className="btn btn-block my-1"
                        >
                            Random 
                            <i className="material-icons large right">person</i>
                        </button>
                    </div>
                    <div className="col-12">
                        <Link to="/profile/my_profile">
                            <h4 className="mt-5 text-center">
                                {this.props.newUser ? `Welcome ${username}!` : `Welcome Back ${username}!`}
                            </h4>
                        </Link>
                    </div>
                </div>
            </div>
        )
    }
}

export default HomePage
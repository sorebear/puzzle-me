import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import PageTitle from './page_title';
import HomeMenuModal from './home_menu_modal';

import speckle_spackle from '../imgs/speckle_spackle.png';
import word_guess from '../imgs/word_guess.png';


class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalInfo : 'home',
            showModal : "noModal",
        }
        this.callModal = this.callModal.bind(this);
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
    }

    render() {
        const { showModal, modalInfo } = this.state;
        return (
            <div>
                <HomeMenuModal toggleAutoInfo={this.props.toggleAutoInfo} autoInfo={this.props.autoInfo} showModal={showModal} closeModal={() => {this.close()}} currentPath={modalInfo} />
                <PageTitle backgroundImg="sunset" color="white" text="PUZZLE ME" subText=""/>
                <div className="row justify-content-center mb-0" style={{height: this.props.bodyHeight}}>
                    <div className="col-6 text-center align-self-center">
                        <Link to="/play">
                            <i className="material-icons large red-text ">play_arrow</i>
                            <p>Start Playing</p>
                        </Link>
                    </div>
                    <div className="col-6 text-center align-self-center">
                        <Link to="/create">
                            <i className="material-icons large red-text ">brush</i>
                            <p>Start Creating</p>
                        </Link>
                    </div>
                    <div className="col-6 text-center align-self-start" onClick={() => this.callModal()}>
                        <i className="material-icons large red-text ">help_outline</i>
                        <p>Learn How To Play</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default HomePage
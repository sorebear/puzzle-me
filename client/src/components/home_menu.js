import React, { Component } from 'react';

import PageTitle from './page_title';
import infoObject from './info_modal/info_object';
import InfoModal from './info_modal/info_modal';

import speckle_spackle from './imgs/speckle_spackle.png';
import word_guess from './imgs/word_guess.png';
import unblock_me from './imgs/unblock_me.png';
import HomeModal from './home_modal';


class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalInfo : 'home',
            showModal : "noModal",
        }
        this.callModal = this.callModal.bind(this);
    }

    callModal(info) {
        this.setState({
            modalInfo : info,
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
        console.log("Home Menu Props: ", this.props);
        const { showModal, modalInfo } = this.state;
        return (
            <div>
                <InfoModal toggleAutoInfo={this.props.toggleAutoInfo} autoInfo={this.props.autoInfo} showModal={showModal} closeModal={() => {this.close()}} currentPath={modalInfo} />
                <PageTitle backgroundImg="sunset" color="white" text="PUZZLE ME" subText=""/>
                <div style={{margin : "auto"}} className="row">
                    <h4 className="my-2 text-center w-100">Learn To Play...</h4>
                        <div className="col-6 text-center">
                            <img onClick={() => {this.callModal('speckle_spackle_play')}} className="m-2" src={speckle_spackle} style={{maxHeight: "18vh", maxWidth: "40vw"}} />
                            <div>Speckle Spackle</div>
                        </div>
                        <div className="col-6 text-center">
                            <img onClick={() => {this.callModal('unblock_me_play')}} className="m-2" src={unblock_me} style={{maxHeight: "18vh", maxWidth: "40vw"}} />
                            <div>Unblock Me</div>
                        </div>
                        <div className="col-6 offset-3 text-center">
                            <img onClick={() => {this.callModal('word_guess_play')}} className="m-2" src={word_guess} style={{maxHeight: "18vh", maxWidth: "40vw"}} />
                            <div>Word Guess</div>
                        </div>
                </div>
            </div>
        )
    }
}

export default HomePage
import React, { Component } from 'react';
import Axios from 'axios';
import { avatar_array } from './avatar_array';

class ProfileModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            avatarIndex : props.info.avatarIndex
        }
        this.submitUpdates = this.submitUpdates.bind(this);
        this.successfulSubmit = this.successfulSubmit.bind(this);
        this.URL_EXT = '/updateProfile';
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            avatarIndex : nextProps.info.avatarIndex
        })
    }

    updateAvatarIndex(newIndex) {
        this.setState({
            avatarIndex : newIndex
        })
    }

    submitUpdates() {
        Axios.post(this.URL_EXT, {
            u_id : this.props.info.u_id,
            updateField : "profilePic",
            updateValue : this.state.avatarIndex
        }).then(this.successfulSubmit).catch(err => {
            console.log("There was an error updating your profile", err)
        });
        this.props.closeModal();
    }

    successfulSubmit() {
        console.log("Your Profile Has Been Updated");
        this.props.getData()
    }

    render() {
        const { avatarIndex } = this.state;
        const avatar_list = avatar_array.map((item, index) => {
            return (
                <div className="col-4" style={{marginBottom: "30px"}} key={index}>
                    <img
                        onClick={() => this.updateAvatarIndex(index)} 
                        src={avatar_array[index]} 
                        className={index === avatarIndex ? "circle" : ""} 
                    />
                </div>
            )
        })
        return (
        <div className={this.props.info.showProfileModal}>
            <div onClick={this.props.closeModal}>
            </div>
            <div className="card p-5">
                <div className="card-body" style={{height:"82vh", overflow:"scroll"}}>
                    <h4 className="text-center red-text" style={{marginBottom:"30px"}}>Choose An Avatar</h4>
                    <div className="row">
                        {avatar_list}
                    </div>
                    <div className="d-flex justify-content-around">
                        <button onClick={this.props.closeModal} className="btn">Close</button>
                        <button onClick={() => this.submitUpdates()} className="btn">Update</button>
                    </div>
                    <div className="text center mt-5">
                        <a href="http://www.freepik.com/free-vector/people-wearing-accesories-avatar-collection_1176016.htm">Avatars Designed by Freepik</a>
                    </div>
                </div>
            </div>
        </div>
    )
    }
}

export default ProfileModal;
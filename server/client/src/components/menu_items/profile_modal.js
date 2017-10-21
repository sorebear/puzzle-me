import React, { Component } from 'react';
import Axios from 'axios';
import { avatar_array } from './avatar_array';

class ProfileModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            avatarIndex : props.info.profilePicNum,
            username : props.info.username
        }
        this.submitUpdates = this.submitUpdates.bind(this);
        this.successfulSubmit = this.successfulSubmit.bind(this);
        this.URL_EXT = '/updateProfile';
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            avatarIndex : nextProps.info.profilePicNum,
            username : nextProps.info.username
        })
    }

    updateAvatarIndex(newIndex) {
        this.setState({
            avatarIndex : newIndex
        })
    }

    handleInput(event) {
        this.setState({
            username : event.target.value
        })
    }

    submitUpdates(event) {
        event.preventDefault();
        Axios.post(this.URL_EXT, {
            u_id : this.props.info.u_id,
            updateField : "profileInfo",
            newUsername : this.state.username,
            newAvatar : this.state.avatarIndex
        }).then(this.successfulSubmit).catch(err => {
            console.log("There was an error updating your profile");
        });
        this.props.closeModal();
    }

    successfulSubmit() {
        console.log("Your Profile Has Been Updated");
        this.props.getData()
    }

    render() {
        const { avatarIndex, username } = this.state;
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
                    <form onSubmit={this.submitUpdates}>
                        <h4 className="text-center red-text">Update Your Username</h4>
                        <div className="input-field">
                            <input 
                                id="username" 
                                className="validate" 
                                value={username} 
                                onChange={(e) => this.handleInput(e)}
                            />
                        </div>
                        <h4 className="text-center red-text" style={{marginBottom:"30px"}}>Update Your Avatar</h4>
                        <div className="row">
                            {avatar_list}
                        </div>
                        <div className="d-flex justify-content-around">
                            <button type="button" onClick={this.props.closeModal} className="btn">Close</button>
                            <button type="submit" className="btn">Update</button>
                        </div>
                        <div className="text center mt-5">
                            <a href="http://www.freepik.com/free-vector/people-wearing-accesories-avatar-collection_1176016.htm">Avatars Designed by Freepik</a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
    }
}

export default ProfileModal;
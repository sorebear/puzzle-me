import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { avatar_array } from './avatar_array';

function PlayMenuModal(props) {
    if (props.info === null) {
        return <div></div>
    } else {
        const { username, exp_gained, facebook_u_id, profile_pic } = props.info
        return (
        <div className={props.showModal}>
            <div onClick={props.closeModal}>
            </div>
            <div className="card p-5">
                <div className="card-body text-center">
                    <img src={avatar_array[profile_pic]} style={{width: "100%"}}/>
                    <h4>{username}</h4>
                    <p className="card-text">  
                        Experience Points: <span className="red-text">{exp_gained}</span>
                    </p>
                    <Link to={`profile/${facebook_u_id}`}>
                        <button 
                            onClick={() => props.updateCurrentPath("profile")} 
                            className="m-1 btn"
                        >
                            View Profile
                        </button>
                    </Link>
                    <button onClick={props.closeModal} className="m-1 btn">Close</button>
                </div>
            </div>
        </div>
    )
    }
}
export default PlayMenuModal;
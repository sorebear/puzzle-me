import React, { Component } from 'react';
import { Link } from 'react-router-dom';

function PlayMenuModal(props) {
    if (props.info === null) {
        return <div></div>
    } else {
        const { username, exp_gained, u_id } = props.info
        return (
        <div className={props.showModal}>
            <div onClick={props.closeModal}>
            </div>
            <div className="card p-5">
                <div className="card-body">
                    <h4 className="card-title">{username}</h4>
                    <p className="card-text">  
                        XP: {exp_gained}<br/>
                    </p>
                    <Link to={`profile/${u_id}`}>
                        <button className="m-1 btn">View Profile</button>
                    </Link>
                    <button onClick={props.closeModal} className="m-1 btn">Close</button>
                </div>
            </div>
        </div>
    )
    }
}

export default PlayMenuModal;
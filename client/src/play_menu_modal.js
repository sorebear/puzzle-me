import React, { Component } from 'react';
import { Link } from 'react-router-dom';

function PlayMenuModal(props) {
    if (props.info === null) {
        return <div></div>
    } else {
        const { creator, date_created, puzzle_name, likes, dislikes, size, type, url_ext } = props.info
        return (
        <div className={props.showModal}>
            <div onClick={props.closeModal}>
            </div>
            <div className="card p-5">
                <div className="card-body">
                    <h4 className="card-title">{puzzle_name}</h4>
                    <p className="card-text">  
                        Type: {type}<br/>
                        Size: {size}<br/>
                        Creator: {creator}<br/>
                        Created: {date_created.substr(0,10)}<br/>
                    </p>
                    <Link to={`play/${type}/${url_ext}`}>
                        <button className="m-1 btn btn-outline-info">Play</button>
                    </Link>
                    <button type="button" onClick={props.closeModal} className="m-1 btn btn-outline-danger">Cancel</button>
                </div>
            </div>
        </div>
    )
    }
}

export default PlayMenuModal;
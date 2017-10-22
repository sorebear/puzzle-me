import React, { Component } from 'react';
import { Link } from 'react-router-dom';

function PlayMenuModal(props) {
    if (props.info === null) {
        return <div></div>
    } else {
        const { 
            creator, 
            username, 
            date_created, 
            puzzle_name, 
            size, 
            type, 
            url_ext,
            avg_time_to_complete,
            total_plays
        } = props.info
        return (
        <div className={props.showModal}>
            <div onClick={props.closeModal}>
            </div>
            <div className="card p-5">
                <div className="card-body">
                    <h4 className="card-title teal-text">{puzzle_name}</h4>
                    <p className="card-text">  
                        Type: {type === 'word_guess' ? 'Word Guess' : 'Speckle Spackle'}<br/>
                        Size: {size}<br/>
                        Creator: {creator || username}<br/>
                        Created: {date_created.substr(0,10)}<br/>
                        Avg Completion: {
                            avg_time_to_complete === 0 ? 'n/a' : 
                            type === 'word_guess' ? 
                            Math.round(avg_time_to_complete / 10) + " Moves" : 
                            avg_time_to_complete + " Seconds" }<br/>
                        Total Plays: {total_plays}
                    </p>
                    <Link to={`../play/${type}/${url_ext}`}>
                        <button className="m-1 btn">Play</button>
                    </Link>
                    <button onClick={props.closeModal} className="m-1 btn">Close</button>
                </div>
            </div>
        </div>
    )
    }
}

export default PlayMenuModal;
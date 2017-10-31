import React, { Component } from 'react';
import { Link } from 'react-router-dom';

function PlayMenuModal(props) {
    console.log(props);
    function renderCardContent() {
        const { 
            creator, username, date_created, size, type, avg_time_to_complete, total_plays, 
            completionTime, completionRegistered
        } = props.info
        if (props.info.creator) {
            return (
                <p className="card-text">  
                    Type: {type === 'word_guess' ? 'Word Guess' : 'Speckle Spackle'}<br/>
                    Size: {size}<br/>
                    Creator: {creator}<br/>
                    Created: {
                        `${date_created.substr(5,2)}/` +
                        `${date_created.substr(8,2)}/` +
                        `${date_created.substr(2,2)}`
                    }<br/>
                    Avg Completion: {
                        avg_time_to_complete === 0 ? 'n/a' : 
                        type === 'word_guess' ? 
                        Math.round(avg_time_to_complete / 10) + " Moves" : 
                        avg_time_to_complete + " Seconds" }<br/>
                    Total Plays: {total_plays}
                </p>
            )
        } else if (props.info.username) {
            return (
                <p className="card-text">  
                    Type: {type === 'word_guess' ? 'Word Guess' : 'Speckle Spackle'}<br/>
                    Size: {size}<br/>
                    Creator: {username}<br/>
                    Date Solved: {
                        `${completionRegistered.substr(5,2)}/` +
                        `${completionRegistered.substr(8,2)}/` +
                        `${completionRegistered.substr(2,2)}`
                    }<br/>
                    Your Completion: {
                        type === 'word_guess' ? 
                        (completionTime / 10) + " Moves" : 
                        completionTime + " Seconds" }<br/>
                    Avg Completion: {
                        avg_time_to_complete === 0 ? 'n/a' : 
                        type === 'word_guess' ? 
                        Math.round(avg_time_to_complete / 10) + " Moves" : 
                        avg_time_to_complete + " Seconds" }<br/>
                    Total Plays: {total_plays}
                </p>
            )
        } else {
            return (
                <p className="card-text">  
                    Type: {type === 'word_guess' ? 'Word Guess' : 'Speckle Spackle'}<br/>
                    Size: {size}<br/>
                    Creator: {props.currentUser}<br/>
                    Created: {
                        `${date_created.substr(5,2)}/` +
                        `${date_created.substr(8,2)}/` +
                        `${date_created.substr(2,2)}`
                    }<br/>
                    Avg Completion: {
                        avg_time_to_complete === 0 ? 'n/a' : 
                        type === 'word_guess' ? 
                        Math.round(avg_time_to_complete / 10) + " Moves" : 
                        avg_time_to_complete + " Seconds" }<br/>
                    Total Plays: {total_plays}
                </p>
            )
        }
    }
    if (props.info === null) {
        return <div></div>
    } else {
        const { puzzle_name, url_ext, type } = props.info
        return (
            <div className={props.showModal}>
                <div onClick={props.closeModal}>
                </div>
                <div className="card p-5">
                    <div className="card-body">
                        <h4 className="card-title teal-text">{puzzle_name}</h4>
                        {renderCardContent()}
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
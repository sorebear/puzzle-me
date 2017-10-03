import React from 'react';

function winModal(props) {
    if (props.showModal === "noModal") {
        return <div></div>
    }
    return (
        <div className={props.showModal}>
            <div onClick={props.closeModal}></div>
            <div className="card p-5">
                <div className="card-body">
                    <h4 className="card-title">Congratulations!</h4>
                    <p className="card-text">  
                        You won in {props.score} moves!
                    </p>
                    <p>{props.error ? props.error : 'Your score has been submitted'}</p>
                    <button type="button" onClick={props.closeModal} className="m-2 btn btn-outline-danger">Close</button>
                </div>
            </div>
        </div>
    ) 
}
export default winModal;
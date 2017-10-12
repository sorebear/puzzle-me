import React from 'react';

function PlayCheckModal(props) {
    if (props.showModal === "noModal") {
        return <div></div>
    } else if (props.info.length === 1) {
        return (
            <div className={props.showModal}>
                <div onClick={props.closeModal}></div>
                <div className="card p-5">
                    <div className="card-body">
                        <h4 className="card-title">Congratulations!</h4>
                        <p className="card-text">  
                            You won in {props.info[0]} seconds!
                        </p>
                        <p className="card-text">
                            {props.error ? props.error : 'Your time has been submitted!'}
                        </p>
                        <button type="button" onClick={props.closeModal} className="m-2 btn btn-outline-danger">Close</button>
                    </div>
                </div>
            </div>
        )
    } else {
        const Issues = props.info.map((item, index) => {
            if (item.length) {
                return <li key={index} className="list-group-item">{item}</li>
            }
        });
        return (
            <div className={props.showModal}>
                <div onClick={props.closeModal}></div>
                <div className="card p-5">
                    <div className="card-body">
                        <h4 className="card-title">Incorrect Answer.</h4>
                        <div className="card-text">  
                            <ul className="list-group">{Issues}</ul>
                        </div>
                        <button type="button" onClick={props.closeModal} className="m-2 btn btn-outline-danger">Go Back</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default PlayCheckModal;
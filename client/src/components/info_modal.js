import React from 'react';

function InfoModal(props) {
    return (
        <div className={props.showModal}>
            <div onClick={props.closeModal}></div>
            <div className="card p-5">
                <div className="card-body">
                    <h4 className="card-title">Test</h4>
                    <p className="card-text">  
                        
                    </p>
                    <button type="button" onClick={props.closeModal} className="m-2 btn btn-outline-danger">Cancel</button>
                </div>
            </div>
        </div>
    )
}

export default InfoModal;
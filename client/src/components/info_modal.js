import React from 'react';
import './info_modal/info_modal.css'

function InfoModal(props) {
    console.log("Props at Info Modal: ", props)
    return (
        <div className={props.showModal}>
            <div onClick={props.closeModal}></div>
            <div className="card p-5">
                <div className="card-body">
                    <h4 className="card-title">{props.currentPath}</h4>
                    <div className="card-text speckle_tut_1"></div>
                    <button type="button" onClick={props.closeModal} className="m-2 btn btn-outline-danger">Cancel</button>
                </div>
            </div>
        </div>
    )
}

export default InfoModal;
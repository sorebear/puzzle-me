import React from 'react';
import { Link } from 'react-router-dom';

function HomeModal(props) {
    const { modalInfo } = props
    return (
        <div className={props.showModal}>
            <div onClick={props.closeModal}></div>
            <div className="card p-5">
                <div className="card-body">
                    <h4 className="card-title">{modalInfo.puzzle_name}</h4>
                    <p className="card-text">  
                        <strong>Type:</strong> {modalInfo.type}<br/>
                        <strong>Size:</strong> {modalInfo.size}<br/>
                        <strong>Creator:</strong> {modalInfo.creator}<br/>
                        <strong>Created:</strong> {modalInfo.date_created.substr(0,10)}<br/>
                    </p>
                    <Link to={`play/${modalInfo.type}/${modalInfo.url_ext}`}>
                        <button type="button" onClick={null} className="m-2 btn btn-outline-info">Play</button>
                    </Link>
                    <button type="button" onClick={props.closeModal} className="m-2 btn btn-outline-danger">Cancel</button>
                </div>
            </div>
        </div>
    )
}

export default HomeModal;
import React from 'react';

function CreateCheckModal(props) {
    if (props.showModal === "noModal") {
        return <div></div>
    } else {
        return (
            <div className={props.showModal}>
                <div onClick={props.closeModal}></div>
                <div className="card p-5">
                    <div className="card-body">
                        <h4 className="card-title">Going To Testplay</h4>
                        <p className="card-text">  
                            {props.info}
                        </p>
                        <button type="button" onClick={props.play} className="m-2 btn btn-outline-primary">Play</button>
                        <button type="button" onClick={props.closeModal} className="m-2 btn btn-outline-danger">Cancel</button>
                    </div>
                </div>
            </div>
        )
    } 
}

export default CreateCheckModal;
import React from 'react';

function CreateCheckModal(props) {
    if (props.showModal === "noModal") {
        return <div></div>
    } else if (props.info[0] === null && props.info[1] === null){
        return (
            <div className={props.showModal}>
                <div onClick={props.closeModal}></div>
                <div className="card p-5">
                    <div className="card-body">
                        <h4 className="card-title">Nice Work!</h4>
                        <p className="card-text">  
                            Everything looks good in your puzzle. 
                        </p>
                        <button type="button" onClick={props.play} className="m-2 btn btn-outline-primary">Play</button>
                        <button type="button" onClick={props.closeModal} className="m-2 btn btn-outline-danger">Cancel</button>
                    </div>
                </div>
            </div>
        )
    } else {
        const errorList = props.info.map((item, index) => {
            if (item) {
                return <li className="list-group-item" key={index}>{item}</li>
            }
        })
        return (
            <div className={props.showModal}>
                <div onClick={props.closeModal}></div>
                <div className="card p-5">
                    <div className="card-body">
                        <h4 className="card-title">Invalid Puzzle</h4>
                        <div className="card-text">  
                            <ul className="list-group">{errorList}</ul>
                        </div>
                        <button type="button" onClick={props.closeModal} className="m-2 btn btn-outline-danger">Go Back</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default CreateCheckModal;
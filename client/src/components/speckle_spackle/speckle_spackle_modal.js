import React from 'react';

function SpeckleSpackleModal(props) {
    if (props.showModal === "noModal") {
        return <div></div>
    } else if (props.info[0].length === 0 && props.info[1].length ===0 ) {
        return (
            <div className={props.showModal}>
                <div onClick={props.closeModal}></div>
                <div className="card p-5">
                    <div className="card-body">
                        <h4 className="card-title">Nice Work!</h4>
                        <p className="card-text">  
                            We didn't find any errors in your puzzle. 
                        </p>
                        <button type="button" onClick={props.play} className="m-2 btn btn-outline-primary">Play</button>
                        <button type="button" onClick={props.closeModal} className="m-2 btn btn-outline-danger">Cancel</button>
                    </div>
                </div>
            </div>
        )
    } else {
        const rowIssues = props.info[0].map((item, index) => {
            return <li key={index} className="list-group-item">{item}</li>
        });
        const columnIssues = props.info[1].map((item, index) => {
            return <li key={index} className="list-group-item">{item}</li>
        });
        return (
            <div className={props.showModal}>
                <div onClick={props.closeModal}></div>
                <div className="card p-5">
                    <div className="card-body">
                        <h4 className="card-title">Invalid Puzzle</h4>
                        <div className="card-text">  
                            <ul className="list-group">{rowIssues}</ul>
                            <ul className="list-group">{columnIssues}</ul>
                        </div>
                        <button type="button" onClick={props.closeModal} className="m-2 btn btn-outline-danger">Cancel</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default SpeckleSpackleModal;
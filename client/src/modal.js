import React, { Component } from 'react';

class Modal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showModal : props.showModal,
            info : props.info
        }
    }
    removeModal() {
        this.setState({
            showModal : "noModal"
        })
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            showModal: nextProps.showModal,
            info : nextProps.info
        })
    }
    render() {
        console.log(this.state);
        if (this.state.info === null) {
            return <div></div>
        } else {
            const { author, averageTime, dateCreated, name, ratingNeg, ratingPos, size, type } = this.state.info
            return (
            <div className={this.state.showModal}>
                <div onClick={() => this.removeModal()}>
                </div>
                <div className="card p-5">
                    <div className="card-body">
                        <h4 className="card-title">{name}</h4>
                        <p className="card-text">  
                            Type: {type}<br/>
                            Creator: {author}<br/>
                            Created: {dateCreated}<br/>
                            Avg. Seconds : {averageTime}<br/>
                            Avg. Time: {Math.floor(averageTime / 60)}:{Math.floor(averageTime % 60)}
                        </p>
                        <a href="#" className="m-1 btn btn-outline-success">Play</a>
                        <button type="button" onClick={() => this.removeModal()} className="m-1 btn btn-outline-danger">Cancel</button>
                    </div>
                </div>
            </div>
        )
        }
    }
}

export default Modal;
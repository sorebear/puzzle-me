import React, { Component } from 'react';

class OneButtonModal extends Component {
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
            const { title, body, buttonText} = this.state.info
            return (
            <div className={this.state.showModal}>
                <div onClick={() => this.removeModal()}>
                </div>
                <div className="card p-5">
                    <div className="card-body">
                        <h4 className="card-title">{title}</h4>
                        <p className="card-text">  
                            {body}
                        </p>
                        <button type="button" onClick={() => this.removeModal()} className="m-1 btn btn-outline-danger">{buttonText}</button>
                    </div>
                </div>
            </div>
        )
        }
    }
}

export default OneButtonModal;